import { useParams } from "react-router-dom";

export function DetalheChamado() {
  const { id } = useParams();
  return <h1>Detalhe do Chamado #{id}</h1>;
}
