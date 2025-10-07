"use client";

import clsx from "clsx";
import type { User } from "../interfaces";
import { getUserDisplayStatus } from "../functions/formatUserName";
import styles from "./UserCard.module.css";

interface UserCardProps {
  user: User;
  onEdit?: (id: string) => void;
  className?: string;
}

export function UserCard({ user, onEdit, className = "" }: UserCardProps) {
  return (
    <div className={clsx(styles.card, className)}>
      <div className={clsx(styles.header)}>
        <div className={clsx(styles.info)}>
          <h3 className={clsx(styles.name)}>{user.name}</h3>
          <p className={clsx(styles.email)}>{user.email}</p>
          <p className={clsx(styles.meta)}>
            ステータス: {getUserDisplayStatus(user)}
          </p>
          <p className={clsx(styles.meta)}>
            作成日: {user.createdAt.toLocaleDateString("ja-JP")}
          </p>
        </div>
        <div className={clsx(styles.actions)}>
          <span
            className={clsx(
              styles.badge,
              user.role === "ADMIN"
                ? styles["badge-admin"]
                : styles["badge-user"]
            )}
          >
            {user.role}
          </span>
          {onEdit && (
            <button
              onClick={() => onEdit(user.id)}
              className={clsx(styles["edit-button"])}
            >
              編集
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
