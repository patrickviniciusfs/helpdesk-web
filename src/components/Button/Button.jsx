import styles from "./Button.module.css";

export function Button({ variant = "primary", type = "button", disabled, onClick, children }) {
  const classe = `${styles.botao} ${styles[variant] || ""}`;

  return (
    <button type={type} className={classe} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
