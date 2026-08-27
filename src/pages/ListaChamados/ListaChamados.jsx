import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as chamadoService from "../../services/chamadoService";
import { Badge } from "../../components/Badge/Badge";
import { Button } from "../../components/Button/Button";
import { FormField } from "../../components/FormField/FormField";
import styles from "./ListaChamados.module.css";

export function ListaChamados() {
  const [chamados, setChamados] = useState([]);
  const [prioridade, setPrioridade] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Recarrega sempre que o filtro de prioridade muda - o próprio backend
  // já filtra (GET /chamados?prioridade=X)
 
  useEffect(() => {
    setCarregando(true);
    setErro(null);

    chamadoService
      .listarChamados(prioridade || undefined)
      .then(setChamados)
      .catch(() => setErro("Não foi possível carregar os chamados."))
      .finally(() => setCarregando(false));
  }, [prioridade]);

  return (
    <div>
      <div className={styles.cabecalho}>
        <h1>Chamados</h1>
        <Link to="/chamados/novo">
          <Button>Abrir chamado</Button>
        </Link>
      </div>

      <div className={styles.filtro}>
        <FormField
          label="Filtrar por prioridade"
          as="select"
          value={prioridade}
          onChange={(e) => setPrioridade(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="BAIXA">Baixa</option>
          <option value="MEDIA">Média</option>
          <option value="ALTA">Alta</option>
        </FormField>
      </div>

      {carregando && <p>Carregando...</p>}
      {erro && <p className={styles.erro}>{erro}</p>}

      {!carregando && !erro && chamados.length === 0 && (
        <p className={styles.vazio}>Nenhum chamado encontrado.</p>
      )}

      <div className={styles.lista}>
        {chamados.map((chamado) => (
          <Link key={chamado.id} to={`/chamados/${chamado.id}`} className={styles.item}>
            <div className={styles.itemTopo}>
              <span className={styles.itemTitulo}>{chamado.titulo}</span>
              <div className={styles.badges}>
                <Badge tipo="prioridade" valor={chamado.prioridade} />
                <Badge tipo="status" valor={chamado.status} />
              </div>
            </div>
            <div className={styles.itemRodape}>
              <span>Solicitante: {chamado.solicitante?.nome}</span>
              {chamado.tecnicoResponsavel && (
                <span>Técnico: {chamado.tecnicoResponsavel.nome}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
