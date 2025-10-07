"use client";

import type { User } from "../interfaces";
import { formatUserName, getUserDisplayStatus } from "../functions/formatUserName";

interface UserCardProps {
  user: User;
  onEdit?: (id: string) => void;
  className?: string;
}

export function UserCard({ user, onEdit, className = "" }: UserCardProps) {
  return (
    <div className={`border rounded-lg p-4 bg-white shadow-sm ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-500">
            ステータス: {getUserDisplayStatus(user)}
          </p>
          <p className="text-sm text-gray-500">
            作成日: {user.createdAt.toLocaleDateString("ja-JP")}
          </p>
        </div>
        <div className="flex gap-2">
          <span className={`px-2 py-1 text-xs rounded ${
            user.role === "ADMIN" 
              ? "bg-purple-100 text-purple-800" 
              : "bg-blue-100 text-blue-800"
          }`}>
            {user.role}
          </span>
          {onEdit && (
            <button 
              onClick={() => onEdit(user.id)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
            >
              編集
            </button>
          )}
        </div>
      </div>
    </div>
  );
}