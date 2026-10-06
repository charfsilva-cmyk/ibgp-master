import { localDay } from "./date";
import { notifyChange, readJSON } from "./cloud";
export type ProgressoQuestao = {
  tentativas: number;
  acertos: number;
  erros: number;
  ultimaResposta: string;
};
export type ProgressoCompleto = Record<number, ProgressoQuestao>;
export function obterProgresso(): ProgressoCompleto {
  return readJSON<ProgressoCompleto>(
    "pcmg-progresso",
    readJSON<ProgressoCompleto>("ibgp-progresso", {}),
  );
}
export function obterProgressoQuestao(id: number) {
  return obterProgresso()[id] ?? null;
}
export function salvarResposta(id: number, acertou: boolean) {
  const progresso = obterProgresso();
  const p = progresso[id] ?? {
    tentativas: 0,
    acertos: 0,
    erros: 0,
    ultimaResposta: "",
  };
  const novo = {
    tentativas: p.tentativas + 1,
    acertos: p.acertos + (acertou ? 1 : 0),
    erros: p.erros + (acertou ? 0 : 1),
    ultimaResposta: new Date().toLocaleString("pt-BR"),
  };
  progresso[id] = novo;
  localStorage.setItem("pcmg-progresso", JSON.stringify(progresso));
  const erros = readJSON<number[]>("pcmg-erros", []);
  localStorage.setItem(
    "pcmg-erros",
    JSON.stringify(
      acertou ? erros.filter((x) => x !== id) : [...new Set([...erros, id])],
    ),
  );
  const events = readJSON<{ id: number; date: string; correct: boolean }[]>(
    "pcmg-events",
    [],
  );
  events.push({
    id,
    date: localDay() + "T" + new Date().toLocaleTimeString("pt-BR"),
    correct: acertou,
  });
  localStorage.setItem("pcmg-events", JSON.stringify(events.slice(-5000)));
  notifyChange();
  return novo;
}
export function limparProgresso() {
  localStorage.removeItem("pcmg-progresso");
  localStorage.removeItem("ibgp-progresso");
  notifyChange();
}
