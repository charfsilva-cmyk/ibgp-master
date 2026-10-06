import { useEffect, useMemo, useState } from "react";
import { questions } from "../data/questions";

import QuestionCard from "../components/QuestionCard";
import { notifyChange, readJSON } from "../utils/cloud";

type Cargo = "Investigador" | "Escrivão";
type Materia = {
  nome: string;
  icon: string;
  foco: string;
  topicos: string[];
  resumo: string;
  lei: string;
};

const base: Materia[] = [
  {
    nome: "Língua Portuguesa",
    icon: "LP",
    foco: "Interpretação, gramática e redação oficial",
    topicos: [
      "Compreensão e interpretação",
      "Coesão e coerência",
      "Semântica e figuras de linguagem",
      "Pontuação",
      "Sintaxe, concordância e regência",
      "Redação oficial",
    ],
    resumo:
      "Priorize interpretação e os efeitos de sentido. Em gramática, estude a regra aplicada ao texto, não apenas definições isoladas.",
    lei: "Manual de Redação Oficial e regras do padrão formal.",
  },
  {
    nome: "Raciocínio Lógico-Matemático",
    icon: "RL",
    foco: "Lógica e resolução de problemas",
    topicos: [
      "Proposições",
      "Conectivos e equivalências",
      "Conjuntos",
      "Porcentagem",
      "Problemas lógico-matemáticos",
    ],
    resumo:
      "Treine por questões: identifique a estrutura lógica antes de calcular.",
    lei: "Sem lei seca específica.",
  },
  {
    nome: "Informática",
    icon: "IN",
    foco: "Tecnologia, internet e segurança",
    topicos: [
      "Sistemas e arquivos",
      "Internet e navegadores",
      "Segurança da informação",
      "Ferramentas de produtividade",
    ],
    resumo:
      "Associe conceitos a situações práticas e atenção à terminologia usada pela banca.",
    lei: "Sem lei seca específica.",
  },
  {
    nome: "Direito Constitucional",
    icon: "DC",
    foco: "Constituição e segurança pública",
    topicos: [
      "Direitos e garantias fundamentais",
      "Administração Pública",
      "Segurança Pública",
      "Organização do Estado",
    ],
    resumo:
      "Leia a Constituição junto com questões. Marque competências, direitos e exceções.",
    lei: "Constituição Federal: especialmente arts. 5º, 37 e 144.",
  },
  {
    nome: "Direito Administrativo",
    icon: "DA",
    foco: "Administração pública e agentes",
    topicos: [
      "Princípios",
      "Atos administrativos",
      "Poderes administrativos",
      "Agentes públicos",
      "Responsabilidade do Estado",
    ],
    resumo:
      "Compare conceitos semelhantes e memorize requisitos, atributos e exceções.",
    lei: "Constituição e legislação administrativa indicada no edital.",
  },
  {
    nome: "Direito Penal",
    icon: "DP",
    foco: "Teoria do crime e crimes em espécie",
    topicos: [
      "Aplicação da lei penal",
      "Teoria do crime",
      "Ilicitude e culpabilidade",
      "Concurso de pessoas",
      "Crimes contra a pessoa",
      "Crimes contra o patrimônio",
      "Crimes contra a Administração",
    ],
    resumo:
      "Monte quadros comparativos de elementos do crime, consumação, tentativa e causas de aumento.",
    lei: "Código Penal e legislação penal especial prevista no edital.",
  },
  {
    nome: "Direito Processual Penal",
    icon: "PP",
    foco: "Investigação e persecução penal",
    topicos: [
      "Inquérito policial",
      "Ação penal",
      "Provas",
      "Prisão e liberdade",
      "Procedimentos",
    ],
    resumo:
      "Dê atenção especial ao inquérito policial: características, diligências, prazos e valor probatório.",
    lei: "Código de Processo Penal.",
  },
  {
    nome: "Legislação PCMG",
    icon: "PC",
    foco: "Organização e carreira policial civil",
    topicos: [
      "Organização institucional",
      "Carreiras policiais",
      "Deveres e atribuições",
      "Normas específicas da PCMG",
    ],
    resumo:
      "Faça leitura literal e revisões curtas. Questões de legislação costumam explorar detalhes do texto normativo.",
    lei: "Lei Orgânica e normas da Polícia Civil de Minas Gerais indicadas no edital.",
  },
  {
    nome: "Direitos Humanos",
    icon: "DH",
    foco: "Direitos, garantias e proteção",
    topicos: [
      "Teoria geral",
      "Sistema internacional",
      "Direitos fundamentais",
      "Proteção contra abusos",
    ],
    resumo:
      "Relacione os princípios de direitos humanos com a atuação estatal e policial.",
    lei: "Constituição e tratados previstos no programa.",
  },
  {
    nome: "Criminologia",
    icon: "CR",
    foco: "Crime, vítima e controle social",
    topicos: [
      "Conceito e objeto",
      "Escolas criminológicas",
      "Teorias criminológicas",
      "Vitimologia",
      "Controle social",
    ],
    resumo:
      "Crie uma linha do tempo das escolas e associe cada teoria aos seus conceitos centrais.",
    lei: "Disciplina predominantemente teórica.",
  },
  {
    nome: "Medicina Legal",
    icon: "ML",
    foco: "Perícia e fenômenos médico-legais",
    topicos: [
      "Traumatologia",
      "Tanatologia",
      "Identificação",
      "Sexologia forense",
      "Perícias",
    ],
    resumo:
      "Use mapas visuais para diferenciar lesões, fenômenos cadavéricos e métodos de identificação.",
    lei: "Estude em conjunto com as normas periciais previstas no edital.",
  },
];

