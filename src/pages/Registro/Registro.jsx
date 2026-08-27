import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";
import { FormField } from "../../components/FormField/FormField";
import { Button } from "../../components/Button/Button";
import styles from "../Login/Login.module.css"; // reaproveita o mesmo card de login

export function Registro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ nome: "", email: "", senha: "", role: "USUARIO" });
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
      await authService.registrar(form);
      // Após registrar, o usuário ainda não está autenticado (registrar
      // não seta cookie) - manda para o login para entrar normalmente.
      navigate("/login");
    } catch (err) {
      const mensagem = err.response?.data?.mensagens?.[0] || "Não foi possível concluir o cadastro.";
      setErro(mensagem);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className={styles.pagina}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h1 className={styles.titulo}>Criar conta</h1>
        <p className={styles.subtitulo}>Cadastre-se para abrir ou atender chamados</p>

        <FormField label="Nome" value={form.nome} onChange={atualizarCampo("nome")} required />
        <FormField
          label="E-mail"
          type="email"
          value={form.email}
          onChange={atualizarCampo("email")}
          required
        />
        <FormField
          label="Senha"
          type="password"
          value={form.senha}
          onChange={atualizarCampo("senha")}
          minLength={6}
          required
        />
        <FormField label="Perfil" as="select" value={form.role} onChange={atualizarCampo("role")}>
          <option value="USUARIO">Usuário (abre chamados)</option>
          <option value="TECNICO">Técnico (atende chamados)</option>
        </FormField>

        {erro && <p className={styles.erroGeral}>{erro}</p>}

        <Button type="submit" disabled={enviando}>
          {enviando ? "Cadastrando..." : "Cadastrar"}
        </Button>

        <p className={styles.rodape}>
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </form>
    </div>
  );
}
