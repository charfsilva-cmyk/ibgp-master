import { useEffect, useRef, useState } from "react";
import { questions } from "../data/questions";
import { readJSON, notifyChange } from "../utils/cloud";
import { salvarResposta } from "../utils/progress";
type Cargo = "Investigador" | "Escrivão";
type Mode = "completo" | "materia" | "erros" | "prova";
type Exam = {
  id: string;
  cargo: Cargo;
  modo: Mode;
  materia: string;
  ids: number[];
  respostas: Record<number, number>;
  indice: number;
  started: number;
  expires: number | null;
};
type Result = Exam & {
  data: string;
  acertos: number;
  respondidas: number;
  total: number;
};
export default function Simulados() {
  const [cargo, setCargo] = useState<Cargo>(
    (localStorage.getItem("pcmg-cargo") as Cargo) || "Investigador",
  );
  const [materia, setMateria] = useState("");
  const [quantidade, setQuantidade] = useState(20);
  const [minutos, setMinutos] = useState(40);
  const [exam, setExam] = useState<Exam | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [tick, setTick] = useState(() => Date.now());
  const [draft, setDraft] = useState<Exam | null>(
    readJSON("pcmg-simulado-draft", null),
  );
  const [error, setError] = useState("");
  const finishing = useRef(false);
  const errors = readJSON<number[]>("pcmg-erros", []);
  const history = readJSON<Result[]>("pcmg-simulado-history", []);
  const bank = questions.filter(
    (q) => !q.cargo || q.cargo === "Ambos" || q.cargo === cargo,
  );
  const materias = [...new Set(bank.map((q) => q.materia))];
  const lista = exam
    ? exam.ids.map((id) => questions.find((q) => q.id === id)!).filter(Boolean)
    : [];
  const remaining = exam?.expires
    ? Math.max(0, Math.ceil((exam.expires - tick) / 1000))
    : 0;
  function finish(current: Exam) {
    if (finishing.current) return;
    finishing.current = true;
    const list = current.ids
      .map((id) => questions.find((q) => q.id === id)!)
      .filter(Boolean);
    const answered = list.filter((q) => current.respostas[q.id] !== undefined);
    const acertos = answered.filter(
      (q) => current.respostas[q.id] === q.correta,
    ).length;
    const r = {
      ...current,
      data: new Date().toISOString(),
      acertos,
      respondidas: answered.length,
      total: list.length,
    };
    answered.forEach((q) =>
      salvarResposta(q.id, current.respostas[q.id] === q.correta),
    );
    localStorage.setItem(
      "pcmg-simulado-history",
      JSON.stringify(
        [r, ...readJSON<Result[]>("pcmg-simulado-history", [])].slice(0, 30),
      ),
    );
    localStorage.removeItem("pcmg-simulado-draft");
    setDraft(null);
    setExam(null);
    setResult(r);
    notifyChange();
  }
  useEffect(() => {
    if (!exam) return;
    localStorage.setItem("pcmg-simulado-draft", JSON.stringify(exam));
    notifyChange();
  }, [exam]);
  useEffect(() => {
    if (!exam?.expires) return;
    const id = window.setInterval(() => setTick(Date.now()), 1000);
    return () => clearInterval(id);
  }, [exam?.expires]);
  useEffect(() => {
    if (exam?.expires && tick >= exam.expires) finish(exam);
  }, [tick, exam]);
  function start(modo: Mode) {
    let selected = bank.filter((q) =>
      modo === "materia"
        ? q.materia === materia
        : modo === "erros"
          ? errors.includes(q.id)
          : true,
    );
    if (!selected.length) {
      setError("Não há questões disponíveis para esse treino.");
      return;
    }
    selected = [...selected];
    for (let i = selected.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [selected[i], selected[j]] = [selected[j], selected[i]];
    }
    const now = Date.now();
    finishing.current = false;
    setResult(null);
    setError("");
    setTick(now);
    setExam({
      id: crypto.randomUUID(),
      cargo,
      modo,
      materia,
      ids: selected.slice(0, quantidade).map((q) => q.id),
      respostas: {},
      indice: 0,
      started: now,
      expires: modo === "prova" ? now + minutos * 60000 : null,
    });
  }
  function update(change: Partial<Exam>) {
    setExam((current) => (current ? { ...current, ...change } : null));
  }
  function changeCargo(c: Cargo) {
    setCargo(c);
    setMateria("");
    localStorage.setItem("pcmg-cargo", c);
    notifyChange();
  }
  if (result) {
    const rqs = result.ids
      .map((id) => questions.find((q) => q.id === id)!)
      .filter(Boolean);
    const wrong = result.respondidas - result.acertos;
    return (
      <section className="result-page">
        <div className="section-heading">
          <span className="pcmg-kicker">
            RESULTADO • {result.cargo.toUpperCase()}
          </span>
          <h2>Seu treino, em detalhes.</h2>
          <p>A correção alimentou suas estatísticas e seu caderno de erros.</p>
        </div>
        <div className="result-cards">
          <article>
            <span>Acertos</span>
            <strong>
              {result.acertos}/{result.total}
            </strong>
          </article>
          <article>
            <span>Erros</span>
            <strong>{wrong}</strong>
          </article>
          <article>
            <span>Não respondidas</span>
            <strong>{result.total - result.respondidas}</strong>
          </article>
          <article>
            <span>Aproveitamento geral</span>
            <strong>
              {Math.round((result.acertos / result.total) * 100)}%
            </strong>
          </article>
        </div>
        <h3>Correção comentada</h3>
        {rqs.map((q, i) => (
          <details className="correction-item" key={q.id}>
            <summary>
              <span>
                {result.respostas[q.id] === undefined
                  ? "○"
                  : result.respostas[q.id] === q.correta
                    ? "✓"
                    : "×"}{" "}
                Questão {i + 1} • {q.materia}
              </span>
              <small>
                {result.respostas[q.id] === undefined
                  ? "Em branco"
                  : result.respostas[q.id] === q.correta
                    ? "Acertou"
                    : "Revisar"}
              </small>
            </summary>
            <h4>{q.pergunta}</h4>
            {q.alternativas.map((a, j) => (
              <p className={j === q.correta ? "correct-text" : ""} key={j}>
                {String.fromCharCode(65 + j)}. {a}
                {j === q.correta ? " ✓ Gabarito" : ""}
                {j === result.respostas[q.id] ? " • Sua resposta" : ""}
              </p>
            ))}
            <div className="dica-prova">{q.explicacao}</div>
          </details>
        ))}
        <button className="botao-principal" onClick={() => setResult(null)}>
          Voltar aos simulados →
        </button>
      </section>
    );
  }
  if (exam && lista.length) {
    const q = lista[exam.indice];
    return (
      <section className="simulado-execucao">
        <div className="simulado-bar">
          <button
            onClick={() => {
              setDraft(exam);
              setExam(null);
            }}
          >
            ← Salvar e sair
          </button>
          <div>
            <strong>
              {exam.modo === "prova"
                ? "Treino cronometrado"
                : `Treino • ${exam.cargo}`}
            </strong>
            <small>
              {Object.keys(exam.respostas).length}/{lista.length} respondidas
            </small>
          </div>
          {exam.expires && (
            <span className="prova-timer" role="timer">
              {String(Math.floor(remaining / 60)).padStart(2, "0")}:
              {String(remaining % 60).padStart(2, "0")}
            </span>
          )}
        </div>
        <div className="question-jump" aria-label="Navegar pelas questões">
          {lista.map((item, i) => (
            <button
              className={`${i === exam.indice ? "active" : ""} ${exam.respostas[item.id] !== undefined ? "answered" : ""}`}
              aria-label={`Questão ${i + 1}${exam.respostas[item.id] !== undefined ? ", respondida" : ""}`}
              onClick={() => update({ indice: i })}
              key={item.id}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <article className="question-card">
          <span className="materia-badge">
            {q.materia} • Questão {exam.indice + 1}/{lista.length}
          </span>
          <h2>{q.pergunta}</h2>
          <div className="alternativas">
            {q.alternativas.map((op, i) => (
              <button
                className={`q-option ${exam.respostas[q.id] === i ? "selected" : ""}`}
                aria-pressed={exam.respostas[q.id] === i}
                key={i}
                onClick={() =>
                  update({ respostas: { ...exam.respostas, [q.id]: i } })
                }
              >
                <span>{String.fromCharCode(65 + i)}</span>
                <p>{op}</p>
              </button>
            ))}
          </div>
        </article>
        <div className="quiz-actions">
          <button
            disabled={exam.indice === 0}
            onClick={() => update({ indice: exam.indice - 1 })}
          >
            Anterior
          </button>
          <button
            disabled={exam.indice === lista.length - 1}
            onClick={() => update({ indice: exam.indice + 1 })}
          >
            Próxima →
          </button>
          <button
            className="botao-principal"
            onClick={() => {
              const missing = lista.length - Object.keys(exam.respostas).length;
              if (
                missing &&
                !window.confirm(`${missing} questões em branco. Finalizar?`)
              )
                return;
              finish(exam);
            }}
          >
            Finalizar treino
          </button>
        </div>
        <small>
          Seu treino é salvo automaticamente. O cronômetro continua após sair.
        </small>
      </section>
    );
  }
  return (
    <div className="simulados-page">
      <section className="simulados-hero">
        <div>
          <span className="pcmg-kicker">CENTRAL DE SIMULADOS</span>
          <h2>Pratique hoje. Chegue mais preparado.</h2>
          <p>
            Treino autoral e adaptado, com correção comentada e resultados
            reais.
          </p>
        </div>
        <div className="cargo-switch">
          {(["Investigador", "Escrivão"] as Cargo[]).map((c) => (
            <button
              key={c}
              className={cargo === c ? "active" : ""}
              onClick={() => changeCargo(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </section>
      {draft && (
        <div className="resume-banner">
          <div>
            <strong>Você tem um treino em andamento</strong>
            <p>
              {draft.cargo} • {Object.keys(draft.respostas).length}/
              {draft.ids.length} respondidas
            </p>
          </div>
          <button
            className="botao-principal"
            onClick={() => {
              finishing.current = false;
              setTick(Date.now());
              setExam(draft);
            }}
          >
            Retomar →
          </button>
        </div>
      )}
      <div className="exam-config">
        <label>
          Questões por treino
          <select
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
          >
            {[10, 20, 40, 60, 80].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <label>
          Tempo do modo prova
          <select
            value={minutos}
            onChange={(e) => setMinutos(Number(e.target.value))}
          >
            {[20, 40, 60, 120, 240].map((n) => (
              <option key={n} value={n}>
                {n} minutos
              </option>
            ))}
          </select>
        </label>
        <small>
          {bank.length} questões neste cargo. Cada treino usa até a quantidade
          disponível.
        </small>
      </div>
      {error && <p role="alert">{error}</p>}
      <section className="simulados-grid">
        <button className="simulado-card" onClick={() => start("completo")}>
          <span>▤</span>
          <div>
            <small>VISÃO GERAL</small>
            <h3>Treino completo</h3>
            <p>Seleção aleatória de todas as matérias disponíveis.</p>
          </div>
          <b>Iniciar →</b>
        </button>
        <button
          className="simulado-card destaque-card"
          onClick={() => start("prova")}
        >
          <span>◷</span>
          <div>
            <small>FOCO E TEMPO</small>
            <h3>Modo prova</h3>
            <p>Cronômetro e correção somente ao finalizar.</p>
          </div>
          <b>Iniciar →</b>
        </button>
        <div className="simulado-card materia-simulado">
          <span>▧</span>
          <div>
            <small>FOCO DIRECIONADO</small>
            <h3>Por matéria</h3>
            <select
              aria-label="Matéria do simulado"
              value={materia}
              onChange={(e) => setMateria(e.target.value)}
            >
              <option value="">Selecione a matéria</option>
              {materias.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </div>
          <button disabled={!materia} onClick={() => start("materia")}>
            Iniciar →
          </button>
        </div>
        <button className="simulado-card" onClick={() => start("erros")}>
          <span>↻</span>
          <div>
            <small>CONSOLIDE O CONHECIMENTO</small>
            <h3>Seus erros</h3>
            <p>Refaça questões pendentes e retire as que acertar.</p>
          </div>
          <b>{errors.length} pendentes →</b>
        </button>
      </section>
      <section className="exam-history">
        <h3>Histórico de simulados</h3>
        {history.length ? (
          history.map((r, i) => (
            <article key={r.id ?? i}>
              <div>
                <strong>
                  {r.cargo} • {r.modo === "prova" ? "Cronometrado" : "Treino"}
                </strong>
                <small>{new Date(r.data).toLocaleString("pt-BR")}</small>
              </div>
              <span>
                {r.acertos}/{r.total} acertos
              </span>
              <b>{Math.round((r.acertos / r.total) * 100)}%</b>
              {r.ids && (
                <button onClick={() => setResult(r)}>Ver correção →</button>
              )}
            </article>
          ))
        ) : (
          <div className="empty-pcmg">
            Finalize seu primeiro treino para acompanhar sua evolução.
          </div>
        )}
      </section>
      <p className="source-note">
        O modo prova é um treino configurável; quantidade, distribuição de
        matérias e tempo não reproduzem automaticamente um edital oficial.
      </p>
    </div>
  );
}
