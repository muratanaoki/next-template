import clsx from "clsx";
import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={clsx(styles.root)}>
      <div className={clsx(styles.content)}>
        <h1 className={clsx(styles.title)}>Next.js Template</h1>
        <p className={clsx(styles.subtitle)}>
          READMEの規約に従って作成されたNext.jsプロジェクトテンプレート
        </p>

        <div className={clsx(styles.cta)}>
          <div>
            <Link href="/users" className={clsx(styles["primary-link"])}>
              ユーザー一覧を見る
            </Link>
          </div>

          <div className={clsx(styles["features-section"])}>
            <h2 className={clsx(styles["features-heading"])}>機能</h2>
            <div className={clsx(styles["features-grid"])}>
              <div className={clsx(styles["feature-card"])}>
                <h3 className={clsx(styles["feature-title"])}>
                  📁 ディレクトリ構成
                </h3>
                <p className={clsx(styles["feature-description"])}>
                  READMEの規約に従ったfeatures/shared分離
                </p>
              </div>
              <div className={clsx(styles["feature-card"])}>
                <h3 className={clsx(styles["feature-title"])}>🔧 TypeScript</h3>
                <p className={clsx(styles["feature-description"])}>
                  型安全な開発環境とESLint/Prettier設定
                </p>
              </div>
              <div className={clsx(styles["feature-card"])}>
                <h3 className={clsx(styles["feature-title"])}>
                  👥 ユーザー管理
                </h3>
                <p className={clsx(styles["feature-description"])}>
                  サンプルユーザー機能（CRUD操作のデモ）
                </p>
              </div>
              <div className={clsx(styles["feature-card"])}>
                <h3 className={clsx(styles["feature-title"])}>
                  🎨 デザインシステム
                </h3>
                <p className={clsx(styles["feature-description"])}>
                  CSS ModulesとデザイントークンによるレスポンシブUI
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
