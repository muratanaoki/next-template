# Next.js×Go コーディング規約 v1.2

## 📋 目次

1. [概要](#概要)
2. [フロントエンド（Next.js）](#フロントエンドnextjs)

---

## フロントエンド（Next.js）

### 1. ディレクトリ構成

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

#### `app/` vs `features/` の使い分け

**`app/` ディレクトリ**

- Next.js の**ルーティング専用**
- 特別な意味を持つファイルのみ配置
- 配置すべきファイル：
  - `page.tsx` - ページエントリーポイント
  - `layout.tsx` - レイアウト定義
  - `loading.tsx` - ローディング状態
  - `error.tsx` - エラー境界
  - `not-found.tsx` - 404 ページ
  - `route.ts` - API Routes
  - `globals.css` - グローバルスタイル

**`features/` ディレクトリ**

- **実際の UI コンポーネントとビジネスロジック**を配置
- ドメイン知識を含む機能実装
- 再利用可能なコンポーネント群
- 各機能ごとの構成：
  - `components/` - UI コンポーネント
  - `hooks/` - カスタムフック
  - `services/` - API 呼び出しロジック
  - `functions/` - ドメイン固有のユーティリティ関数
  - `enums.ts` - 列挙型定義
  - `interfaces.ts` - インターフェース定義
  - `types.ts` - 型エイリアス定義
  - `constants.ts` - 定数定義
  - `index.ts` - 外部公開用エクスポート

**ファイル分割の例**

```typescript
// features/users/enums.ts
export const UserRole = {
  Admin: "ADMIN",
  User: "USER",
  Guest: "GUEST",
} as const;

export const UserStatus = {
  Active: "ACTIVE",
  Inactive: "INACTIVE",
  Suspended: "SUSPENDED",
} as const;
```

```typescript
// features/users/interfaces.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
}

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
}
```

```typescript
// features/users/types.ts
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export type UserId = string;
export type UserEmail = string;
```

```typescript
// features/users/constants.ts
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_USERNAME_LENGTH = 50;
export const MIN_PASSWORD_LENGTH = 8;
export const USER_CACHE_TTL = 300; // 5分
```

```typescript
// features/users/functions/formatUserName.ts
export function formatUserName(user: User): string {
  return `${user.name} (${user.email})`;
}

export function isAdminUser(user: User): boolean {
  return user.role === UserRole.Admin;
}
```

```typescript
// features/users/index.ts
// 外部に公開するものだけエクスポート
export { UserCard, UserList } from "./components";
export { useUserQuery, useUserMutation } from "./hooks";
export { userService } from "./services";
export type { User, UserRepository } from "./interfaces";
export { UserRole, UserStatus } from "./enums";
export { formatUserName, isAdminUser } from "./functions";
```

**`shared/` ディレクトリ**

- **ドメイン知識を持たない共通モジュール**
- アプリケーション全体で再利用される汎用的なコード
- 各ファイルの役割：
  - `components/ui/` - ボタン、入力欄などの汎用 UI コンポーネント
  - `components/layout/` - ヘッダー、フッターなどのレイアウト部品
  - `libs/` - HTTP クライアント、ロガーなどのライブラリ
  - `utils/` - 日付フォーマット、文字列操作などの汎用関数
  - `hooks/` - useDebounce、useLocalStorage などの共通フック
  - `styles/` - CSS 変数、テーマ定義
  - `config/` - アプリケーション設定
  - `enums.ts` - アプリ全体で使う列挙型
  - `interfaces.ts` - アプリ全体で使うインターフェース
  - `types.ts` - アプリ全体で使う型定義
  - `constants.ts` - アプリ全体で使う定数

**ファイル分割の例**

```typescript
// shared/enums.ts
export const HttpMethod = {
  Get: "GET",
  Post: "POST",
  Put: "PUT",
  Delete: "DELETE",
} as const;

export const Theme = {
  Light: "light",
  Dark: "dark",
  System: "system",
} as const;
```

```typescript
// shared/interfaces.ts
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
```

```typescript
// shared/types.ts
export type HttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod];
export type Theme = (typeof Theme)[keyof typeof Theme];
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type ID = string | number;
```

```typescript
// shared/constants.ts
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
export const API_TIMEOUT = 30000; // 30秒
export const DEFAULT_LOCALE = "ja";
export const DATE_FORMAT = "YYYY-MM-DD";
export const DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
```

```typescript
// shared/utils/formatDate.ts
import { format } from "date-fns";
import { DATE_FORMAT } from "../constants";

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, DATE_FORMAT);
}
```

```typescript
// shared/hooks/useDebounce.ts
import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

**features vs shared の判断基準**

| 基準         | features                     | shared                     |
| ------------ | ---------------------------- | -------------------------- |
| ドメイン知識 | あり（ユーザー、注文など）   | なし（汎用的）             |
| 依存関係     | 特定の機能に依存             | どこからでも使える         |
| 命名         | ドメイン用語を含む           | 汎用的な名前               |
| 例           | `formatUserName`, `UserRole` | `formatDate`, `HttpMethod` |

**使用例**

```typescript
// ✅ app/(dashboard)/users/page.tsx
// ルーティングとデータ取得のみ
import { UserList } from "@/features/users/components/UserList";

export default async function UsersPage() {
  const users = await fetchUsers();
  return <UserList users={users} />;
}
```

```typescript
// ✅ features/users/components/UserList.tsx
// 実際のUIロジック
"use client";

export function UserList({ users }: Props) {
  const [filter, setFilter] = useState("");
  // コンポーネントロジック
  return <div>{/* UI実装 */}</div>;
}
```

```typescript
// ❌ 避けるべき - app内にコンポーネントを配置
// app/(dashboard)/users/UserList.tsx
```

### 2. 命名規約

| 種別                 | 記法                     | 例                                      |
| -------------------- | ------------------------ | --------------------------------------- |
| フォルダ             | ケバブケース             | `user-profile`, `learning-content`      |
| React コンポーネント | パスカルケース           | `UserCard.tsx`, `LoginForm.tsx`         |
| 関数・変数           | キャメルケース           | `fetchUsers.ts`, `getUserById`          |
| 定数                 | スクリーミングスネーク   | `DEFAULT_PAGE_SIZE`, `MAX_RETRY_COUNT`  |
| テストファイル       | `*.test.ts(x)`           | `userService.test.ts`                   |
| 型定義               | パスカルケース + 接尾辞  | `UserType`, `ApiResponse`               |
| enum                 | パスカルケース（単数形） | `UserRole`, `OrderStatus`               |
| enum メンバー        | パスカルケース           | `UserRole.Admin`, `OrderStatus.Pending` |

#### CSS Modules のクラス命名

- CSS Modules のクラス名は原則として **キャメルケース** を使用する。
- ハイフン区切りのクラス名は使用しない。既存の資産から移行する場合は `primaryLink` のような形にリネームする。
- JavaScript/TypeScript 側では `styles.primaryLink` のようにドット記法で参照する。
- 条件付きクラス結合が必要な場合のみ `clsx` を利用し、単一クラスの指定には用いない。

### 3. TypeScript 規約

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
// ✅ 推奨: const enumまたはas constを使用
export const UserRole = {
  Admin: "ADMIN",
  User: "USER",
  Guest: "GUEST",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

// 使用例
function checkRole(role: UserRole) {
  if (role === UserRole.Admin) {
    // 管理者処理
  }
}

// ✅ 別の方法: TypeScript enum（数値enumは避ける）
export enum OrderStatus {
  Pending = "PENDING",
  Processing = "PROCESSING",
  Completed = "COMPLETED",
  Cancelled = "CANCELLED",
}

// ❌ 避けるべき: 数値enum
enum BadExample {
  First, // 0
  Second, // 1
  Third, // 2
}
```

#### 環境変数の型安全な管理

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

#### 環境別ビルド

```bash
# 開発環境
npm run dev                    # 開発サーバー起動
npm run build                  # 開発環境設定でビルド

# ステージング環境
npm run dev:staging           # ステージング用開発サーバー
npm run build:staging         # ステージング環境設定でビルド
npm run preview:staging       # ステージング環境プレビュー

# 本番環境
npm run build:production      # 本番環境設定でビルド
npm run preview:production    # 本番環境プレビュー
```

**環境ファイル構成**

- `env/.env.development` - 開発環境用設定
- `env/.env.staging` - ステージング環境用設定
- `env/.env.production` - 本番環境用設定
- `env/.env.example` - 環境変数テンプレート
- `.env.local` - 現在の環境変数（Git管理外、自動生成）

**環境切り替えコマンド**

```bash
npm run env:dev      # 開発環境に切り替え
npm run env:staging  # ステージング環境に切り替え
npm run env:prod     # 本番環境に切り替え
npm run env:clean    # 環境設定をクリア
```

### 4. コンポーネント設計

#### Server Component と Client Component の使い分け

```typescript
// ✅ Server Component（デフォルト）
// app/(dashboard)/users/page.tsx
import { UserList } from "@/features/users/components/UserList";

export default async function UsersPage() {
  const users = await fetchUsers(); // サーバー側で取得
  return <UserList users={users} />;
}

// ✅ Client Component（インタラクティブな場合のみ）
// features/users/components/UserList.tsx
("use client");

import { useState } from "react";

interface Props {
  users: User[];
}

export function UserList({ users }: Props) {
  const [filter, setFilter] = useState("");
  // ...
}
```

#### コンポーネント構成パターン

```typescript
// features/users/components/UserCard.tsx
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

#### 必須拡張機能

VS Code で`Ctrl+P`（Mac: `Cmd+P`）を押し、以下のコマンドを実行してインストールします。

```
ext install esbenp.prettier-vscode
ext install dbaeumer.vscode-eslint
ext install stylelint.vscode-stylelint
```

---

**更新履歴**

- v1.2 (2025-01-07): 初版作成（フロントエンド版）
