"use client";

import { useState } from "react";
import type { User } from "../interfaces";
import { UserCard } from "./UserCard";
import styles from "./UserList.module.css";

interface UserListProps {
  users: User[];
}

export function UserList({ users }: UserListProps) {
  const [filter, setFilter] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase())
  );

  const handleEditUser = (id: string) => {
    console.log("Edit user:", id);
    // 実際のアプリケーションでは、編集画面に遷移する処理を実装
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="ユーザー名またはメールアドレスで検索..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.list}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} onEdit={handleEditUser} />
          ))
        ) : (
          <p className={styles.empty}>
            {filter
              ? "検索条件に一致するユーザーが見つかりません。"
              : "ユーザーが登録されていません。"}
          </p>
        )}
      </div>
    </div>
  );
}
