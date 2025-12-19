## 🚀 Sprint 4 — Operação Real do Sistema

## 🧱 Fase Inicial do Projeto

As primeiras iterações do projeto foram focadas em:
- Estruturação do backend (auth, tarifas, agendamentos)
- Integração inicial frontend + backend
- Definição de UI/UX e Design System
- Provas de conceito e testes manuais

A partir da Sprint 4, o projeto passa a ser documentado formalmente por sprint.


**Status:** ✅ Concluída  
**Período:** Sprint 4  


### 🎯 Objetivo
Transformar o PilotMaster em um sistema operacional real, permitindo cadastro de navios, agendamento de manobras e visualização de dados consolidados no dashboard.

### 🔵 Backend
- CRUD completo de Navios (Ships)
- Validações de domínio (GRT, calado, idade, status)
- Schedule vinculado obrigatoriamente a Navios (ShipId)
- Dashboard com dados reais do banco
- Endpoints estáveis e documentados no Swagger
- Autenticação JWT e CORS operacionais

### 🟣 Frontend
- Home.jsx com layout oficial (UI-02)
- Lista real de Navios integrada ao backend
- Formulário de criação e edição de Navios
- Integração Navio → Schedule
- Estados visuais de loading, erro e vazio

### 🎨 UI / UX
- Telas finais de Lista de Navios
- Tela Criar / Editar Navio
- Design System aplicado de forma consistente

### 🧱 CSS / Design System
- Classes utilitárias de layout (grid, flex, spacing)
- Cards padronizados
- Sistema visual de formulários (.ds-input, .ds-error, etc.)
- Estados visuais: loading, error e disabled

### 🏁 Resultado
Ao final da Sprint 4, o PilotMaster deixou de ser apenas um sistema técnico funcional e passou a operar como um produto utilizável, permitindo fluxo completo de uso pelo usuário.
