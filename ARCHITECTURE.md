# アーキテクチャ

UIはGitHubに馴染みのあるトーンを目標にしつつ、実務で保守しやすい構造（責務分離・トークン管理・重複排除）を優先しています。

## 目的と前提

- GitHub APIを使ってリポジトリ検索と詳細閲覧を行う
- アクセストークンはクライアントへ渡さず、サーバー側で付与する
- UIはデザイントークン（CSS変数）で一元管理し、直書きカラーを避ける
- 一覧はページング+無限スクロールで段階的に読み込む

## ディレクトリ構成

主要な構成は以下です。

- `src/app/`
  - App Routerのページ/レイアウト/エラーハンドリング
  - `src/app/api/github/**`はGitHubAPIのプロキシ（トークン付与）
- `src/features/github/`
  - GitHub機能の縦割りモジュール
  - `api/` データ取得（SWR用fetch、キー生成）
  - `hooks/` UIから使うhooks（`useSWRInfinite` など）
  - `components/` 画面に出る部品（検索、一覧、詳細、skeleton）
  - `types/` APIレスポンス型
- `src/components/`
  - アプリ全体で共通の部品（`Header`、`Container`）
  - `src/components/ui/` は UIプリミティブ（Button/Input/Card 等）
- `src/lib/`
  - 汎用ユーティリティ（`cn`、`fetcher`、`formatCount`）

## 採用したデザインパターン/設計パターン

このプロジェクトで意図的に採用しているパターンです（変更の指針にもなります）。

### Vertical Slice/Feature-based Structure（機能単位の分割）

- `src/features/github/**`に「GitHub機能」を縦割りで集約し、UI・データ取得・型を近接配置しています。
- 目的: 変更箇所の局所化、機能の見通し、依存関係の単純化。

### BFF（Backend for Frontend）/ Proxy（APIゲートウェイ）

- `src/app/api/github/**`で GitHub API をプロキシし、`GITHUB_TOKEN`はサーバー側で付与します。
- 目的: クライアントへトークンを出さない、外部API差分/エラーを吸収、UI側の呼び出しを安定化。

### Hookパターン + SWR（Stale-While-Revalidate）

- `useRepoList(keyword)`のように、UIからはhook経由でデータ状態（`repos`,`isValidating`,`setSize`）を扱います。
- 目的: 状態管理の集約、表示ロジックの単純化、キャッシュ/再検証の仕組みを持ちすぎない。

### Design Tokens（CSS変数）+ UIプリミティブ（合成）

- `src/app/globals.css` のトークンを UI プリミティブ（`src/components/ui/**`）から参照し、直書きカラーを避けます。
- 目的: デザインの一貫性、テーマ変更・微調整の容易性。

### Progressive Prefetch（段階的な先読み）

- 一覧は `<Link prefetch={false}>` で自動先読みを止め、hover/focus 時にだけ `router.prefetch()` します。
- 目的: リンク数が多い画面での過剰な先読み（=外部API負荷/帯域）を抑制しつつ、体感速度は確保。

## Clean Architecture（インスパイア）

このリポジトリは「クリーンアーキテクチャを厳密に適用」しているわけではありませんが、依存の向きと責務の置き場はそれに近い考え方で整理しています。

### レイヤの考え方（概念）

- **Entities（ドメイン）**: ルール/型/純粋計算。フレームワークに依存しない。
- **Use Cases（アプリケーション）**: 何をするか（ユースケース）。UIからの呼び出し窓口。
- **Interface Adapters**: UI/HTTP などの入出力の変換（Controller/Presenter 相当）。
- **Frameworks & Drivers**: Next.js や外部APIなどの具体実装。

### ディレクトリへのマッピング（目安）

- **Entities（ドメイン寄り）**
  - `src/features/github/types/**`（APIレスポンス型）
  - `src/lib/**` のうち純粋関数（例: `formatCount`）
- **Use Cases（アプリケーション寄り）**
  - `src/features/github/api/**`（データ取得の窓口、キー生成など）
  - `src/features/github/hooks/**`（ユースケースをUIへ提供する形に束ねる）
- **Interface Adapters**
  - `src/features/github/components/**`（表示とユーザー入力）
  - `src/components/ui/**`（UIプリミティブ）
  - `src/components/**`（共通UI/レイアウト）
- **Frameworks & Drivers**
  - `src/app/**`（Next.js App Router: Page/Layout/Error/Route Handler）
  - `src/app/api/github/**`（BFF/Proxy: 外部 GitHub API への具体アクセス）
  - 外部サービス: `https://api.github.com/**`

### 依存ルール（運用上の約束）

- `src/features/**` は `src/app/**` に依存しない（機能は Next.js の外側に置く）。
- 外部I/O（GitHub API・環境変数）は `src/app/api/**` に閉じ込め、クライアントへ秘密情報を渡さない。
- UI（components）は「描画と入力」に集中し、URL組み立て/ページング条件などは `api/` や `hooks/` 側へ寄せる。

## 画面とデータフロー

### 一覧（検索）

1. 検索フォームでキーワードを確定（`SearchForm`）
2. `useRepoList(keyword)`が`useSWRInfinite`を使って`/api/github?q=...&page=...` をページング取得
3. `RepoList`が`IntersectionObserver`で最下部を監視し、`setSize`を増やして次ページを読み込む

### 詳細

- 詳細ページは `/repo/[owner]/[repo]` に遷移し、サーバー側で GitHub API（`/api/github/[owner]/[repo]`）を取得して描画します
- 読み込み中は `Suspense` の fallback として `RepoDetailSkeleton` を表示します

## API（GitHub へのプロキシ）

GitHub への HTTP リクエストは `src/app/api/github/**` に集約します。

- `src/app/api/github/route.ts`
  - Search API（`/search/repositories`）を呼び出して一覧を返す
- `src/app/api/github/[owner]/[repo]/route.ts`
  - Repo API（`/repos/{owner}/{repo}`）を呼び出して詳細を返す

`GITHUB_TOKEN` はサーバー側の環境変数から読み取り、Authorization ヘッダーに付与します（クライアントにトークンを出さない）。

## Prefetch方針

リポジトリ一覧はリンク数が多く、詳細ページのprefetchがGitHubAPIへの追加リクエストを発生させやすいので、一覧アイテムの`<Link>`は自動prefetchを無効化しています。

- `src/features/github/components/repo-item.tsx`
  - `<Link prefetch={false}>`で自動prefetchを止める
  - 代わりにhover/focus時に`router.prefetch()`を短い遅延付きで行い、必要なときだけ先読みする

## スタイリング（管理方針）

### トークン（CSS 変数）

色・角丸などの“UIの軸”は`src/app/globals.css`のCSS変数に集約します。

- 直書きカラー（例: `bg-[#...]`）を避ける
- UIコンポーネントは`bg-card`/`border-border`/`text-muted-foreground`のようなトークン参照で組む
- GitHub 風トーンに寄せたい場合はトークン側を変更し、コンポーネント側の変更を最小化する

### レイアウトの共通化

ページの横幅と余白は `src/components/container.tsx` に寄せています。

- `Container`が`max-w-*`と`px-*`を一元管理
- PCは中央寄せ、SPは余白を詰める、といった調整を1箇所で行える

## テスト

- `vitest` + Testing Library を使用
- 主に“キー生成やAPI呼び出しの境界”のような壊れやすい部分を小さくテストします
