import { userService } from "@/features/users";
import { UserList } from "@/features/users";

export default async function UsersPage() {
  const users = await userService.findAll();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">ユーザー一覧</h1>
        <p className="text-gray-600">
          登録されているユーザーの一覧です。検索機能を使って特定のユーザーを見つけることができます。
        </p>
      </div>
      
      <UserList users={users} />
      
      <div className="mt-8">
        <a 
          href="/"
          className="inline-block px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          ← ホームに戻る
        </a>
      </div>
    </div>
  );
}