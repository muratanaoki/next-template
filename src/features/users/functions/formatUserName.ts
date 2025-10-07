import type { User } from "../interfaces";
import { UserRole } from "../enums";

export function formatUserName(user: User): string {
  return `${user.name} (${user.email})`;
}

export function isAdminUser(user: User): boolean {
  return user.role === UserRole.Admin;
}

export function getUserDisplayStatus(user: User): string {
  switch (user.status) {
    case "ACTIVE":
      return "アクティブ";
    case "INACTIVE":
      return "非アクティブ";
    case "SUSPENDED":
      return "停止中";
    default:
      return "不明";
  }
}