⚓ PilotMaster Core

Sistema de gestão portuária desenvolvido para simular operações reais de controle de navios, agendamentos de manobras e histórico operacional.

O projeto foi criado com foco em arquitetura limpa, integração frontend/backend e experiência de produto, simulando um sistema corporativo utilizado em ambientes portuários.

📊 Visão Geral

O PilotMaster Core permite gerenciar e visualizar informações relacionadas à operação portuária, incluindo:

Cadastro de navios

Agendamento de manobras

Histórico operacional completo

Relatórios por período

Cálculo de tarifas portuárias

Dashboard com métricas operacionais

O sistema foi desenvolvido com arquitetura moderna separando responsabilidades entre backend e frontend.

🏗️ Arquitetura do Projeto

O projeto é dividido em duas aplicações principais:

PilotMaster-Core
│
├── pilotmaster-backend   (ASP.NET Core API)
│
└── pilotmaster-frontend  (React + Vite)
🔧 Backend

Tecnologias utilizadas:

ASP.NET Core Web API

Entity Framework Core

SQLite

JWT Authentication

Swagger / OpenAPI

Middleware de tratamento de exceções

Estrutura simplificada
PilotMaster.Api
PilotMaster.Application
PilotMaster.Domain
PilotMaster.Infrastructure

Separação baseada em princípios de Clean Architecture.

Principais responsabilidades

Gerenciamento de navios

Agendamentos

Histórico de eventos

Cálculo de tarifas

Autenticação JWT

Padronização de erros da API

Endpoint de saúde do sistema

🎨 Frontend

Tecnologias utilizadas:

React

Vite

React Router

Axios

CSS modular

Estrutura principal
src
│
├── api
├── components
├── pages
├── services
├── styles
└── assets
Componentes importantes

Sidebar de navegação

Layout responsivo

Cards reutilizáveis

Timeline de histórico

Estados de interface (loading / empty / error)

📈 Funcionalidades
Dashboard

Exibe métricas importantes da operação:

Total de navios cadastrados

Agendamentos pendentes

Últimos eventos operacionais

Navios

Permite visualizar navios registrados e acessar o histórico de operações.

Cada navio possui:

Nome

Status operacional

Histórico de eventos

Agendamentos

Permite registrar e gerenciar manobras portuárias.

Informações:

Data

Área portuária

Navio associado

Status

Histórico Operacional

O sistema registra eventos importantes como:

criação de agendamento

cancelamentos

atualizações

Visualizações disponíveis:

histórico global

histórico por navio

histórico por agendamento

Relatórios

Relatório de agendamentos por período com filtros de data.

Cálculo de Tarifas

Simulação de cálculo de tarifa portuária baseada em:

GRT do navio

calado

idade

rebocador

deficiência operacional

🔐 Autenticação

O sistema utiliza JWT (JSON Web Token).

Fluxo:

Login

Geração de token

Uso do token nas rotas protegidas

📡 API

Principais endpoints:

POST /api/Auth/login
POST /api/Auth/refresh

GET /api/Dashboard

GET /api/Ships
GET /api/Ships/{id}
POST /api/Ships
PUT /api/Ships/{id}
DELETE /api/Ships/{id}

GET /api/Schedule
POST /api/Schedule
PUT /api/Schedule/{id}/cancel

GET /api/Tariff/calculate

GET /api/history
GET /api/ships/{id}/history

GET /api/system/health
🚀 Como executar o projeto
Backend
cd pilotmaster-backend
dotnet restore
dotnet ef database update
dotnet run

API disponível em:

https://localhost:7041

Swagger:

https://localhost:7041/swagger
Frontend
cd pilotmaster-frontend
npm install
npm run dev

Aplicação disponível em:

http://localhost:5173
🧪 Testes realizados

Testes via Swagger

Validação de autenticação JWT

Testes de integração frontend/backend

Tratamento de erros padronizado

Verificação de estados de interface

📦 Estado do Projeto
PilotMaster v1.0
Status: Finalizado para portfólio

O projeto foi finalizado como produto de demonstração técnica, representando um sistema corporativo funcional.

👨‍💻 Autor

Davi Santana Cairo

Desenvolvedor em transição de carreira para tecnologia.

Principais interesses:

Backend com .NET

Desenvolvimento web

Integração de sistemas

Arquitetura de software

📄 Licença

Projeto desenvolvido para fins educacionais e portfólio.

🚀 Próximas evoluções possíveis

testes automatizados

dockerização

deploy em cloud

RBAC (controle de permissões)

🧭 Objetivo do Projeto

Demonstrar capacidade de:

construir um sistema full-stack

estruturar uma API moderna

integrar frontend e backend

entregar um produto funcional com UX consistente