export const MICROCOPY = {
  loading: {
    globalHistory: "Carregando histórico...",
    shipHistory: "Carregando histórico do navio...",
    scheduleHistory: "Carregando histórico do agendamento...",
  },

  error: {
    generic: {
      title: "Erro ao carregar dados",
      subtitle: "Tente novamente em alguns instantes.",
    },
    invalidShip: {
      title: "Navio não encontrado",
      subtitle: "O ID informado é inválido ou não existe.",
    },
    invalidSchedule: {
      title: "Agendamento não encontrado",
      subtitle: "O ID informado é inválido ou não existe.",
    },
  },

  empty: {
    globalHistory: {
      title: "Nenhum registro encontrado",
      subtitle: "Não há atividades registradas no sistema.",
    },
    shipHistory: {
      title: "Nenhum histórico encontrado",
      subtitle: "Este navio ainda não possui atividades registradas.",
    },
    scheduleHistory: {
      title: "Histórico vazio",
      subtitle: "Nenhuma movimentação para este agendamento.",
    },
  },
};
