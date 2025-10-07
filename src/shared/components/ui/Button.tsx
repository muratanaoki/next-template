import clsx from "clsx";
import type { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
}

export function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const classes = clsx(
    styles.button,
    styles[variant],
    disabled && styles.disabled,
    className
  );

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
