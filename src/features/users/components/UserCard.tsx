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
      <div className={styles.header}>
        <div className={styles.info}>
          <h3 className={styles.name}>{user.name}</h3>
          <p className={styles.email}>{user.email}</p>
          <p className={styles.meta}>
            ステータス: {getUserDisplayStatus(user)}
          </p>
          <p className={styles.meta}>
            作成日: {user.createdAt.toLocaleDateString("ja-JP")}
          </p>
        </div>
        <div className={styles.actions}>
          <span
            className={clsx(
              styles.badge,
              user.role === "ADMIN" ? styles.badgeAdmin : styles.badgeUser
            )}
          >
            {user.role}
          </span>
          {onEdit && (
            <button
              onClick={() => onEdit(user.id)}
              className={styles.editButton}
            >
              編集
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
