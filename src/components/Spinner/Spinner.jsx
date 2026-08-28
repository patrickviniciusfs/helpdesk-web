import styles from "./Spinner.module.css";

export function Spinner({ texto = "Carregando..." }) {
  return (
    <div className={styles.container}>
      <span className={styles.spinner} aria-hidden="true" />
      <span>{texto}</span>
    </div>
  );
}
