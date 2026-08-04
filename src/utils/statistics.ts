import { questions } from "../data/questions";

export function getMateriaStats() {
  const progresso = JSON.parse(
    localStorage.getItem("ibgp-progress") ?? "{}"
  );

  const materias: Record<
    string,
    {
      acertos: number;
      erros: number;
    }
  > = {};

  questions.forEach((q) => {
    if (!materias[q.materia]) {
      materias[q.materia] = {
        acertos: 0,
        erros: 0,
      };
    }

    const p = progresso[q.id];

    if (!p) return;

    materias[q.materia].acertos += p.acertos;
    materias[q.materia].erros += p.erros;
  });

  return materias;
}