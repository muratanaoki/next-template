import type { UserRoleType, UserStatusType } from "./types";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRoleType;
  status: UserStatusType;
  createdAt: Date;
}

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
}