# TEST GUIDE

## 概要

このドキュメントはプロジェクトにおけるテストの方針・構成・記述方法をまとめたガイドラインです。

---

## 技術スタック

| ライブラリ                  | 用途                           |
| --------------------------- | ------------------------------ |
| vitest                      | テストランナー                 |
| @testing-library/react      | コンポーネントテスト           |
| @testing-library/user-event | ユーザー操作のシミュレーション |
| @testing-library/jest-dom   | DOMアサーション拡張            |
| jsdom                       | ブラウザ環境のエミュレーション |

---

## ディレクトリ構成

テストファイルはコロケーション形式で各ディレクトリの`__tests__`に格納します。

```
src/
├── lib/
│   ├── format.ts
│   └── __tests__/
│       └── format.test.ts
├── components/
│   ├── header.tsx
│   └── __tests__/
│       └── header.test.tsx
├── features/github/
│   ├── api/
│   │   ├── get-repo-list.ts
│   │   └── __tests__/
│   │       └── get-repo-list.test.ts
│   └── components/
│       ├── repo-item.tsx
│       └── __tests__/
│           └── repo-item.test.tsx
tests/
└── setup.ts   # セットアップのみ。基本テストファイルはここに置かない
```

---

## テスト方針

### テストを書く対象

| 対象                                    | 理由                                       |
| --------------------------------------- | ------------------------------------------ |
| `lib/`配下の共通ロジック                | 純粋関数でテストしやすく、再利用頻度が高い |
| `components/`配下の共通UIコンポーネント | 複数箇所で使われるため品質担保が重要       |
| `features/*/api/`のキー生成ロジック     | 条件分岐があり、バグが出やすい箇所         |

### テストを書かない対象

| 対象                                    | 理由                                       |
| --------------------------------------- | ------------------------------------------ |
| `constants/`配下の定数ファイル          | ロジックがなく、使用側のテストで担保される |
| `features/*/hooks/`配下のカスタムフック | SWRの動作テストになりコストが高い          |
| `features/*/api/`のfetch処理            | `lib/fetcher`のテストで担保される          |
| `src/app/`配下のページコンポーネント    | Next.jsのルーティングに依存するため        |

---

## テスト設計（パターン）

このリポジトリは、実務で一般的なテスト設計パターンに寄せて運用します。

### Testing Pyramid（テストピラミッド）

基本は「安いテストを厚く、重いテストを薄く」という思想で記述する指針を採用しています。

- **Unit（厚め）**: `lib/`の純粋関数、`features/*/api`のキー生成など（副作用が少なく高速）
- **Component（適量）**: `components/`や`features/*/components` の振る舞い（ユーザー視点）
- **E2E（最小）**: このリポジトリでは現状未導入だが、必要になったら別途追加する想定

### Testing Libraryの原則

Reactコンポーネントは「ユーザーが見て操作するもの」を中心にテストします。

- アクセシビリティと相性が良い`getByRole`を優先
- `fireEvent`の乱用を避け、`user-event` で操作を表現
- Snapshotは差分ノイズが増えやすいため原則使わない

---

## テストの書き方

### 基本構造

```typescript
describe('対象モジュール名', () => {
  describe('正常系', () => {
    it('期待する振る舞いを日本語で記述', () => {
      // arrange
      // act
      // assert
    });
  });

  describe('異常系', () => {
    it('エラーケースを日本語で記述', () => {
      ...
    });
  });
});
```

### 純粋関数のテスト例

```typescript
// lib/__tests__/format-count.test.ts
import { formatCount } from '../format-count'

describe('formatCount', () => {
  it('1000未満はそのまま返す', () => {
    expect(formatCount(999)).toBe('999')
  })

  it('1000以上はk表記にする', () => {
    expect(formatCount(1200)).toBe('1.2k')
  })
})
```

### コンポーネントのテスト例

```tsx
// components/__tests__/header.test.tsx
import { render, screen } from '@testing-library/react'
import { Header } from '@/components/header'

describe('Header', () => {
  it('ヘッダーが描画される', () => {
    render(<Header />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('ホームへのリンクが存在する', () => {
    render(<Header />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/')
  })
})
```

---

## スクリプト

```json
{
  "scripts": {
    "test": "vitest --reporter=dot",
    "test:coverage": "vitest run --coverage --reporter=dot"
  }
}
```

---

## CI

`.github/workflows/test.yml`でPR・mainへのpush時に自動実行されます。
以下のパスへの変更のみの場合はスキップされます。

- `**.md`
- `.gitignore`
- `public/**`
