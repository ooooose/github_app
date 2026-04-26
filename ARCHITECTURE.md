# アーキテクチャ

UIはGitHubに馴染みのあるトーンを目標にしつつ、実務で保守しやすい構造（責務分離・トークン管理・重複排除）を優先しています。

## 目的と前提

- GitHub APIを使ってリポジトリ検索と詳細閲覧を行う
- アクセストークンはクライアントへ渡さず、サーバー側で付与する
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

- `src/app/api/github/**`でGitHubAPIをプロキシし、`GITHUB_TOKEN`はサーバー側で付与します。
- 目的: クライアントへトークンを出さない、外部API差分/エラーを吸収、UI側の呼び出しを安定化。

## テスト

- `vitest`+Testing Library を使用
- 主に“キー生成やAPI呼び出しの境界”のような壊れやすい部分を小さくテストします
