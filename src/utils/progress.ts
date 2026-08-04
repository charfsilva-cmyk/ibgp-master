export type ProgressoQuestao = {
  tentativas: number;
  acertos: number;
  erros: number;
  ultimaResposta: string;
};

export type ProgressoCompleto = Record<number, ProgressoQuestao>;

const CHAVE_STORAGE = "ibgp-progresso";

export function obterProgresso(): ProgressoCompleto {
  const dadosSalvos = localStorage.getItem(CHAVE_STORAGE);

  if (!dadosSalvos) {
    return {};
  }

  try {
    return JSON.parse(dadosSalvos) as ProgressoCompleto;
  } catch {
    return {};
  }
}

export function obterProgressoQuestao(
  idQuestao: number,
): ProgressoQuestao | null {
  const progresso = obterProgresso();

  return progresso[idQuestao] ?? null;
}

export function salvarResposta(
  idQuestao: number,
  acertou: boolean,
): ProgressoQuestao {
  const progresso = obterProgresso();

  const progressoAtual: ProgressoQuestao = progresso[idQuestao] ?? {
    tentativas: 0,
    acertos: 0,
    erros: 0,
    ultimaResposta: "",
  };

  const novoProgresso: ProgressoQuestao = {
    tentativas: progressoAtual.tentativas + 1,
    acertos: progressoAtual.acertos + (acertou ? 1 : 0),
    erros: progressoAtual.erros + (acertou ? 0 : 1),
    ultimaResposta: new Date().toLocaleString("pt-BR"),
  };

  progresso[idQuestao] = novoProgresso;

  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(progresso));

  return novoProgresso;
}

export function limparProgresso(): void {
  localStorage.removeItem(CHAVE_STORAGE);
}