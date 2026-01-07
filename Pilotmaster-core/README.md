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
## 🚀 Sprint 5 — Refinamento e Preparação para Release

**Status:** ✅ Concluída  

### 🎯 Objetivo
Consolidar qualidade, estabilidade e experiência do usuário, preparando o PilotMaster Core para um release interno estável.

### 🔵 Backend
- Refinamento de validações de domínio
- Padronização de responses de erro e sucesso
- Revisão de regras críticas de Schedule e Navios
- Garantia de consistência dos dados do Dashboard

### 🟣 Frontend
- Aplicação consistente do Design System
- Refinamento de formulários (erro, loading, disabled)
- Tratamento de cenários de erro do backend
- Ajustes de UX sem impacto arquitetural

### 🎨 UI / UX
- Ajustes finos de layout e espaçamento
- Revisão visual mobile-first
- Melhorias pontuais de usabilidade

### 🧱 CSS / Design System
- Consolidação das classes de formulários
- Estados visuais padronizados
- Garantia de consistência global

### 🧪 QA
- Testes End-to-End do fluxo completo
- Testes de regressão
- Validação de responsividade

### 🏁 Resultado
Ao final da Sprint 5, o PilotMaster Core atingiu um nível de maturidade que permite uso estável, previsível e seguro, estando pronto para demonstração e evolução futura.
