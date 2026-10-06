import { constitucionalQuestions } from "./constitucional";
import { direitosHumanosQuestions } from "./direitosHumanos";
import { informaticaQuestions } from "./informatica";
import { leiTorturaQuestions } from "./leiTortura";
import { penalQuestions } from "./penal";
import { portuguesQuestions } from "./portugues";
import { administrativoQuestions } from "./administrativo";
import { mariaPenhaQuestions } from "./mariaPenha";
import { ecaQuestions } from "./eca";
import { pcmgEspecificasQuestions } from "./pcmgEspecificas";
import { fgvTreinoQuestions } from "./fgvTreino";

/*
 * Banco ativo do PCMG Master.
 * Mantemos apenas disciplinas aproveitáveis na preparação policial.
 * Conteúdos municipais/GCM/Brumadinho e CTB permanecem no repositório
 * histórico, mas não entram mais no banco exibido nem nos simulados PCMG.
 *
 * As questões herdadas são autorais/adaptadas e NÃO devem ser apresentadas
 * como questões oficiais da PCMG. A identificação visual é ajustada abaixo.
 */
const pcmgBase = [
  ...constitucionalQuestions,
  ...direitosHumanosQuestions,
  ...informaticaQuestions,
  ...leiTorturaQuestions,
  ...penalQuestions,
  ...portuguesQuestions,
  ...administrativoQuestions,
  ...mariaPenhaQuestions,
  ...ecaQuestions,
  ...pcmgEspecificasQuestions,
  ...fgvTreinoQuestions,
];

export const questions = pcmgBase.map((question) => ({
  ...question,
  materia:
    question.materia === "Português" ? "Língua Portuguesa" : question.materia,
  cargo: question.cargo ?? "Ambos",
  origem: question.origem ?? "Inédita",
  nivel:
    question.nivel ??
    (question.dificuldade === "Fácil" ? "Básica" : "Intermediária"),
  banca:
    question.banca.toLowerCase().includes("ibgp") ||
    question.banca.toLowerCase().includes("adapt")
      ? "Inédita • estilo PCMG"
      : question.banca,
}));
