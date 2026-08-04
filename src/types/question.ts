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
}