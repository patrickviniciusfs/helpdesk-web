import styles from "./Alert.module.css";

export function Alert({ tipo = "erro", children }) {
  if (!children) return null;

  return <div className={`${styles.alerta} ${styles[tipo]}`}>{children}</div>;
}
