import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as chamadoService from "../../services/chamadoService";
import { FormField } from "../../components/FormField/FormField";
import { Button } from "../../components/Button/Button";
import styles from "./NovoChamado.module.css";

export function NovoChamado() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ titulo: "", descricao: "", prioridade: "MEDIA" });
  const [erro, setErro] = useState(null);
  const [enviando, setEnviando] = useState(false);

  function atualizarCampo(campo) {
    return (event) => setForm((atual) => ({ ...atual, [campo]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErro(null);
    setEnviando(true);

    try {
      const chamadoCriado = await chamadoService.criarChamado(form);
   
      navigate(`/chamados/${chamadoCriado.id}`);
    } catch (err) {
      const mensagem = err.response?.data?.mensagens?.[0] || "Não foi possível abrir o chamado.";
      setErro(mensagem);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className={styles.pagina}>
      <h1>Abrir chamado</h1>

      <form className={styles.card} onSubmit={handleSubmit}>
        <FormField
          label="Título"
          value={form.titulo}
          onChange={atualizarCampo("titulo")}
          maxLength={150}
          required
        />

        <FormField
          label="Descrição"
          as="textarea"
          rows={5}
          value={form.descricao}
          onChange={atualizarCampo("descricao")}
          maxLength={2000}
          required
        />

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

        {erro && <p className={styles.erroGeral}>{erro}</p>}

        <Button type="submit" disabled={enviando}>
          {enviando ? "Enviando..." : "Abrir chamado"}
        </Button>
      </form>
    </div>
  );
}
