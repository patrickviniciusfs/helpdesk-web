import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FormField } from "../../components/FormField/FormField";
import { Button } from "../../components/Button/Button";
import styles from "./Login.module.css";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setErro(null);
    setEnviando(true);

    try {
      await login({ email, senha });
      navigate("/");
    } catch (err) {
      
      const mensagem = err.response?.data?.mensagens?.[0] || "Não foi possível fazer login.";
      setErro(mensagem);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className={styles.pagina}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h1 className={styles.titulo}>HelpDesk</h1>
        <p className={styles.subtitulo}>Entre para acompanhar seus chamados</p>

        <FormField
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormField
          label="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        {erro && <p className={styles.erroGeral}>{erro}</p>}

        <Button type="submit" disabled={enviando}>
          {enviando ? "Entrando..." : "Entrar"}
        </Button>

        <p className={styles.rodape}>
          Não tem conta? <Link to="/registro">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
}
