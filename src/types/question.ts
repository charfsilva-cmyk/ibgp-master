export type CargoQuestao = "Investigador" | "Escrivão" | "Ambos";
export type OrigemQuestao = "Inédita" | "Oficial" | "Adaptada";
export type NivelCobranca = "Básica" | "Intermediária" | "Padrão FGV" | "FGV avançada";

export interface Question {
  id: number;
  materia: string;
  assunto: string;
  banca: string;
  dificuldade: "Fácil" | "Média" | "Difícil";
  pergunta: string;
  alternativas: string[];
  correta: number;
  explicacao: string;
  cargo?: CargoQuestao;
  ano?: number;
  origem?: OrigemQuestao;
  nivel?: NivelCobranca;
}
