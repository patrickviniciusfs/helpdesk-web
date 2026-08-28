import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import styles from "./NaoEncontrado.module.css";

export function NaoEncontrado() {
  return (
    <div className={styles.pagina}>
      <span className={styles.codigo}>404</span>
      <h1>Página não encontrada</h1>
      <p>O endereço que você tentou acessar não existe.</p>
      <Link to="/">
        <Button>Voltar ao início</Button>
      </Link>
    </div>
  );
}
