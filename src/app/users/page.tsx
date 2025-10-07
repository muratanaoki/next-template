import clsx from "clsx";
import Link from "next/link";
import { userService } from "@/features/users";
import { UserList } from "@/features/users";
import styles from "./page.module.css";

export default async function UsersPage() {
  const users = await userService.findAll();

  return (
    <div className={clsx(styles.page)}>
      <div className={clsx(styles.header)}>
        <h1 className={clsx(styles.title)}>ユーザー一覧</h1>
        <p className={clsx(styles.description)}>
          登録されているユーザーの一覧です。検索機能を使って特定のユーザーを見つけることができます。
        </p>
      </div>

      <UserList users={users} />

      <div className={clsx(styles["back-link-wrapper"])}>
        <Link href="/" className={clsx(styles["back-link"])}>
          ← ホームに戻る
        </Link>
      </div>
    </div>
  );
}
