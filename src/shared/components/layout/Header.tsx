import styles from "./Header.module.css";

interface HeaderProps {
  title?: string;
}

export function Header({ title = "Next.js App" }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </header>
  );
}
