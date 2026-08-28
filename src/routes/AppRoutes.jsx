import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Registro } from "../pages/Registro/Registro";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { ListaChamados } from "../pages/ListaChamados/ListaChamados";
import { NovoChamado } from "../pages/NovoChamado/NovoChamado";
import { DetalheChamado } from "../pages/DetalheChamado/DetalheChamado";
import { RotaPrivada } from "./RotaPrivada";
import { Layout } from "../components/Layout/Layout";
import { NaoEncontrado } from "../pages/NaoEncontrado/NaoEncontrado";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      <Route
        element={
          <RotaPrivada>
            <Layout />
          </RotaPrivada>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/chamados" element={<ListaChamados />} />
        <Route path="/chamados/novo" element={<NovoChamado />} />
        <Route path="/chamados/:id" element={<DetalheChamado />} />
      </Route>
      <Route path="*" element={<NaoEncontrado />} />
    </Routes>
  );
}
