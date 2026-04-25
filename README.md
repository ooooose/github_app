# github-app

## 概要

GitHub APIを使ってリポジトリを検索し、一覧と詳細を閲覧できるアプリです。  
日常的に触れるGitHubのUIに寄せ、落ち着いた運用系の見た目を目標に、配色・余白・角丸をデザイントークンで統一して管理しています。

検索はキーワード入力から実行し、結果は無限スクロールで追加読み込みします。詳細画面では基本情報と主要なメトリクスをまとめて確認できます。

## 特徴

1. **リポジトリ検索（GitHub Search API）**  
   検索クエリとページ番号を指定して取得し、10件ずつ表示します。
2. **詳細表示（GitHub Repos API）**  
   Owner/Repoをもとに詳細情報を取得し、メトリクス（Stars/Watchers/Forks/Issues）を表示します。
3. **レスポンシブ**  
   モバイルでは余白を詰めつつ、PCは中央寄せで読みやすい横幅に統一しています。

## 工夫した点・拘ったポイント

UIは見た目の統一と変更容易性を重視しています。実装の狙いを短くまとめます。

- **デザイントークン（CSS変数）で一元管理**  
  背景/文字色/ボーダー/リンク色/角丸などを`src/app/globals.css`のトークンに集約し、コンポーネント側はトークン参照で組み立てる方針にしています（直書きカラーを極力減らすことを目的にしています）。
- **共通レイアウトの集約**  
  画面幅・左右パディングは`Container`（`src/components/container.tsx`）に寄せ、ページ側の重複を削減しています。
- **クライアントにトークンを出さないAPI設計**  
  GitHub APIへのアクセスは`src/app/api/github/**`でプロキシし、トークンはサーバー側の環境変数から付与し、一定のセキュリティ対策を講じています。
- **UX体験向上に向けた工夫**  
  SWRのクライアントキャッシュを活用し、同一検索結果の再取得を防ぐことでUX向上を図りました。一覧は`prefetch={false}`にして過剰な先読みを避けつつ、hover時のみ遅延付きで`router.prefetch()`することで詳細ページへの遷移を高速化しています。
- **開発に必要なドキュメントの整備**  
  チームで開発する際の障壁を低くすることを目標として、開発思想や設計に関するドキュメントを残しています。

## 技術スタック

- Next.js（App Router）
- React
- Tailwind CSS + shadcn/UI
- SWR
- Vitest + Testing Library

## AIを活用した箇所

以下の対応にcopilot,codex,claudeを活用しました。

- 設計・実装パターンの壁打ち
- 実装上のバグ修正、リファクタリングの指摘
- GitHubに寄せたUIにするためのスタイリング全般
- 各種ドキュメントの整理（Markdown形式への整理など）
- アプリアイコンの作成

## ドキュメント

- [ARCHITECTURE.md](./ARCHITECTURE.md)（設計/アーキテクチャ）
- [TEST_GUIDE.md](./TEST_GUIDE.md)（テスト方針/設計）

## セットアップ

1. 依存関係をインストール

```bash
npm install
```

2. 環境変数を用意（`.env.sample` をテンプレとして使用）

```bash
cp .env.sample .env
```

3. `.env` を編集

- `GITHUB_TOKEN`: GitHub API用のトークン（必須ですので、ご自身のトークンを発行してセットしてください）
- `NEXT_PUBLIC_BASE_URL`: 開発環境で動かす場合は既定の値で問題ありません。

4. 開発サーバ起動

```bash
npm run dev
```

## 開発コマンド

```bash
npm run dev
npm run build
npm run start
npm run test:run
npm run lint
```
