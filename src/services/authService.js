import api from "./api";

export async function registrar({ nome, email, senha, role }) {
  const { data } = await api.post("/auth/registrar", { nome, email, senha, role });
  return data;
}

export async function login({ email, senha }) {
  const { data } = await api.post("/auth/login", { email, senha });
  return data;
}

export async function logout() {
  await api.post("/auth/logout");
}

export async function buscarUsuarioLogado() {
  const { data } = await api.get("/auth/me");
  return data;
}
