"use client";

import { useState } from "react";
import type { User } from "../interfaces";
import { UserCard } from "./UserCard";

interface UserListProps {
  users: User[];
}

export function UserList({ users }: UserListProps) {
  const [filter, setFilter] = useState("");

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(filter.toLowerCase()) ||
    user.email.toLowerCase().includes(filter.toLowerCase())
  );

  const handleEditUser = (id: string) => {
    console.log("Edit user:", id);
    // 実際のアプリケーションでは、編集画面に遷移する処理を実装
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <input
          type="text"
          placeholder="ユーザー名またはメールアドレスで検索..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="grid gap-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={handleEditUser}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">
            {filter ? "検索条件に一致するユーザーが見つかりません。" : "ユーザーが登録されていません。"}
          </p>
        )}
      </div>
    </div>
  );
}