import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Next.js Template
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          READMEの規約に従って作成されたNext.jsプロジェクトテンプレート
        </p>

        <div className="space-y-4">
          <div>
            <Link
              href="/users"
              className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              ユーザー一覧を見る
            </Link>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">機能</h2>
            <div className="grid md:grid-cols-2 gap-4 text-left max-w-4xl mx-auto">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold mb-2">📁 ディレクトリ構成</h3>
                <p className="text-sm text-gray-600">
                  READMEの規約に従ったfeatures/shared分離
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold mb-2">🔧 TypeScript</h3>
                <p className="text-sm text-gray-600">
                  型安全な開発環境とESLint/Prettier設定
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold mb-2">👥 ユーザー管理</h3>
                <p className="text-sm text-gray-600">
                  サンプルユーザー機能（CRUD操作のデモ）
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold mb-2">🎨 TailwindCSS</h3>
                <p className="text-sm text-gray-600">
                  レスポンシブなUIコンポーネント
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
