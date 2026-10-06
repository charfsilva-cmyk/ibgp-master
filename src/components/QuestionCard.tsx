import { useState } from "react";
import type { Question } from "../types/question";
import { obterProgressoQuestao, salvarResposta } from "../utils/progress";
import { notifyChange, readJSON } from "../utils/cloud";
export default function QuestionCard({ question }: { question: Question }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [favorita, setFavorita] = useState(
    readJSON<number[]>("pcmg-favorites", []).includes(question.id),
  );
  const [progresso, setProgresso] = useState(
    obterProgressoQuestao(question.id),
  );
  function favorite() {
    const ids = readJSON<number[]>("pcmg-favorites", []);
    localStorage.setItem(
      "pcmg-favorites",
      JSON.stringify(
        favorita
          ? ids.filter((x) => x !== question.id)
          : [...new Set([...ids, question.id])],
      ),
    );
    setFavorita(!favorita);
    notifyChange();
  }
  return (
    <article className="question-panel">
      <div className="q-meta">
        <span>{question.materia}</span>
        <span>{question.assunto}</span>
        <span>{question.dificuldade}</span>
        <button onClick={favorite} className="favorite-question">
          {favorita ? "★ Favorita" : "☆ Favoritar"}
        </button>
      </div>
      <h2>{question.pergunta}</h2>
      {question.alternativas.map((text, i) => (
        <button
          key={i}
          disabled={answered}
          onClick={() => setSelected(i)}
          className={`q-option ${selected === i ? "selected" : ""} ${answered && i === question.correta ? "correct" : ""} ${answered && i === selected && i !== question.correta ? "wrong" : ""}`}
        >
          <b>{String.fromCharCode(65 + i)}</b>
          <span>{text}</span>
        </button>
      ))}
      <button
        style={{ marginTop: 18 }}
        className="botao-principal"
        disabled={selected === null || answered}
        onClick={() => {
          if (selected === null) return;
          setProgresso(
            salvarResposta(question.id, selected === question.correta),
          );
          setAnswered(true);
        }}
      >
        Confirmar resposta
      </button>
      {answered && (
        <div className="q-explanation">
          <strong>
            {selected === question.correta
              ? "Você acertou!"
              : "Vamos revisar este ponto."}{" "}
            Gabarito: {String.fromCharCode(65 + question.correta)}
          </strong>
          <p>{question.explicacao}</p>
        </div>
      )}
      {progresso && (
        <div className="q-performance">
          {progresso.tentativas} tentativas · {progresso.acertos} acertos ·{" "}
          {progresso.erros} erros · Última: {progresso.ultimaResposta}
        </div>
      )}
    </article>
  );
}
