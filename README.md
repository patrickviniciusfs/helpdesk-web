# HelpDesk Web

Frontend de um sistema de abertura e acompanhamento de chamados técnicos, com login, dois perfis de acesso (usuário e técnico) e dashboard com indicadores.

Este é o frontend do projeto **HelpDesk - Sistema de Chamados**. A API (Spring Boot) está no repositório [helpdesk-api](https://github.com/patrickviniciusfs/helpdesk-api).

## Sobre o projeto

Um usuário comum se cadastra, abre chamados técnicos e acompanha apenas os próprios em um dashboard pessoal. Um técnico visualiza todos os chamados do sistema, assume atendimentos e atualiza status/prioridade. A comunicação com a API é feita via cookies `HttpOnly` (sem token exposto no `localStorage`), com rotas protegidas no frontend e autorização de verdade garantida pelo backend.

## Tecnologias

- React 18 + Vite
- React Router
- Axios (com `withCredentials` para autenticação via cookie)
- CSS Modules (sem framework de CSS)

## Funcionalidades

- Cadastro e login (usuário comum ou técnico)
- Dashboard com contadores por status e gráfico de barras
- Listagem de chamados com filtro por prioridade
- Abertura de novo chamado
- Detalhe do chamado, com ações condicionadas ao perfil:
  - Técnico: assumir chamado, editar status/prioridade, excluir
  - Usuário: visualização somente leitura dos próprios chamados
- Proteção de rotas privadas e página 404

## Arquitetura de pastas

```
src/
├── pages/       → uma pasta por tela
├── components/  → componentes reutilizáveis (Button, Badge, Alert, Spinner...)
├── services/    → toda comunicação com a API (Axios)
├── context/     → estado global do usuário autenticado
├── hooks/       → hooks customizados (useAuth)
├── routes/      → rotas e proteção de rotas privadas
└── styles/      → tokens de design (cores, tipografia, espaçamento) e reset global
```

## Rodando localmente

### Pré-requisitos

- Node.js 18+
- A [API do backend](https://github.com/patrickviniciusfs/helpdesk-api) rodando em `http://localhost:8080`

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/patrickviniciusfs/helpdesk-web.git
cd helpdesk-web

# 2. Instale as dependências
npm install

# 3. Configure a URL da API
cp .env.example .env

# 4. Rode em modo de desenvolvimento
npm run dev
```

A aplicação sobe em `http://localhost:5173`.

## Variáveis de ambiente

| Variável | Descrição | Padrão (dev) |
|---|---|---|
| `VITE_API_URL` | URL base da API backend | `http://localhost:8080` |

## Deploy

Pensado para deploy na [Vercel](https://vercel.com).

## Roadmap (possíveis evoluções)

- Testes de componente (Vitest + Testing Library)
- Paginação/infinite scroll na lista de chamados
- Modo escuro
- Notificações em tempo real (WebSocket) ao mudar status

## Autor

Desenvolvido como projeto de portfólio para vaga de Desenvolvedor Full Stack Júnior.



