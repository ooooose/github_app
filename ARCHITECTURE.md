# アーキテクチャ

このリポジトリは「GitHub リポジトリ検索アプリ」です。UI は GitHub 風のニュートラルなトーンを目標にしつつ、実務で保守しやすい構造（責務分離・トークン管理・重複排除）を優先しています。

## 目的と前提

- GitHub API を使ってリポジトリ検索と詳細閲覧を行う
- アクセストークンはクライアントへ渡さず、サーバー側で付与する
- UI はデザイントークン（CSS 変数）で一元管理し、直書きカラーを避ける
- 一覧はページング+無限スクロールで段階的に読み込む

## ディレクトリ構成

主要な構成は以下です。

- `src/app/`
  - App Router のページ/レイアウト/エラーハンドリング
  - `src/app/api/github/**` は GitHub API のプロキシ（トークン付与）
- `src/features/github/`
  - GitHub 機能の “縦割り” モジュール
  - `api/` データ取得（SWR 用 fetch、キー生成）
  - `hooks/` UI から使う hooks（`useSWRInfinite` など）
  - `components/` 画面に出る部品（検索、一覧、詳細、skeleton）
  - `types/` API レスポンス型
- `src/components/`
  - アプリ全体で共通の部品（`Header`、`Container`）
  - `src/components/ui/` は UI プリミティブ（Button/Input/Card 等）
- `src/lib/`
  - 汎用ユーティリティ（`cn`、`fetcher`、`formatCount`）

## 画面とデータフロー

### 一覧（検索）

1. 検索フォームでキーワードを確定（`SearchForm`）
2. `useRepoList(keyword)` が `useSWRInfinite` を使って `/api/github?q=...&page=...` をページング取得
3. `RepoList` が `IntersectionObserver` で最下部を監視し、`setSize` を増やして次ページを読み込む

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

## Prefetch 方針

リポジトリ一覧はリンク数が多く、詳細ページの prefetch が GitHub API への追加リクエストを発生させやすいので、一覧アイテムの `<Link>` は自動 prefetch を無効化しています。

- `src/features/github/components/repo-item.tsx`
  - `<Link prefetch={false}>` で自動 prefetch を止める
  - 代わりに hover/focus 時に `router.prefetch()` を短い遅延付きで行い、必要そうなときだけ先読みする

## スタイリング（管理方針）

### トークン（CSS 変数）

色・角丸などの “UI の軸” は `src/app/globals.css` の CSS 変数に集約します。

- 直書きカラー（例: `bg-[#...]`）を避ける
- UI コンポーネントは `bg-card` / `border-border` / `text-muted-foreground` のようなトークン参照で組む
- GitHub 風トーンに寄せたい場合はトークン側を変更し、コンポーネント側の変更を最小化する

### レイアウトの共通化

ページの横幅と余白は `src/components/container.tsx` に寄せています。

- `Container` が `max-w-*` と `px-*` を一元管理
- PC は中央寄せ、SP は余白を詰める、といった調整を 1 箇所で行える

## テスト

- `vitest` + Testing Library を使用
- 主に “キー生成や API 呼び出しの境界” のような壊れやすい部分を小さくテストします
