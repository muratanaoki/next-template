import clsx from "clsx";
import styles from "./Header.module.css";

interface HeaderProps {
  title?: string;
}

export function Header({ title = "Next.js App" }: HeaderProps) {
  return (
    <header className={clsx(styles.header)}>
      <div className={clsx(styles.inner)}>
        <h1 className={clsx(styles.title)}>{title}</h1>
      </div>
    </header>
  );
}
