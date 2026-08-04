import Login from "./pages/Login";
import Revisao from "./pages/Revisao";
import Configuracoes from "./pages/Configuracoes";
import Estatisticas from "./pages/Estatisticas";
import { useState } from "react";
import "./App.css";
import { questions } from "./data/questions";
import Questoes from "./pages/Questoes";
import ProfessorVirtual from "./components/ProfessorVirtual";
type MenuItem =
  | "Painel"
  | "Questões"
  | "Simulados"
  | "Estatísticas"
  | "Revisão"
  | "Configurações";

function App() {
  const [pagina, setPagina] = useState<MenuItem>("Painel");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);
  const [copied, setCopied] = useState(false);
const [logged, setLogged] = useState(
  localStorage.getItem("ibgp-login") === "true"
);

if (!logged) {
  return <Login onLogin={() => setLogged(true)} />;
}
const menu: MenuItem[] = [
    "Painel",
    "Questões",
    "Simulados",
    "Estatísticas",
    "Revisão",
    "Configurações",
  ];

  const question = questions[currentQuestion];
  const answeredCount = Object.keys(answers).length;

  const correctCount = questions.reduce((total, item) => {
    return answers[item.id] === item.correta ? total + 1 : total;
  }, 0);

  const percentage = Math.round((correctCount / questions.length) * 100);

  function selectAnswer(optionIndex: number) {
    if (finished) return;

    setAnswers((previous) => ({
      ...previous,
      [question.id]: optionIndex,
    }));
  }

  function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
    }
  }

  function previousQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    }
  }

  function finishQuiz() {
    if (answeredCount < questions.length) {
      const confirmFinish = window.confirm(
        `Você respondeu ${answeredCount} de ${questions.length} questões. Deseja finalizar mesmo assim?`,
      );

      if (!confirmFinish) return;
    }

    setFinished(true);
  }

  function restartQuiz() {
    setAnswers({});
    setCurrentQuestion(0);
    setFinished(false);
    setCopied(false);
  }

  function buildResultText() {
    const answerText = questions
      .map((item, index) => {
        const answer = answers[item.id];
        const letter =
          answer === undefined ? "-" : String.fromCharCode(65 + answer);

        return `${index + 1}${letter}`;
      })
      .join("\n");

    return `RESULTADO IBGP MASTER
Questões: ${questions.length}
Acertos: ${correctCount}
Erros: ${questions.length - correctCount}
Aproveitamento: ${percentage}%

Respostas:
${answerText}`;
  }

  async function copyResult() {
    try {
      await navigator.clipboard.writeText(buildResultText());
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch {
      window.prompt(
        "Copie o resultado abaixo e cole no ChatGPT:",
        buildResultText(),
      );
    }
  }

  function renderDashboard() {
    return (
      <>
        <section className="cards">
          <article className="card">
  <span>🤖 Professor Virtual</span>

  <strong>Disponível</strong>

  <small>Dicas inteligentes durante os estudos</small>
</article>

<article
  className="card"
  style={{
    position: "relative",
    overflow: "hidden",
    borderRadius: 18,
    border: "1px solid #dbeafe",
  }}
>
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: 6,
      height: "100%",
      background: "#2563eb",
    }}
  />

  <span
    style={{
      fontSize: 13,
      color: "#64748b",
      fontWeight: 600,
    }}
  >
    🤖 Professor Virtual
  </span>

  <h2
    style={{
      margin: "12px 0 6px",
      fontSize: 28,
      color: "#0f172a",
    }}
  >
    Online
  </h2>

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 10,
    }}
  >
    <div
      style={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: "#22c55e",
      }}
    />

    <small>Pronto para analisar seus estudos</small>
  </div>

  <small
    style={{
      color: "#64748b",
    }}
  >
    Seu assistente de preparação IBGP.
  </small>
</article>
<article className="card">
  <span>⭐ Favoritas</span>

  <strong>
    {JSON.parse(localStorage.getItem("ibgp-favorites") ?? "[]").length}
  </strong>

  <small>Questões salvas</small>
