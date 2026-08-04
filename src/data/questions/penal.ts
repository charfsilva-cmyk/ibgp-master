import type { Question } from "../../types/question";

export const penalQuestions: Question[] = [
  {
    id: 501,
    materia: "Direito Penal",
    assunto: "Princípio da legalidade",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Fácil",
    pergunta:
      "De acordo com o Código Penal, não há crime sem lei anterior que o defina, nem pena sem:",
    alternativas: [
      "Decisão administrativa",
      "Prévia cominação legal",
      "Autorização judicial",
      "Regulamento do Poder Executivo",
    ],
    correta: 1,
    explicacao:
      "O artigo 1º do Código Penal estabelece o princípio da legalidade: não há crime sem lei anterior que o defina, nem pena sem prévia cominação legal.",
  },
  {
    id: 502,
    materia: "Direito Penal",
    assunto: "Lei penal no tempo",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Média",
    pergunta:
      "Quando uma lei posterior deixa de considerar determinado fato como crime:",
    alternativas: [
      "A condenação permanece produzindo todos os efeitos penais",
      "Cessam a execução e os efeitos penais da sentença condenatória",
      "A nova lei aplica-se apenas aos fatos futuros",
      "A pena é automaticamente transformada em multa",
    ],
    correta: 1,
    explicacao:
      "A abolitio criminis ocorre quando lei posterior deixa de considerar o fato como crime, fazendo cessar a execução e os efeitos penais da condenação.",
  },
  {
    id: 503,
    materia: "Direito Penal",
    assunto: "Lei penal mais benéfica",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Média",
    pergunta:
      "A lei penal posterior que, de qualquer modo, favorecer o agente:",
    alternativas: [
      "Não retroage",
      "Aplica-se aos fatos anteriores",
      "Aplica-se apenas aos processos sem sentença",
      "Depende de autorização do Ministério Público",
    ],
    correta: 1,
    explicacao:
      "A lei penal mais benéfica retroage, inclusive quando já houver sentença condenatória transitada em julgado.",
  },
  {
    id: 504,
    materia: "Direito Penal",
    assunto: "Tempo do crime",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Média",
    pergunta:
      "Considera-se praticado o crime no momento:",
    alternativas: [
      "Do resultado",
      "Da ação ou omissão",
      "Da descoberta pela autoridade",
      "Da instauração do inquérito",
    ],
    correta: 1,
    explicacao:
      "O Código Penal adota a teoria da atividade: considera-se praticado o crime no momento da ação ou omissão, ainda que o resultado ocorra posteriormente.",
  },
  {
    id: 505,
    materia: "Direito Penal",
    assunto: "Lugar do crime",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Difícil",
    pergunta:
      "Considera-se praticado o crime no lugar em que ocorreu:",
    alternativas: [
      "Somente a ação",
      "Somente o resultado",
      "A ação ou omissão, bem como onde o resultado ocorreu ou deveria ocorrer",
      "A prisão do agente",
    ],
    correta: 2,
    explicacao:
      "Quanto ao lugar do crime, o Código Penal adota a teoria da ubiquidade.",
  },
  {
    id: 506,
    materia: "Direito Penal",
    assunto: "Crime consumado",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Fácil",
    pergunta:
      "O crime é considerado consumado quando:",
    alternativas: [
      "O agente inicia a preparação",
      "Nele se reúnem todos os elementos de sua definição legal",
      "A vítima comunica o fato",
      "O agente é preso",
    ],
    correta: 1,
    explicacao:
      "Crime consumado é aquele em que estão reunidos todos os elementos previstos em sua definição legal.",
  },
  {
    id: 507,
    materia: "Direito Penal",
    assunto: "Tentativa",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Média",
    pergunta:
      "Há tentativa quando o agente inicia a execução, mas o crime não se consuma:",
    alternativas: [
      "Por sua própria vontade em qualquer situação",
      "Por circunstâncias alheias à sua vontade",
      "Porque desconhecia a lei",
      "Porque se arrependeu antes de iniciar a execução",
    ],
    correta: 1,
    explicacao:
      "Na tentativa, a execução é iniciada, mas a consumação não ocorre por circunstâncias alheias à vontade do agente.",
  },
  {
    id: 508,
    materia: "Direito Penal",
    assunto: "Desistência voluntária",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Média",
    pergunta:
      "O agente que, voluntariamente, desiste de prosseguir na execução:",
    alternativas: [
      "Responde sempre pelo crime consumado",
      "Responde somente pelos atos já praticados",
      "Fica sempre isento de responsabilidade",
      "Responde obrigatoriamente por tentativa",
    ],
    correta: 1,
    explicacao:
      "Na desistência voluntária, o agente responde pelos atos que já praticou, mas não pelo crime inicialmente pretendido na forma tentada.",
  },
  {
    id: 509,
    materia: "Direito Penal",
    assunto: "Arrependimento eficaz",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Média",
    pergunta:
      "No arrependimento eficaz, o agente:",
    alternativas: [
      "Impede que o resultado ocorra após esgotar os atos executórios",
      "Não inicia a execução do crime",
      "Desconhece a ilicitude do fato",
      "Repara o dano depois do trânsito em julgado",
    ],
    correta: 0,
    explicacao:
      "No arrependimento eficaz, o agente já praticou os atos executórios, mas atua de forma eficaz para impedir o resultado.",
  },
  {
    id: 510,
    materia: "Direito Penal",
    assunto: "Crime impossível",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Média",
    pergunta:
      "Não se pune a tentativa quando, por absoluta ineficácia do meio ou absoluta impropriedade do objeto:",
    alternativas: [
      "O crime é culposo",
      "É impossível consumar o crime",
      "O agente se arrepende",
      "Existe erro de proibição",
    ],
    correta: 1,
    explicacao:
      "O crime impossível ocorre quando o meio é absolutamente ineficaz ou o objeto é absolutamente impróprio para a consumação.",
  },
  {
    id: 511,
    materia: "Direito Penal",
    assunto: "Dolo",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Fácil",
    pergunta:
      "O crime é doloso quando o agente:",
    alternativas: [
      "Produz o resultado apenas por negligência",
      "Quis o resultado ou assumiu o risco de produzi-lo",
      "Age em legítima defesa",
      "Não possui consciência de sua conduta",
    ],
    correta: 1,
    explicacao:
      "Há dolo quando o agente quer o resultado ou assume o risco de produzi-lo.",
  },
  {
    id: 512,
    materia: "Direito Penal",
    assunto: "Culpa",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Fácil",
    pergunta:
      "O crime é culposo quando o agente dá causa ao resultado por:",
    alternativas: [
      "Vontade direta de produzir o resultado",
      "Imprudência, negligência ou imperícia",
      "Legítima defesa",
      "Coação moral irresistível",
    ],
    correta: 1,
    explicacao:
      "A culpa penal pode decorrer de imprudência, negligência ou imperícia.",
  },
  {
    id: 513,
    materia: "Direito Penal",
    assunto: "Erro sobre elemento do tipo",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Difícil",
    pergunta:
      "O erro sobre elemento constitutivo do tipo legal de crime:",
    alternativas: [
      "Exclui o dolo, mas pode permitir punição por crime culposo",
      "Sempre exclui toda responsabilidade penal",
      "Transforma o crime em contravenção",
      "Não produz qualquer efeito",
    ],
    correta: 0,
    explicacao:
      "O erro de tipo essencial exclui o dolo, mas pode haver responsabilização por culpa quando prevista em lei.",
  },
  {
    id: 514,
    materia: "Direito Penal",
    assunto: "Erro de proibição",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Difícil",
    pergunta:
      "O desconhecimento da lei:",
    alternativas: [
      "É sempre causa de absolvição",
      "É inescusável",
      "Exclui automaticamente o dolo",
      "Transforma o crime doloso em culposo",
    ],
    correta: 1,
    explicacao:
      "O desconhecimento da lei é inescusável. O erro sobre a ilicitude do fato possui disciplina própria.",
  },
  {
    id: 515,
    materia: "Direito Penal",
    assunto: "Coação irresistível",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Média",
    pergunta:
      "Se o fato é cometido sob coação irresistível, em regra, será punível:",
    alternativas: [
      "Somente o coagido",
      "Somente o autor da coação",
      "A vítima",
      "Ninguém, em qualquer situação",
    ],
    correta: 1,
    explicacao:
      "Na coação moral irresistível, pune-se o autor da coação, afastando-se a culpabilidade do coagido.",
  },
  {
    id: 516,
    materia: "Direito Penal",
    assunto: "Exclusão de ilicitude",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Fácil",
    pergunta:
      "Não constitui causa de exclusão da ilicitude:",
    alternativas: [
      "Estado de necessidade",
      "Legítima defesa",
      "Estrito cumprimento de dever legal",
      "Embriaguez voluntária",
    ],
    correta: 3,
    explicacao:
      "Estado de necessidade, legítima defesa, estrito cumprimento do dever legal e exercício regular de direito excluem a ilicitude.",
  },
  {
    id: 517,
    materia: "Direito Penal",
    assunto: "Estado de necessidade",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Média",
    pergunta:
      "Age em estado de necessidade quem pratica o fato para salvar de perigo atual:",
    alternativas: [
      "Direito próprio ou alheio, cujo sacrifício não era razoável exigir",
      "Apenas direito patrimonial próprio",
      "Somente a própria vida",
      "Qualquer interesse, mesmo que tenha provocado voluntariamente o perigo",
    ],
    correta: 0,
    explicacao:
      "O estado de necessidade protege direito próprio ou alheio diante de perigo atual, observados os requisitos legais.",
  },
  {
    id: 518,
    materia: "Direito Penal",
    assunto: "Legítima defesa",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Fácil",
    pergunta:
      "Age em legítima defesa quem, usando moderadamente os meios necessários:",
    alternativas: [
      "Repele injusta agressão atual ou iminente",
      "Vinga uma agressão passada",
      "Reage contra qualquer ato lícito",
      "Provoca uma agressão para depois reagir",
    ],
    correta: 0,
    explicacao:
      "A legítima defesa exige agressão injusta, atual ou iminente, e uso moderado dos meios necessários.",
  },
  {
    id: 519,
    materia: "Direito Penal",
    assunto: "Excesso punível",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Média",
    pergunta:
      "O agente que excede dolosa ou culposamente os limites de uma causa de justificação:",
    alternativas: [
      "Nunca responde pelo excesso",
      "Responde pelo excesso doloso ou culposo",
      "Responde sempre pelo crime inicialmente evitado",
      "Recebe apenas sanção administrativa",
    ],
    correta: 1,
    explicacao:
      "Mesmo diante de uma causa de exclusão de ilicitude, o excesso doloso ou culposo pode ser punido.",
  },
  {
    id: 520,
    materia: "Direito Penal",
    assunto: "Imputabilidade penal",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Fácil",
    pergunta:
      "Os menores de 18 anos são:",
    alternativas: [
      "Penalmente imputáveis",
      "Penalmente inimputáveis",
      "Imputáveis apenas em crimes graves",
      "Imputáveis mediante decisão judicial",
    ],
    correta: 1,
    explicacao:
      "Os menores de 18 anos são penalmente inimputáveis e ficam sujeitos à legislação especial.",
  },
  {
    id: 521,
    materia: "Direito Penal",
    assunto: "Embriaguez",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Média",
    pergunta:
      "A embriaguez voluntária ou culposa provocada por álcool:",
    alternativas: [
      "Exclui sempre a imputabilidade penal",
      "Não exclui a imputabilidade penal",
      "Transforma todo crime em culposo",
      "Impede a aplicação de pena",
    ],
    correta: 1,
    explicacao:
      "A embriaguez voluntária ou culposa não exclui a imputabilidade penal.",
  },
  {
    id: 522,
    materia: "Direito Penal",
    assunto: "Concurso de pessoas",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Média",
    pergunta:
      "Quem, de qualquer modo, concorre para o crime:",
    alternativas: [
      "Responde apenas civilmente",
      "Incide nas penas a este cominadas, na medida de sua culpabilidade",
      "Responde sempre pela mesma pena dos demais",
      "Somente responde se executar pessoalmente o núcleo do tipo",
    ],
    correta: 1,
    explicacao:
      "No concurso de pessoas, cada participante responde na medida de sua culpabilidade.",
  },
  {
    id: 523,
    materia: "Direito Penal",
    assunto: "Homicídio",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Fácil",
    pergunta:
      "O crime de homicídio consiste em:",
    alternativas: [
      "Ofender a integridade corporal de alguém",
      "Matar alguém",
      "Subtrair coisa alheia móvel",
      "Constranger alguém mediante ameaça",
    ],
    correta: 1,
    explicacao:
      "O núcleo do tipo básico de homicídio é matar alguém.",
  },
  {
    id: 524,
    materia: "Direito Penal",
    assunto: "Lesão corporal",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Fácil",
    pergunta:
      "O crime de lesão corporal consiste em ofender:",
    alternativas: [
      "Somente o patrimônio de alguém",
      "A integridade corporal ou a saúde de alguém",
      "Apenas a honra objetiva",
      "Exclusivamente a liberdade de locomoção",
    ],
    correta: 1,
    explicacao:
      "A lesão corporal tutela a integridade física e a saúde da pessoa.",
  },
  {
    id: 525,
    materia: "Direito Penal",
    assunto: "Furto",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Fácil",
    pergunta:
      "O furto caracteriza-se pela subtração de coisa alheia móvel:",
    alternativas: [
      "Mediante violência ou grave ameaça",
      "Sem emprego de violência ou grave ameaça",
      "Somente mediante fraude bancária",
      "Com destruição obrigatória do objeto",
    ],
    correta: 1,
    explicacao:
      "No furto, há subtração de coisa alheia móvel sem violência ou grave ameaça contra a pessoa.",
  },
  {
    id: 526,
    materia: "Direito Penal",
    assunto: "Roubo",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Fácil",
    pergunta:
      "A diferença básica entre roubo e furto é que o roubo envolve:",
    alternativas: [
      "Somente coisa imóvel",
      "Violência ou grave ameaça à pessoa",
      "Apenas objeto de elevado valor",
      "Exclusivamente concurso de pessoas",
    ],
    correta: 1,
    explicacao:
      "O roubo envolve violência ou grave ameaça, diferentemente do furto.",
  },
  {
    id: 527,
    materia: "Direito Penal",
    assunto: "Peculato",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Média",
    pergunta:
      "Comete peculato o funcionário público que se apropria de dinheiro, valor ou bem móvel de que tem posse:",
    alternativas: [
      "Em razão do cargo",
      "Exclusivamente por relação familiar",
      "Somente após deixar o cargo",
      "Sem qualquer relação com a função pública",
    ],
    correta: 0,
    explicacao:
      "No peculato-apropriação, o funcionário público apropria-se de bem de que possui a posse em razão do cargo.",
  },
  {
    id: 528,
    materia: "Direito Penal",
    assunto: "Concussão",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Média",
    pergunta:
      "No crime de concussão, o funcionário público:",
    alternativas: [
      "Solicita vantagem indevida",
      "Exige vantagem indevida",
      "Oferece vantagem a outro servidor",
      "Subtrai bem sem relação com o cargo",
    ],
    correta: 1,
    explicacao:
      "A concussão caracteriza-se pela exigência de vantagem indevida em razão da função.",
  },
  {
    id: 529,
    materia: "Direito Penal",
    assunto: "Corrupção passiva",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Média",
    pergunta:
      "A corrupção passiva pode ocorrer quando o funcionário público:",
    alternativas: [
      "Solicita ou recebe vantagem indevida em razão da função",
      "Exige vantagem mediante violência",
      "Oferece vantagem indevida a outro funcionário",
      "Apenas aceita presente sem relação com a função",
    ],
    correta: 0,
    explicacao:
      "A corrupção passiva envolve solicitar, receber ou aceitar promessa de vantagem indevida em razão da função.",
  },
  {
    id: 530,
    materia: "Direito Penal",
    assunto: "Abuso de Autoridade",
    banca: "Adaptada ao estilo IBGP",
    dificuldade: "Média",
    pergunta:
      "A divergência na interpretação da lei ou na avaliação de fatos e provas:",
    alternativas: [
      "Sempre configura abuso de autoridade",
      "Não configura abuso de autoridade por si só",
      "Gera automaticamente perda do cargo",
      "É crime quando praticada por qualquer servidor",
    ],
    correta: 1,
    explicacao:
      "A divergência de interpretação da lei ou de avaliação de fatos e provas, por si só, não configura abuso de autoridade.",
  },
];