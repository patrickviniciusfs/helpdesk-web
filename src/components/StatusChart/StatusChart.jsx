import styles from "./StatusChart.module.css";

export function StatusChart({ dados }) {
  const maiorValor = Math.max(...dados.map((d) => d.valor), 1);
  // O "1" no Math.max evita divisão por zero quando todos os valores são 0
  // (ex: usuário sem nenhum chamado ainda).

  return (
    <div className={styles.grafico}>
      {dados.map((item) => {
        const largura = (item.valor / maiorValor) * 100;

        return (
          <div key={item.label} className={styles.linha}>
            <span className={styles.rotulo}>{item.label}</span>
            <div className={styles.trilha}>
              <div
                className={`${styles.barra} ${styles[item.tom]}`}
                style={{ width: `${largura}%` }}
              />
            </div>
            <span className={styles.numero}>{item.valor}</span>
          </div>
        );
      })}
    </div>
  );
}
