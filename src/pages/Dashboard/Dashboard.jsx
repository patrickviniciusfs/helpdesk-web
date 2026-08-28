import { useEffect, useMemo, useState } from "react";
import * as chamadoService from "../../services/chamadoService";
import { useAuth } from "../../hooks/useAuth";
import { StatCard } from "../../components/StatCard/StatCard";
import { StatusChart } from "../../components/StatusChart/StatusChart";
import styles from "./Dashboard.module.css";

export function Dashboard() {
  const { usuario } = useAuth();
  const [chamados, setChamados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    chamadoService
      .listarChamados()
      .then(setChamados)
      .catch(() => setErro("Não foi possível carregar os dados do dashboard."))
      .finally(() => setCarregando(false));
  }, []);

  /**
   * useMemo evita recalcular as contagens em toda renderização - só
   * recalcula quando a lista de chamados realmente muda. 
   */
  const contagens = useMemo(() => {
    return {
      total: chamados.length,
      abertos: chamados.filter((c) => c.status === "ABERTO").length,
      emAndamento: chamados.filter((c) => c.status === "EM_ANDAMENTO").length,
      resolvidos: chamados.filter((c) => c.status === "RESOLVIDO").length,
    };
  }, [chamados]);

  const dadosGrafico = [
    { label: "Aberto", valor: contagens.abertos, tom: "aberto" },
    { label: "Em andamento", valor: contagens.emAndamento, tom: "andamento" },
    { label: "Resolvido", valor: contagens.resolvidos, tom: "resolvido" },
  ];

  return (
    <div className={styles.pagina}>
      <h1>Olá, {usuario?.nome?.split(" ")[0]}</h1>
      <p className={styles.subtitulo}>
        {usuario?.role === "TECNICO"
          ? "Visão geral de todos os chamados do sistema"
          : "Resumo dos chamados que você abriu"}
      </p>

      {carregando && <p>Carregando...</p>}
      {erro && <p className={styles.erro}>{erro}</p>}

      {!carregando && !erro && (
        <>
          <div className={styles.cards}>
            <StatCard label="Total de chamados" valor={contagens.total} tom="neutro" />
            <StatCard label="Abertos" valor={contagens.abertos} tom="aberto" />
            <StatCard label="Em andamento" valor={contagens.emAndamento} tom="andamento" />
            <StatCard label="Resolvidos" valor={contagens.resolvidos} tom="resolvido" />
          </div>

          <div className={styles.graficoCard}>
            <h2>Chamados por status</h2>
            {contagens.total === 0 ? (
              <p className={styles.vazio}>Nenhum chamado registrado ainda.</p>
            ) : (
              <StatusChart dados={dadosGrafico} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
