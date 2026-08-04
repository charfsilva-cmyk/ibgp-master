export type Question = {
  id: number;
  subject: string;
  statement: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export const questions: Question[] = [
  {
    id: 1,
    subject: "CTB",
    statement:
      "O órgão máximo normativo e consultivo do Sistema Nacional de Trânsito é:",
    options: ["DETRAN", "CONTRAN", "SENATRAN", "CETRAN"],
    correctAnswer: 1,
    explanation:
      "O CONTRAN é o órgão máximo normativo e consultivo do Sistema Nacional de Trânsito.",
  },
  {
    id: 2,
    subject: "CTB",
    statement:
      "O órgão máximo executivo de trânsito da União é:",
    options: ["CONTRAN", "CETRAN", "SENATRAN", "JARI"],
    correctAnswer: 2,
    explanation:
      "A SENATRAN é o órgão máximo executivo de trânsito da União.",
  },
  {
    id: 3,
    subject: "Direitos Humanos",
    statement:
      "Os direitos de segunda dimensão estão relacionados principalmente à:",
    options: [
      "Liberdade individual",
      "Igualdade material e direitos sociais",
      "Solidariedade entre os povos",
      "Proteção exclusiva da propriedade",
    ],
    correctAnswer: 1,
    explanation:
      "A segunda dimensão corresponde aos direitos sociais, econômicos e culturais, ligados à igualdade material.",
  },
  {
    id: 4,
    subject: "Lei de Tortura",
    statement:
      "A tortura praticada para obter informação, declaração ou confissão é conhecida como:",
    options: [
      "Tortura-castigo",
      "Tortura discriminatória",
      "Tortura-prova",
      "Tortura culposa",
    ],
    correctAnswer: 2,
    explanation:
      "A tortura-prova tem como finalidade obter informação, declaração ou confissão.",
  },
  {
    id: 5,
    subject: "Abuso de Autoridade",
    statement:
      "A divergência na interpretação da lei ou na avaliação de fatos e provas:",
    options: [
      "Sempre configura abuso de autoridade",
      "Não configura abuso de autoridade por si só",
      "É crime quando praticada por servidor público",
      "Gera automaticamente perda do cargo",
    ],
    correctAnswer: 1,
    explanation:
      "A divergência de interpretação, por si só, não caracteriza abuso de autoridade.",
  },
];