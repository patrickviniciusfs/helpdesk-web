import styles from "./FormField.module.css";

export function FormField({ label, as = "input", error, children, ...props }) {
  const Tag = as;

  return (
    <label className={styles.campo}>
      <span className={styles.label}>{label}</span>
      <Tag className={`${styles.input} ${error ? styles.inputComErro : ""}`} {...props}>
        {children}
      </Tag>
      {error && <span className={styles.erro}>{error}</span>}
    </label>
  );
}
