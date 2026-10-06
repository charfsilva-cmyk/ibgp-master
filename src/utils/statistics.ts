import { questions } from "../data/questions";
import { obterProgresso } from "./progress";
export function getMateriaStats() {
  const progresso = obterProgresso();
  const materias: Record<string, { acertos: number; erros: number }> = {};
  questions.forEach((q) => {
    if (!materias[q.materia]) materias[q.materia] = { acertos: 0, erros: 0 };
    const p = progresso[q.id];
    if (p) {
      materias[q.materia].acertos += p.acertos;
      materias[q.materia].erros += p.erros;
    }
  });
  return Object.fromEntries(
    Object.entries(materias).filter(([, d]) => d.acertos + d.erros > 0),
  );
}
