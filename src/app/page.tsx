import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <h1 className={styles.title}>Next.js Template</h1>
        <p className={styles.subtitle}>
          READMEの規約に従って作成されたNext.jsプロジェクトテンプレート
        </p>

        <div className={styles.cta}>
          <div>
            <Link href="/users" className={styles.primaryLink}>
              ユーザー一覧を見る
            </Link>
          </div>

          <div className={styles.featuresSection}>
            <h2 className={styles.featuresHeading}>機能</h2>
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>📁 ディレクトリ構成</h3>
                <p className={styles.featureDescription}>
                  READMEの規約に従ったfeatures/shared分離
                </p>
              </div>
              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>🔧 TypeScript</h3>
                <p className={styles.featureDescription}>
                  型安全な開発環境とESLint/Prettier設定
                </p>
              </div>
              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>👥 ユーザー管理</h3>
                <p className={styles.featureDescription}>
                  サンプルユーザー機能（CRUD操作のデモ）
                </p>
              </div>
              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>🎨 デザインシステム</h3>
                <p className={styles.featureDescription}>
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
