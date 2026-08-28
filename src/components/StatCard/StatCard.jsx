import styles from "./StatCard.module.css";

/**
 * Card de estatística simples: um número grande + um rótulo.
 * Reutilizável para qualquer contador (total, abertos, em andamento...),
 * evitando repetir a mesma marcação 4 vezes no Dashboard.
 */
export function StatCard({ label, valor, tom = "neutro" }) {
  return (
    <div className={`${styles.card} ${styles[tom]}`}>
      <span className={styles.valor}>{valor}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