base.push(
  {
    nome: "Lei Maria da Penha",
    icon: "MP",
    foco: "Legislação de proteção e violência doméstica",
    topicos: [
      "Âmbito de aplicação",
      "Formas de violência",
      "Medidas protetivas",
      "Atuação policial",
    ],
    resumo:
      "Use as questões comentadas para localizar os dispositivos que precisam de releitura no texto vigente.",
    lei: "Lei nº 11.340/2006. Confira o conteúdo e a versão exigidos pelo edital.",
  },
  {
    nome: "Lei de Tortura",
    icon: "LT",
    foco: "Legislação penal especial",
    topicos: [
      "Condutas previstas",
      "Sujeitos do crime",
      "Causas de aumento",
      "Efeitos da condenação",
    ],
    resumo:
      "Compare as alternativas do banco com a redação atual da lei e registre as diferenças em suas anotações.",
    lei: "Lei nº 9.455/1997. Consulte a fonte oficial e confira o programa do edital.",
  },
  {
    nome: "ECA",
    icon: "EC",
    foco: "Estatuto da Criança e do Adolescente",
    topicos: [
      "Direitos e garantias",
      "Medidas de proteção",
      "Ato infracional",
      "Procedimentos e atribuições",
    ],
    resumo:
      "Organize conceitos por tópico e confira os comentários das questões antes de refazer seus erros.",
    lei: "Lei nº 8.069/1990. Confira os artigos previstos no edital.",
  },
);
const escrivaoExtras: Materia[] = [
  {
    nome: "Arquivologia e Rotinas Cartorárias",
    icon: "AR",
    foco: "Organização documental e rotina do escrivão",
    topicos: [
      "Documentos e arquivos",
      "Classificação",
      "Gestão documental",
      "Rotinas cartorárias",
    ],
    resumo:
      "Foque em organização, classificação e fluxo documental aplicado à atividade policial.",
    lei: "Conteúdo deve ser ajustado ao próximo edital de Escrivão.",
  },
];

