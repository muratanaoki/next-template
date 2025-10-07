import type { User } from "../interfaces";

// モックデータ
const mockUsers: User[] = [
  {
    id: "1",
    name: "田中太郎",
    email: "tanaka@example.com",
    role: "ADMIN",
    status: "ACTIVE",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "佐藤花子",
    email: "sato@example.com",
    role: "USER",
    status: "ACTIVE",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "3",
    name: "鈴木次郎",
    email: "suzuki@example.com",
    role: "USER",
    status: "INACTIVE",
    createdAt: new Date("2024-02-01"),
  },
];

export const userService = {
  async findAll(): Promise<User[]> {
    // 実際のAPIコールをシミュレート
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockUsers;
  },

  async findById(id: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockUsers.find(user => user.id === id) || null;
  },

  async create(userData: Omit<User, "id" | "createdAt">): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const newUser: User = {
      id: String(mockUsers.length + 1),
      ...userData,
      createdAt: new Date(),
    };
    mockUsers.push(newUser);
    return newUser;
  },
};