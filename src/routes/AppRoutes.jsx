import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Registro } from "../pages/Registro/Registro";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { ListaChamados } from "../pages/ListaChamados/ListaChamados";
import { NovoChamado } from "../pages/NovoChamado/NovoChamado";
import { DetalheChamado } from "../pages/DetalheChamado/DetalheChamado";
import { RotaPrivada } from "./RotaPrivada";


export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      <Route
        path="/"
        element={
          <RotaPrivada>
            <Dashboard />
          </RotaPrivada>
        }
      />
      <Route
        path="/chamados"
        element={
          <RotaPrivada>
            <ListaChamados />
          </RotaPrivada>
        }
      />
      <Route
        path="/chamados/novo"
        element={
          <RotaPrivada>
            <NovoChamado />
          </RotaPrivada>
        }
      />
      <Route
        path="/chamados/:id"
        element={
          <RotaPrivada>
            <DetalheChamado />
          </RotaPrivada>
        }
      />
    </Routes>
  );
}
