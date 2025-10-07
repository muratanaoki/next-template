# Next.js コーディング規約 v1.2

Next.jsアプリケーションで一貫した品質と開発体験を保つためのフロントエンド規約です。App Router を前提に、ディレクトリ構成・型安全性・環境切り替え・コンポーネント設計までをカバーします。

---

## 概要

- ルーティングと UI/ビジネスロジックを明確にレイヤリングし、保守性を高める。
- 型安全なデータ定義と環境変数管理で、実装・運用時の事故を防ぐ。
- チーム全体で共通のフォーマッタ／リンタ／エディタ設定を共有する。

## 目次

1. [アーキテクチャ方針](#アーキテクチャ方針)
   - [ディレクトリ構成](#ディレクトリ構成)
   - [レイヤーの役割](#レイヤーの役割)
   - [features vs shared の判断基準](#features-vs-shared-の判断基準)
   - [中規模プロジェクトの推奨アプローチ](#中規模プロジェクトの推奨アプローチ)
2. [開発ガイドライン](#開発ガイドライン)
   - [命名規約](#命名規約)
   - [CSS Modules のクラス命名](#css-modules-のクラス命名)
   - [TypeScript 規約](#typescript-規約)
3. [コンポーネント設計](#コンポーネント設計)

---

## アーキテクチャ方針

### ディレクトリ構成

```
/
├─ package.json
├─ tsconfig.json
├─ next.config.ts
├─ env/                    # 環境変数ファイル群
│  ├─ .env.development     # 開発環境用設定
│  ├─ .env.staging         # ステージング環境用設定
│  ├─ .env.production      # 本番環境用設定
│  └─ .env.example         # 環境変数テンプレート
├─ .env.local              # 現在の環境変数（自動生成、Git管理外）
├─ .eslintrc.json          # ESLint設定
├─ .prettierrc             # Prettier設定
├─ .prettierignore         # Prettierフォーマット除外
├─ .gitignore              # Git管理除外設定
├─ .vscode/
│  ├─ settings.json        # VSCodeエディタ設定
│  └─ extensions.json      # 推奨拡張機能
├─ public/
│  ├─ icons/
│  └─ images/
└─ src/
   ├─ env/                    # 環境変数読み込みロジック
   │  └─ index.ts            # 型安全な環境変数アクセス
   │
   ├─ app/                    # Next.jsルート（App Router）
   │  ├─ (marketing)/         # 公開ページグループ
   │  ├─ (dashboard)/         # 認証後エリア
   │  │  └─ users/
   │  │     └─ [id]/
   │  ├─ api/                 # API Routes
   │  ├─ layout.tsx
   │  ├─ globals.css
   │  └─ page.tsx
   │
   ├─ features/               # ドメイン単位の機能
   │  ├─ users/
   │  │  ├─ components/       # UI部品
   │  │  ├─ hooks/            # カスタムフック
   │  │  ├─ services/         # API呼び出しロジック
   │  │  ├─ functions/        # ドメイン固有のユーティリティ関数
   │  │  ├─ enums.ts          # 列挙型定義
   │  │  ├─ interfaces.ts     # インターフェース定義
   │  │  ├─ types.ts          # 型エイリアス定義
   │  │  ├─ constants.ts      # 定数定義
   │  │  └─ index.ts          # 外部公開エクスポート
   │  └─ auth/
   │     ├─ components/
   │     ├─ hooks/
   │     ├─ services/
   │     ├─ functions/
   │     ├─ enums.ts
   │     ├─ interfaces.ts
   │     ├─ types.ts
   │     ├─ constants.ts
   │     └─ index.ts
   │
   ├─ shared/                 # 共通モジュール
   │  ├─ components/
   │  │  ├─ ui/               # Button, Input等
   │  │  └─ layout/           # Header, Footer等
   │  ├─ libs/                # HTTP, Logger等
   │  ├─ utils/               # 汎用関数
   │  ├─ hooks/               # 共通カスタムフック
   │  ├─ styles/              # CSS変数
   │  ├─ config/              # 設定ファイル
   │  ├─ enums.ts             # 共通列挙型
   │  ├─ interfaces.ts        # 共通インターフェース
   │  ├─ types.ts             # 共通型定義
   │  └─ constants.ts         # 共通定数
   │
   ├─ tests/                  # テストコード
   │  ├─ unit/
   │  └─ integration/
   │
   └─ mocks/                  # MSWモック
      └─ handlers.ts
```

### レイヤーの役割

- `app/`: ルーティングとページ骨格を担うレイヤー。Next.js が特別扱いするファイルのみを置き、UI やドメインロジックは持ち込まない。
- `features/`: ドメイン固有の UI・hooks・サービス・型・定数をひとまとめに管理し、エクスポートを `index.ts` で制御する。
- `shared/`: ドメインに依存しない汎用モジュール。`features` から参照するが、逆方向の依存は作らない。

```typescript
// app/(dashboard)/users/page.tsx
import { UserList } from "@/features/users/components/UserList";
import { userService } from "@/features/users";

export default async function UsersPage() {
  const users = await userService.fetchUsers();
  return <UserList users={users} />;
}
```

```typescript
// features/users/functions/formatUserName.ts
import type { User } from "../interfaces";
import { UserRole } from "../enums";

export function formatUserName(user: User): string {
  return `${user.name} (${user.email})`;
}

export function isAdminUser(user: User): boolean {
  return user.role === UserRole.Admin;
}
```

```typescript
// shared/utils/formatDate.ts
import { format } from "date-fns";
import { DATE_FORMAT } from "../constants";

export function formatDate(date: Date | string): string {
  const target = typeof date === "string" ? new Date(date) : date;
  return format(target, DATE_FORMAT);
}
```

### features vs shared の判断基準

| 基準         | features                     | shared                     |
| ------------ | ---------------------------- | -------------------------- |
| ドメイン知識 | あり（ユーザー、注文など）   | なし（汎用的）             |
| 依存関係     | 特定の機能に依存             | どこからでも使える         |
| 命名         | ドメイン用語を含む           | 汎用的な名前               |
| 例           | `formatUserName`, `UserRole` | `formatDate`, `HttpMethod` |

### 中規模プロジェクトの推奨アプローチ

- `app/` はルーティングとページ枠組みに専念し、`page.tsx`・`layout.tsx`・`loading.tsx` などの特別ファイルのみを管理する。
- UI・ビジネスロジックはドメイン単位で `features/<domain>/` にまとめ、依存する型・定数・hooks・サービスを閉じ込める。
- 汎用コンポーネントやユーティリティは `shared/` に寄せ、`features` → `shared` の一方向依存を守る。
- スケールに応じて `features` 内の階層（`components`, `services`, `hooks` など）を増やし、レイヤー構造自体は維持する。
- この 3 レイヤー構成をベースラインとし、必要になったタイミングで `entities` や `widgets` など追加の粒度を検討する。

```typescript
// ✅ app/(dashboard)/users/page.tsx
import { UsersPage } from "@/features/users";

export default function UsersRoute() {
  return <UsersPage />;
}
```

```typescript
// ✅ features/users/components/UserList.tsx
"use client";

import { useState } from "react";
import type { User } from "../interfaces";

interface Props {
  users: User[];
}

export function UserList({ users }: Props) {
  const [filter, setFilter] = useState("");
  // コンポーネント固有ロジック
  return <div>{/* UI 実装 */}</div>;
}
```

---

## 開発ガイドライン

### 命名規約

| 種別                 | 記法                     | 例                                      |
| -------------------- | ------------------------ | --------------------------------------- |
| フォルダ             | ケバブケース             | `user-profile`, `learning-content`      |
| React コンポーネント | パスカルケース           | `UserCard.tsx`, `LoginForm.tsx`         |
| 関数・変数           | キャメルケース           | `fetchUsers`, `getUserById`             |
| 定数                 | スクリーミングスネーク   | `DEFAULT_PAGE_SIZE`, `MAX_RETRY_COUNT`  |
| テストファイル       | `*.test.ts(x)`           | `userService.test.ts`                   |
| 型定義               | パスカルケース + 接尾辞  | `UserType`, `ApiResponse`               |
| enum                 | パスカルケース（単数形） | `UserRole`, `OrderStatus`               |
| enum メンバー        | パスカルケース           | `UserRole.Admin`, `OrderStatus.Pending` |

### CSS Modules のクラス命名

- クラス名はキャメルケースを基本とし、ハイフン区切りは使用しない。
- コンポーネント側では `styles.primaryLink` のようにドット記法で参照する。
- 条件付きクラス結合が必要な場合のみ `clsx` を利用し、単一クラス指定では使用しない。

### TypeScript 規約

#### 型定義の原則

```typescript
// ❌ 避けるべき
interface User {
  name: any;
  age?: number;
}

// ✅ 推奨
interface User {
  id: string;
  name: string;
  age: number | null;
  email: string;
  createdAt: Date;
}

// 型エクスポートは明示的に
export type { User };
```

#### enum の定義

```typescript
// ✅ 推奨: as const を利用したリテラル型
export const UserRole = {
  Admin: "ADMIN",
  User: "USER",
  Guest: "GUEST",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

function checkRole(role: UserRole) {
  if (role === UserRole.Admin) {
    // 管理者処理
  }
}

// ✅ 代替: 文字列 enum（数値 enum は避ける）
export enum OrderStatus {
  Pending = "PENDING",
  Processing = "PROCESSING",
  Completed = "COMPLETED",
  Cancelled = "CANCELLED",
}

// ❌ 避けるべき: 数値 enum
enum BadExample {
  First, // 0
  Second, // 1
  Third, // 2
}
```

---

## 環境変数とビルド

環境差異を吸収しつつ型安全に扱うため、必ずスキーマ定義を通して読み込む。

### 型安全な環境変数ロード

```typescript
// src/env/index.ts
import { z } from "zod";

const envSchema = z.object({
  API_URL: z.string().url(),
  APP_ENV: z.enum(["development", "staging", "production"]),
  NODE_ENV: z.enum(["development", "production", "test"]),
  ANALYTICS_ID: z.string().optional(),
  DEBUG_MODE: z.boolean().default(false),
});

export const env = envSchema.parse({
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV,
  NODE_ENV: process.env.NODE_ENV,
  ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  DEBUG_MODE: process.env.NEXT_PUBLIC_DEBUG_MODE === "true",
});
```

### 環境ファイルの配置

- `env/.env.development` — 開発環境用設定
- `env/.env.staging` — ステージング環境用設定
- `env/.env.production` — 本番環境用設定
- `env/.env.example` — 環境変数テンプレート
- `.env.local` — 現在の環境変数（Git 管理外、自動生成）

```bash
# 環境切り替え
npm run env:dev
npm run env:staging
npm run env:prod
npm run env:clean
```

---

## コンポーネント設計

Server Component を基本とし、インタラクティブな要素が必要な場合のみ Client Component を利用する。

```typescript
// ✅ Server Component（デフォルト）
import { UserList } from "@/features/users/components/UserList";

type User = {
  id: string;
  name: string;
  email: string;
};

async function fetchUsers(): Promise<User[]> {
  const res = await fetch("https://example.com/api/users");
  return res.json();
}

export default async function UsersPage() {
  const users = await fetchUsers();
  return <UserList users={users} />;
}
```

```typescript
// ✅ Client Component（インタラクティブな場合のみ）
"use client";

import { useState } from "react";
import type { User } from "../types";

interface Props {
  users: User[];
}

export function UserList({ users }: Props) {
  const [filter, setFilter] = useState("");
  // ...
  return <div>{/* UI 実装 */}</div>;
}
```

```typescript
// 共通的な UI コンポーネントの例
import type { User } from "../types";

interface UserCardProps {
  user: User;
  onEdit?: (id: string) => void;
  className?: string;
}

export function UserCard({ user, onEdit, className }: UserCardProps) {
  return (
    <div className={className}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      {onEdit && <button onClick={() => onEdit(user.id)}>編集</button>}
    </div>
  );
}
```
