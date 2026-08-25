import { createContext, useState, useEffect, useCallback } from "react";
import * as authService from "../services/authService";


export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
 
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    authService
      .buscarUsuarioLogado()
      .then(setUsuario)
      .catch(() => setUsuario(null))
      .finally(() => setCarregando(false));
  }, []);

  const login = useCallback(async (credenciais) => {
    const usuarioLogado = await authService.login(credenciais);
    setUsuario(usuarioLogado);
    return usuarioLogado;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUsuario(null);
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, carregando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