</article>
            <article className="card">
  <span>Questões disponíveis</span>
  <strong>{questions.length}</strong>
  <small>Banco inicial</small>
</article>

          <article
  className="card"
  style={{
    position: "relative",
    overflow: "hidden",
    borderRadius: 18,
    border: "1px solid #ede9fe",
  }}
>
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: 6,
      height: "100%",
      background: "#7c3aed",
    }}
  />

  <span
    style={{
      fontSize: 13,
      color: "#64748b",
      fontWeight: 600,
    }}
  >
    Aproveitamento geral
  </span>

  <strong
    style={{
      display: "block",
      marginTop: 12,
      fontSize: 30,
      color: "#0f172a",
    }}
  >
    {finished ? `${percentage}%` : "0%"}
  </strong>

  <div
    style={{
      width: "100%",
      height: 10,
      marginTop: 14,
      borderRadius: 999,
      background: "#ede9fe",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width: `${finished ? percentage : 0}%`,
        height: "100%",
        borderRadius: 999,
        background: "#7c3aed",
        transition: "width 0.3s ease",
      }}
    />
  </div>

  <small
    style={{
      display: "block",
      marginTop: 10,
      color: "#64748b",
    }}
  >
    Resultado do último simulado
  </small>
</article>
        <article
  className="card"
  style={{
    position: "relative",
    overflow: "hidden",
    borderRadius: 18,
    border: "1px solid #dcfce7",
  }}
>
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: 6,
      height: "100%",
      background: "#16a34a",
    }}
  />

  <span
    style={{
      fontSize: 13,
      color: "#64748b",
      fontWeight: 600,
    }}
  >
    Questões respondidas
    </span>
  <strong
    style={{
      display: "block",
      marginTop: 12,
      fontSize: 30,
      color: "#0f172a",
    }}
  >
    {answeredCount} / {questions.length}
  </strong>

  <div
    style={{
      width: "100%",
      height: 10,
      marginTop: 14,
      borderRadius: 999,
      background: "#dcfce7",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width: `${
          questions.length > 0
            ? (answeredCount / questions.length) * 100
            : 0
        }%`,
        height: "100%",
        borderRadius: 999,
        background: "#16a34a",
      }}
    />
  </div>

  <small
    style={{
      display: "block",
      marginTop: 10,
      color: "#64748b",
    }}
  >
    Progresso nesta sessão
  </small>
  </article>
</section>
<section 
  style={{
    marginBottom: 24,
    padding: 24,
    borderRadius: 16,
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
  }}
>
  <h3
    style={{
      margin: 0,
      marginBottom: 18,
      fontSize: 20,
      color: "#0f172a",
    }}
  >
    🎯 Próxima meta
    <section
  style={{
    marginBottom:24,
    padding:20,
    borderRadius:16,
    background:"#fff",
    border:"1px solid #e5e7eb"
  }}
>
  <h3 style={{marginTop:0}}>
    📅 Última atividade
  </h3>

  <p>
    Última questão respondida:
    <strong> {answeredCount > 0 ? "Hoje" : "Nenhuma"}</strong>
  </p>

  <p>
    Total respondidas:
    <strong> {answeredCount}</strong>
  </p>

  <p>
    Aproveitamento:
    <strong> {finished ? `${percentage}%` : "--"}</strong>
  </p>