export default function Estudar() {
  const [cargo, setCargo] = useState<Cargo>(
    (localStorage.getItem("pcmg-cargo") as Cargo) || "Investigador",
  );
  const [materia, setMateria] = useState<Materia | null>(null);
  const [aba, setAba] = useState("Roteiro");
  const [busca, setBusca] = useState("");
  const [study, setStudy] = useState<Record<string, string>>(
    readJSON("pcmg-study", {}),
  );
  const [notes, setNotes] = useState<Record<string, string>>(
    readJSON("pcmg-notes", {}),
  );
  const [card, setCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(
      () =>
        setSeconds((n) => {
          if (n <= 1) {
            setRunning(false);
            return 0;
          }
          return n - 1;
        }),
      1000,
    );
    return () => clearInterval(id);
  }, [running]);
  const materias = useMemo(
    () => (cargo === "Investigador" ? base : [...base, ...escrivaoExtras]),
    [cargo],
  );
  const qs = materia
    ? questions.filter(
        (q) =>
          q.materia === materia.nome &&
          (!q.cargo || q.cargo === "Ambos" || q.cargo === cargo),
      )
    : [];
  function escolherCargo(c: Cargo) {
    setCargo(c);
    localStorage.setItem("pcmg-cargo", c);
    notifyChange();
  }
  function marcar(topic: string) {
    const key = cargo + "|" + materia!.nome + "|" + topic;
    const next = { ...study };
    if (next[key]) delete next[key];
    else next[key] = new Date().toISOString();
    setStudy(next);
    localStorage.setItem("pcmg-study", JSON.stringify(next));
    notifyChange();
  }
  function anotar(value: string) {
    const next = { ...notes, [cargo + "|" + materia!.nome]: value };
    setNotes(next);
    localStorage.setItem("pcmg-notes", JSON.stringify(next));
    notifyChange();
  }
  function percentual(m: Materia) {
    return Math.round(
      (m.topicos.filter((t) => study[cargo + "|" + m.nome + "|" + t]).length /
        m.topicos.length) *
        100,
    );
  }
  const erroIds = readJSON<number[]>("pcmg-erros", []);
  const priority = questions.find((q) => erroIds.includes(q.id))?.materia;
  const abrir = (m: Materia) => {
    setMateria(m);
    setAba("Roteiro");
    setCard(0);
    setQuestionIndex(0);
    setFlipped(false);
  };
  if (materia)
    return (
      <div className="estudo-page">
        <button className="voltar-estudo" onClick={() => setMateria(null)}>
          ← Voltar às matérias
        </button>
        <section className="materia-detalhe">
          <div className="detalhe-top">
            <span className="materia-icon">{materia.icon}</span>
            <div>
              <span className="pcmg-kicker">
                {cargo.toUpperCase()} • ESTUDO ATIVO
              </span>
              <h2>{materia.nome}</h2>
              <p>{materia.foco}</p>
            </div>
          </div>
          <div className="study-tabs">
            {[
              "Roteiro",
              "Resumo",
              "Mapa mental",
              "Lei seca",
              "Questões",
              "Flashcards",
              "Anotações",
            ].map((x) => (
              <button
                className={aba === x ? "active" : ""}
                onClick={() => setAba(x)}
                key={x}
              >
                {x}
              </button>
            ))}
          </div>
          <div className="study-content">
            {aba === "Roteiro" && (
              <>
                <div className="panel-heading">
                  <div>
                    <h3>Seu roteiro de estudo</h3>
                    <p>
                      Marque os tópicos estudados. O andamento acompanha seu
                      cargo.
                    </p>
                  </div>
                  <strong>{percentual(materia)}%</strong>
                </div>
                <div className="progress-track">
                  <i style={{ width: percentual(materia) + "%" }} />
                </div>
                {materia.topicos.map((t, i) => (
                  <label className="topic-check" key={t}>
                    <input
                      type="checkbox"
                      checked={!!study[cargo + "|" + materia.nome + "|" + t]}
                      onChange={() => marcar(t)}
                    />
                    <b>{String(i + 1).padStart(2, "0")}</b>
                    <span>{t}</span>
                    <small>
                      {study[cargo + "|" + materia.nome + "|" + t]
                        ? "Estudado"
                        : "A estudar"}
                    </small>
                  </label>
                ))}
                <div className="dica-prova">
                  Use o roteiro junto do edital e de seu material de teoria.
                  Marcar um tópico indica estudo concluído, não domínio
                  comprovado.
                </div>
              </>
            )}
            {aba === "Resumo" && (
              <>
                <h3>Direção de estudo</h3>
                <p>{materia.resumo}</p>
                <h4>Conceitos do banco de treino</h4>
                {qs.slice(0, 5).map((q) => (
                  <article className="concept-note" key={q.id}>
                    <strong>{q.assunto}</strong>
                    <p>{q.explicacao}</p>
                  </article>
                ))}
                {qs.length === 0 && (
                  <p>
                    Sem questões comentadas neste cargo. Use seu material e
                    registre uma síntese em Anotações.
                  </p>
                )}
                <small>
                  Comentários extraídos das questões autorais e adaptadas da
                  plataforma; este roteiro não substitui uma aula completa.
                </small>
              </>
            )}
            {aba === "Mapa mental" && (
              <>
                <h3>Mapa de estudo • {materia.nome}</h3>
                <p>
                  Um mapa navegável para conectar o roteiro aos conceitos
                  praticados.
                </p>
                <div className="concept-map">
                  <strong>{materia.nome}</strong>
                  <div>
                    {materia.topicos.map((t) => (
                      <article key={t}>
                        <b>{t}</b>
                        <span>
                          {study[cargo + "|" + materia.nome + "|" + t]
                            ? "✓ Tópico estudado"
                            : "○ Tópico a estudar"}
                        </span>
                      </article>
                    ))}
                  </div>
                </div>
                <h4>Conexões para revisar</h4>
                {[...new Set(qs.map((q) => q.assunto))].slice(0, 8).map((t) => (
                  <button
                    className="map-link"
                    key={t}
                    onClick={() => {
                      setQuestionIndex(qs.findIndex((q) => q.assunto === t));
                      setAba("Questões");
                    }}
                  >
                    {t} → praticar
                  </button>
                ))}
              </>
            )}
            {aba === "Lei seca" && (
              <>
                <h3>Leitura orientada</h3>
                <p>{materia.lei}</p>
                <div className="source-links">
                  <a
                    href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Constituição Federal ↗
                  </a>
                  <a
                    href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Código Penal ↗
                  </a>
                  <a
                    href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Código de Processo Penal ↗
                  </a>
                  <a
                    href="https://conhecimento.fgv.br/concursos/pcmg24/04"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Documentos do concurso • FGV ↗
                  </a>
                </div>
                <div className="dica-prova">
                  Consulte o texto vigente na fonte oficial e confira o programa
                  do seu edital. Destaque prazos, competências, requisitos e
                  exceções.
                </div>
              </>
            )}
            {aba === "Questões" && (
              <>
                <div className="panel-heading">
                  <div>
                    <h3>Prática de {materia.nome}</h3>
                    <p>
                      {qs.length} questões disponíveis para {cargo}.
                    </p>
                  </div>
                  {qs.length > 0 && (
                    <span>
                      {questionIndex + 1}/{qs.length}
                    </span>
                  )}
                </div>
                {qs.length > 0 ? (
                  <>
                    <QuestionCard
                      key={qs[questionIndex].id}
                      question={qs[questionIndex]}
                    />
                    <div className="quiz-actions">
                      <button
                        disabled={questionIndex === 0}
                        onClick={() => setQuestionIndex((i) => i - 1)}
                      >
                        Anterior
                      </button>
                      <button
                        disabled={questionIndex === qs.length - 1}
                        onClick={() => setQuestionIndex((i) => i + 1)}
                      >
                        Próxima →
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="empty-pcmg">
                    Ainda não há questões para este cargo e matéria.
                  </div>
                )}
              </>
            )}
            {aba === "Flashcards" && (
              <>
                <h3>Revisão por recuperação ativa</h3>
                <p>
                  Tente lembrar a resposta antes de virar. Os cartões usam
                  questões comentadas do banco.
                </p>
                {qs.length ? (
                  <>
                    <button
                      className="flashcard"
                      onClick={() => setFlipped(!flipped)}
                    >
                      <small>
                        {flipped ? "RESPOSTA E EXPLICAÇÃO" : "PERGUNTA"} •{" "}
                        {card + 1}/{qs.length}
                      </small>
                      <strong>
                        {flipped
                          ? qs[card].alternativas[qs[card].correta]
                          : qs[card].pergunta}
                      </strong>
                      {flipped && <p>{qs[card].explicacao}</p>}
                      <span>
                        {flipped
                          ? "Clique para voltar"
                          : "Clique para revelar →"}
                      </span>
                    </button>
                    <div className="quiz-actions">
                      <button
                        disabled={card === 0}
                        onClick={() => {
                          setCard((c) => c - 1);
                          setFlipped(false);
                        }}
                      >
                        Anterior
                      </button>
                      <button
                        onClick={() => {
                          setCard((c) => (c + 1) % qs.length);
                          setFlipped(false);
                        }}
                      >
                        Próximo cartão →
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="empty-pcmg">
                    Os flashcards ficarão disponíveis quando esta matéria tiver
                    questões.
                  </div>
                )}
              </>
            )}
            {aba === "Anotações" && (
              <>
                <h3>Seu caderno de {materia.nome}</h3>
                <p>
                  Registre exceções, dúvidas e a razão de seus erros. As
                  alterações são salvas automaticamente.
                </p>
                <textarea
                  className="study-notes"
                  aria-label="Anotações pessoais"
                  value={notes[cargo + "|" + materia.nome] ?? ""}
                  onChange={(e) => anotar(e.target.value)}
                  placeholder="O que aprendi hoje? Qual detalhe preciso revisar?"
                />
                <small>
                  {localStorage.getItem("pcmg-guest") === "true"
                    ? "Salvo neste navegador."
                    : "Salvo neste navegador e enviado à sua conta quando conectado."}
                </small>
              </>
            )}
          </div>
        </section>
      </div>
    );
  return (
    <div className="estudo-page">
      <section className="estudo-hero">
        <div>
          <span className="pcmg-kicker">CENTRAL DE ESTUDOS</span>
          <h2>Construa sua base. Avance com método.</h2>
          <p>
            Roteiro por cargo, prática comentada e um caderno que acompanha sua
            preparação.
          </p>
        </div>
        <div className="cargo-switch">
          {(["Investigador", "Escrivão"] as Cargo[]).map((c) => (
            <button
              key={c}
              className={cargo === c ? "active" : ""}
              onClick={() => escolherCargo(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </section>
      <section className="estudo-hoje">
        <div>
          <span>SEU PRÓXIMO BLOCO</span>
          <h3>
            {priority ? `Reforce ${priority}` : "Comece com Língua Portuguesa"}
          </h3>
          <p>
            {priority
              ? "Sugestão baseada nas questões pendentes do seu caderno de erros."
              : "Registre seus primeiros resultados para receber uma prioridade de revisão."}
          </p>
        </div>
        <div className="focus-timer">
          <small>BLOCO DE FOCO</small>
          <strong role="timer">
            {String(Math.floor(seconds / 60)).padStart(2, "0")}:
            {String(seconds % 60).padStart(2, "0")}
          </strong>
          <div>
            <button
              onClick={() => setRunning(!running)}
              disabled={seconds === 0}
            >
              {running ? "Pausar" : "Iniciar"}
            </button>
            <button
              onClick={() => {
                setRunning(false);
                setSeconds(1500);
              }}
            >
              Reiniciar
            </button>
          </div>
        </div>
      </section>
      <div className="estudo-title">
        <div>
          <h2>Matérias • {cargo}</h2>
          <p>Escolha seu próximo passo.</p>
        </div>
        <input
          aria-label="Buscar matéria"
          type="search"
          placeholder="Buscar matéria…"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>
      <section className="materias-grid">
        {materias
          .filter((m) =>
            m.nome
              .toLocaleLowerCase("pt-BR")
              .includes(busca.toLocaleLowerCase("pt-BR")),
          )
          .map((m) => (
            <article className="materia-card" key={m.nome}>
              <button className="materia-head" onClick={() => abrir(m)}>
                <span className="materia-icon">{m.icon}</span>
                <span>
                  <strong>{m.nome}</strong>
                  <small>{m.foco}</small>
                </span>
                <b>›</b>
              </button>
              <div className="subject-progress">
                <small>{percentual(m)}% do roteiro estudado</small>
                <div className="progress-track">
                  <i style={{ width: percentual(m) + "%" }} />
                </div>
              </div>
            </article>
          ))}
      </section>
      <p className="source-note">
        Roteiro independente de preparação. Confira as disciplinas exigidas no
        edital do cargo escolhido; a existência de uma matéria aqui não confirma
        sua cobrança no próximo concurso.
      </p>
    </div>
  );
}
