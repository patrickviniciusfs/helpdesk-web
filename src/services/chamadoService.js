import api from "./api";

export async function listarChamados(prioridade) {
  const params = prioridade ? { prioridade } : {};
  const { data } = await api.get("/chamados", { params });
  return data;
}

export async function buscarChamadoPorId(id) {
  const { data } = await api.get(`/chamados/${id}`);
  return data;
}

export async function criarChamado({ titulo, descricao, prioridade }) {
  const { data } = await api.post("/chamados", { titulo, descricao, prioridade });
  return data;
}

export async function atualizarChamado(id, { titulo, descricao, prioridade, status }) {
  const { data } = await api.put(`/chamados/${id}`, { titulo, descricao, prioridade, status });
  return data;
}

export async function assumirChamado(id) {
  const { data } = await api.post(`/chamados/${id}/assumir`);
  return data;
}

export async function deletarChamado(id) {
  await api.delete(`/chamados/${id}`);
}
