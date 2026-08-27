import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../Button/Button";
import styles from "./Layout.module.css";

export function Layout() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <div className={styles.pagina}>
      <header className={styles.navbar}>
        <div className={styles.marca}>HelpDesk</div>

        <nav className={styles.links}>
          <Link to="/">Dashboard</Link>
          <Link to="/chamados">Chamados</Link>
          <Link to="/chamados/novo">Abrir chamado</Link>
        </nav>

        <div className={styles.usuario}>
          <span className={styles.nomeUsuario}>
            {usuario?.nome} <span className={styles.role}>({usuario?.role})</span>
          </span>
          <Button variant="secondary" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </header>

      <main className={styles.conteudo}>
        <Outlet />
      </main>
    </div>
  );
}
