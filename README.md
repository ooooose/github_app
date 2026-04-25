# github-app

## 概要

GitHub APIを使ってリポジトリを検索し、一覧と詳細を閲覧できるアプリです。  
日常的に触れるGitHubのUIに寄せ、落ち着いた運用系の見た目を目標に、配色・余白・角丸をデザイントークンで統一して管理しています。

検索はキーワード入力から実行し、結果は無限スクロールで追加読み込みします。詳細画面では基本情報と主要なメトリクスをまとめて確認できます。

## 特徴

1. **リポジトリ検索（GitHub Search API）**  
   検索クエリとページ番号を指定して取得し、20件ずつ表示します。
2. **無限スクロール**  
   `IntersectionObserver` で最下部を監視し、`useSWRInfinite`でページング取得を積み重ねています。
3. **詳細表示（GitHub Repos API）**  
   Owner/Repoをもとに詳細情報を取得し、メトリクス（Stars/Watchers/Forks/Issues）を表示します。
4. **レスポンシブ**  
   モバイルでは余白を詰めつつ、PCは中央寄せで読みやすい横幅に統一しています。

## 工夫した点・拘ったポイント

UI は見た目の統一と変更容易性を重視しています。

- **デザイントークン（CSS変数）で一元管理**  
  背景/文字色/ボーダー/リンク色/角丸などを`src/app/globals.css`のトークンに集約し、コンポーネント側はトークン参照で組み立てる方針にしています（直書きカラーを極力減らすことを目的にしています）。
- **共通レイアウトの集約**  
  画面幅・左右パディングは`Container`（`src/components/container.tsx`）に寄せ、ページ側の重複を削減しました。
- **クライアントにトークンを出さないAPI設計**  
  GitHub APIへのアクセスは`src/app/api/github/**`でプロキシし、トークンはサーバー側の環境変数から付与します。

## 技術スタック

- Next.js（App Router）
- React
- Tailwind CSS + shadcn/UI
- SWR
- Vitest + Testing Library

## 開発コマンド

```bash
npm run dev
npm run build
npm run start
npm run test:run
npm run lint
```