</section>
  </h3>

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 20,
      flexWrap: "wrap",
    }}
  >
    <div>
      <div
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: "#2563eb",
        }}
      >
        {answeredCount} / 20
      </div>

      <small style={{ color: "#64748b" }}>
        Questões respondidas hoje
      </small>
    </div>

    <div
      style={{
        flex: 1,
        minWidth: 250,
      }}
    >
      <div
        style={{
          width: "100%",
          height: 12,
          background: "#e2e8f0",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${Math.min((answeredCount / 20) * 100, 100)}%`,
            height: "100%",
            background: "#2563eb",
          }}
        />
      </div>

      <small
        style={{
          display: "block",
          marginTop: 8,
          color: "#64748b",
        }}
      >
        Meta diária: 20 questões
      </small>
    </div>
  </div>
</section>
<section
  style={{
    marginBottom: 24,
    padding: 24,
    borderRadius: 16,
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
  }}
>  <h2 style={{ marginTop: 0 }}>
    🤖 Professor Virtual
  </h2>
 <ProfessorVirtual percentual={percentage} />
</section>

        <section className="destaque">
          <div>
            <span className="etiqueta">Simulado recomendado</span>

            <h2>Treino inicial GCM Brumadinho — estilo IBGP</h2>

            <p>
              Responda clicando nas alternativas. Ao finalizar, copie o
              resultado e cole na nossa conversa para análise.
            </p>

            <button
              className="botao-principal"
              onClick={() => setPagina("Simulados")}
            >
              Iniciar simulado
            </button>
          </div>

          <div className="progresso-circular">
            <strong>{finished ? `${percentage}%` : "0%"}</strong>
            <span>último resultado</span>
          </div>
        </section>

        <section className="grade-inferior">
          <article className="painel">
            <h3>Matérias do banco inicial</h3>

            {["CTB", "Direitos Humanos", "Lei de Tortura"].map((materia) => (
              <div className="materia" key={materia}>
                <div>
                  <span>{materia}</span>
                  <strong>
                    {questions.filter((item) => item.materia === materia).length}
                  </strong>
                </div>

                <div className="barra">
                  <span
                    style={{
                      width: `${
                        (questions.filter((item) => item.materia === materia)
                          .length /
                          questions.length) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </article>

          <article className="painel">
            <h3>Objetivo desta versão</h3>

            <p className="revisao-titulo">Alternativas totalmente clicáveis</p>

            <p className="texto-secundario">
              Você não precisará mais digitar número e letra para responder.
            </p>

            <button
              className="botao-secundario"
              onClick={() => setPagina("Simulados")}
            >
              Testar agora
            </button>
          </article>
        </section>
      </>
    );
  }

  function renderQuiz() {
    if (finished) {
      return (
        <section className="result-page">
          <div className="result-header">
            <span className="result-label">Simulado finalizado</span>
            <h2>Seu resultado</h2>
            <p>Confira o desempenho e copie as respostas para enviar.</p>
          </div>

          <div className="result-cards">
            <article>
              <span>Acertos</span>
              <strong>
                {correctCount}/{questions.length}
              </strong>
            </article>

            <article>
              <span>Erros</span>
              <strong>{questions.length - correctCount}</strong>
            </article>

            <article>
              <span>Aproveitamento</span>
              <strong>{percentage}%</strong>
            </article>
          </div>

          <div className="answer-review">
            {questions.map((item, index) => {
              const selected = answers[item.id];
              const isCorrect = selected === item.correta;

              return (
                <article
                  className={`review-item ${
                    isCorrect ? "review-correct" : "review-wrong"
                  }`}
                  key={item.id}
                >
                  <div className="review-title">
                    <strong>Questão {index + 1}</strong>

                    <span>{isCorrect ? "Correta" : "Incorreta"}</span>
                  </div>

                  <p>{item.pergunta}</p>

                  <small>
                    Sua resposta:{" "}
                    {selected === undefined
                      ? "Em branco"
                      : `${String.fromCharCode(65 + selected)}) ${
                          item.alternativas[selected]
                        }`}
                  </small>

                  {!isCorrect && (
                    <small className="correct-answer">
                      Correta: {String.fromCharCode(65 + item.correta)}){" "}
                      {item.alternativas[item.correta]}
                    </small>
                  )}

                  <div className="explicacao">{item.explicacao}</div>
                </article>
              );
            })}
          </div>

          <div className="result-actions">
            <button className="copy-button" onClick={copyResult}>
              {copied ? "Resultado copiado!" : "Copiar resultado"}
            </button>

            <button className="restart-button" onClick={restartQuiz}>
              Refazer simulado
            </button>
          </div>
        </section>
      );
    }

    return (
      <section className="quiz-layout">
        <div className="quiz-main">
          <div className="quiz-top">
            <div>
              <span className="materia-badge">{question.materia}</span>
              <p>
                Questão {currentQuestion + 1} de {questions.length}
              </p>
            </div>

            <strong>{Math.round((answeredCount / questions.length) * 100)}%</strong>
          </div>

          <div className="quiz-progress">
            <span
              style={{
                width: `${(answeredCount / questions.length) * 100}%`,
              }}
            />
          </div>

          <article className="question-card">
            <h2>{question.pergunta}</h2>

            <div className="alternativas">
              {question.alternativas.map((option, index) => {
                const selected = answers[question.id] === index;

                return (
                  <button
                    className={`option ${selected ? "selected" : ""}`}
                    key={option}
                    onClick={() => selectAnswer(index)}
                  >
                    <span>{String.fromCharCode(65 + index)}</span>
                    <p>{option}</p>
                  </button>
                );
              })}
            </div>
          </article>

          <div className="quiz-actions">
            <button
              className="navigation-button"
              disabled={currentQuestion === 0}
              onClick={previousQuestion}
            >
              Anterior
            </button>

            {currentQuestion < questions.length - 1 ? (
              <button
                className="next-button"
                disabled={answers[question.id] === undefined}
                onClick={nextQuestion}
              >
                Próxima
              </button>
            ) : (
              <button className="finish-button" onClick={finishQuiz}>
                Finalizar simulado
              </button>
            )}
          </div>
        </div>

        <aside className="question-navigation">
          <h3>Questões</h3>

          <div className="question-grid">
            {questions.map((item, index) => {
              const answered = answers[item.id] !== undefined;
              const active = index === currentQuestion;

              return (
                <button
                  className={`${answered ? "answered" : ""} ${
                    active ? "active-question" : ""
                  }`}
                  key={item.id}
                  onClick={() => setCurrentQuestion(index)}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          <div className="navigation-legend">
            <p>
              <span className="legend-current" /> Atual
            </p>
            <p>
              <span className="legend-answered" /> Respondida
            </p>
            <p>
              <span className="legend-empty" /> Em branco
            </p>
          </div>

          <button className="finish-side-button" onClick={finishQuiz}>
            Finalizar
          </button>
        </aside>
      </section>
    );
    }
  return (
  <div className="app">
    <aside className="sidebar">
          <div className="logo">
          <span className="logo-icon">I</span>

          <div>
            <strong>IBGP Master</strong>
            <small>GCM Brumadinho</small>
          </div>
        </div>

        <nav className="menu">
          {menu.map((item) => (
            <button
              key={item}
              className={pagina === item ? "menu-item ativo" : "menu-item"}
              onClick={() => setPagina(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="perfil">
          <div className="avatar">CS</div>

          <div>
            <strong>Charles</strong>
            <small>Aluno</small>
          </div>
        </div>
      </aside>

      <main className="conteudo">
        <header className="topo">
          <div>
            <p className="saudacao">Olá, Charles</p>
            <h1>{pagina}</h1>
          </div>

          <button className="modo" type="button">
            ☾
          </button>
        </header>
{pagina === "Painel" && renderDashboard()}

{pagina === "Questões" && <Questoes />}
{pagina === "Revisão" && <Revisao />}
{pagina === "Configurações" && <Configuracoes />}

{pagina === "Simulados" && renderQuiz()}
        {pagina === "Estatísticas" && <Estatisticas />}
{pagina === "Painel" && renderDashboard()}

{pagina === "Questões" && <Questoes />}

{pagina === "Simulados" && renderQuiz()}

{pagina === "Estatísticas" && <Estatisticas />}

{pagina === "Revisão" && <Revisao />}

{pagina === "Configurações" && <Configuracoes />}
      </main>
    </div>
  );
}

export default App;
