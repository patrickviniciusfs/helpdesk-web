import styles from "./Badge.module.css";

const LABELS = {
  BAIXA: "Baixa",
  MEDIA: "Média",
  ALTA: "Alta",
  ABERTO: "Aberto",
  EM_ANDAMENTO: "Em andamento",
  RESOLVIDO: "Resolvido",
};

export function Badge({ tipo, valor }) {
  const classeCor = styles[`${tipo}_${valor}`] || "";
  const label = LABELS[valor] || valor;

  return <span className={`${styles.badge} ${classeCor}`}>{label}</span>;
}
