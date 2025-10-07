import { z } from "zod";

// 環境変数の型と制約を定義し、実行時に安全に扱えるようにする。
const envSchema = z.object({
  // API 通信先のベース URL。URL 形式の文字列でなければならない。
  API_URL: z.string().url(),
  // アプリケーションが動作している環境を表す。
  APP_ENV: z.enum(["development", "staging", "production"]),
  // Next.js / Node.js が認識する実行環境。ビルド時にも利用される。
  NODE_ENV: z.enum(["development", "production", "test"]),
  // デバッグフラグ。指定がなければ false をデフォルトにする。
  DEBUG_MODE: z.boolean().default(false),
});

// process.env から値を取得してスキーマに通し、未設定や型不一致を検知する。
export const env = envSchema.parse({
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  NODE_ENV: process.env.NODE_ENV,
  DEBUG_MODE: process.env.NEXT_PUBLIC_DEBUG_MODE === "true",
});
