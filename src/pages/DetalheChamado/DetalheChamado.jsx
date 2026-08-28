import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as chamadoService from "../../services/chamadoService";
import { useAuth } from "../../hooks/useAuth";
import { Badge } from "../../components/Badge/Badge";
import { Button } from "../../components/Button/Button";
import { FormField } from "../../components/FormField/FormField";
import { Spinner } from "../../components/Spinner/Spinner";
import { Alert } from "../../components/Alert/Alert";
import styles from "./DetalheChamado.module.css";

export function DetalheChamado() {
  const { id } = useParams();
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [chamado, setChamado] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState(null);
  const [salvando, setSalvando] = useState(false);

  const ehTecnico = usuario?.role === "TECNICO";

  useEffect(() => {
    carregarChamado();
    
  }, [id]);

  function carregarChamado() {
    setCarregando(true);
    setErro(null);

    chamadoService
      .buscarChamadoPorId(id)
      .then((dados) => {
        setChamado(dados);
        setForm({ titulo: dados.titulo, descricao: dados.descricao, prioridade: dados.prioridade, status: dados.status });
      })
      .catch((err) => {
       
        setErro(err.response?.data?.mensagens?.[0] || "Não foi possível carregar o chamado.");
      })
      .finally(() => setCarregando(false));
  }

  function atualizarCampo(campo) {
    return (event) => setForm((atual) => ({ ...atual, [campo]: event.target.value }));
  }

  async function handleSalvar(event) {
    event.preventDefault();
    setSalvando(true);

    try {
      const atualizado = await chamadoService.atualizarChamado(id, form);
      setChamado(atualizado);
      setEditando(false);
    } catch (err) {
      setErro(err.response?.data?.mensagens?.[0] || "Não foi possível salvar as alterações.");
    } finally {
      setSalvando(false);
    }
  }

  async function handleAssumir() {
    setSalvando(true);
    try {
      const atualizado = await chamadoService.assumirChamado(id);
      setChamado(atualizado);
    } catch (err) {
      setErro(err.response?.data?.mensagens?.[0] || "Não foi possível assumir o chamado.");
    } finally {
      setSalvando(false);
    }
  }

  async function handleExcluir() {
    const confirmado = window.confirm("Tem certeza que deseja excluir este chamado?");
    if (!confirmado) return;

    await chamadoService.deletarChamado(id);
    navigate("/chamados");
  }

  if (carregando) return <Spinner texto="Carregando chamado..." />;
  if (erro && !chamado) return <Alert tipo="erro">{erro}</Alert>;

  return (
    <div className={styles.pagina}>
      <button className={styles.voltar} onClick={() => navigate("/chamados")}>
        ← Voltar para chamados
      </button>

      <div className={styles.card}>
        <div className={styles.cabecalho}>
          <h1>{chamado.titulo}</h1>
          <div className={styles.badges}>
            <Badge tipo="prioridade" valor={chamado.prioridade} />
            <Badge tipo="status" valor={chamado.status} />
          </div>
        </div>

        <p className={styles.descricao}>{chamado.descricao}</p>

        <dl className={styles.metadados}>
          <div>
            <dt>Solicitante</dt>
            <dd>{chamado.solicitante?.nome}</dd>
          </div>
          <div>
            <dt>Técnico responsável</dt>
            <dd>{chamado.tecnicoResponsavel?.nome || "Ainda não atribuído"}</dd>
          </div>
          <div>
            <dt>Aberto em</dt>
            <dd>{new Date(chamado.dataCriacao).toLocaleString("pt-BR")}</dd>
          </div>
        </dl>

        <Alert tipo="erro">{erro}</Alert>

        {/* Ações exclusivas do técnico - escondidas para USUARIO comum
            por UX; a proteção real já está garantida no backend. */}
        {ehTecnico && !editando && (
          <div className={styles.acoes}>
            {!chamado.tecnicoResponsavel && (
              <Button onClick={handleAssumir} disabled={salvando}>
                Assumir chamado
              </Button>
            )}
            <Button variant="secondary" onClick={() => setEditando(true)}>
              Editar status/prioridade
            </Button>
            <Button variant="danger" onClick={handleExcluir}>
              Excluir
            </Button>
          </div>
        )}

        {ehTecnico && editando && (
          <form className={styles.formEdicao} onSubmit={handleSalvar}>
            
            <FormField
              label="Prioridade"
              as="select"
              value={form.prioridade}
              onChange={atualizarCampo("prioridade")}
            >
              <option value="BAIXA">Baixa</option>
              <option value="MEDIA">Média</option>
              <option value="ALTA">Alta</option>
            </FormField>

            <FormField label="Status" as="select" value={form.status} onChange={atualizarCampo("status")}>
              <option value="ABERTO">Aberto</option>
              <option value="EM_ANDAMENTO">Em andamento</option>
              <option value="RESOLVIDO">Resolvido</option>
            </FormField>

            <div className={styles.acoes}>
              <Button type="submit" disabled={salvando}>
                {salvando ? "Salvando..." : "Salvar alterações"}
              </Button>
              <Button variant="secondary" onClick={() => setEditando(false)} disabled={salvando}>
                Cancelar
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
