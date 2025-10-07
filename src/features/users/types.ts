import type { UserRole, UserStatus } from "./enums";

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];
export type UserStatusType = (typeof UserStatus)[keyof typeof UserStatus];
export type UserId = string;
export type UserEmail = string;