import Link from "next/link";
import { userService } from "@/features/users";
import { UserList } from "@/features/users";
import styles from "./page.module.css";

export default async function UsersPage() {
  const users = await userService.findAll();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>ユーザー一覧</h1>
        <p className={styles.description}>
          登録されているユーザーの一覧です。検索機能を使って特定のユーザーを見つけることができます。
        </p>
      </div>

      <UserList users={users} />

      <div className={styles.backLinkWrapper}>
        <Link href="/" className={styles.backLink}>
          ← ホームに戻る
        </Link>
      </div>
    </div>
  );
}
