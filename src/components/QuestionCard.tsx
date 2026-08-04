import { useState } from "react";
import type { Question } from "../types/question";
import ProfessorVirtual from "./ProfessorVirtual";
import {
  obterProgressoQuestao,
  salvarResposta,
  type ProgressoQuestao,
} from "../utils/progress";

type Props = {
  question: Question;
};

export default function QuestionCard({ question }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const [progresso, setProgresso] = useState<ProgressoQuestao | null>(
    obterProgressoQuestao(question.id),
  );

  function responderQuestao() {
    if (selected === null || answered) {
      return;
    }

    const acertou = selected === question.correta;
    const novoProgresso = salvarResposta(question.id, acertou);

    setProgresso(novoProgresso);
    setAnswered(true);
  }

  function corAlternativa(index: number) {
    if (!answered) {
      return selected === index ? "#dbeafe" : "#ffffff";
    }

    if (index === question.correta) {
      return "#dcfce7";
    }

    if (index === selected && selected !== question.correta) {
      return "#fee2e2";
    }

    return "#ffffff";
  }

  function bordaAlternativa(index: number) {
    if (!answered) {
      return selected === index
        ? "2px solid #2563eb"
        : "1px solid #cbd5e1";
    }

    if (index === question.correta) {
      return "2px solid #16a34a";
    }

    if (index === selected && selected !== question.correta) {
      return "2px solid #dc2626";
    }

    return "1px solid #cbd5e1";
  }

  return (
    <div
      style={{
        background: "#ffffff",
        padding: 24,
        borderRadius: 14,
        marginTop: 20,
        boxShadow: "0 3px 14px rgba(15, 23, 42, 0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          marginBottom: 16,
        }}
      >
        <span
          style={{
            padding: "6px 10px",
            borderRadius: 8,
            background: "#eff6ff",
            color: "#1d4ed8",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          {question.materia}
        </span>

        <span
          style={{
            padding: "6px 10px",
            borderRadius: 8,
            background: "#f1f5f9",
            color: "#475569",
            fontSize: 13,
          }}
        >
          {question.assunto}
        </span>

        <span
          style={{
            padding: "6px 10px",
            borderRadius: 8,
            background: "#f1f5f9",
            color: "#475569",
            fontSize: 13,
          }}
        >
          {question.dificuldade}
        </span>
      </div>

      <h2
        style={{
          margin: "0 0 20px",
          lineHeight: 1.5,
          color: "#172033",
        }}
      >
        {question.pergunta}
      </h2>

      {question.alternativas.map((alternativa, index) => (
        <button
          key={index}
          type="button"
          disabled={answered}
          onClick={() => setSelected(index)}
          style={{
            display: "block",
            width: "100%",
            marginTop: 10,
            padding: 14,
            textAlign: "left",
            borderRadius: 10,
            cursor: answered ? "default" : "pointer",
            border: bordaAlternativa(index),
            background: corAlternativa(index),
            color: "#172033",
          }}
        >
          <strong>{String.fromCharCode(65 + index)}.</strong>{" "}
          {alternativa}
        </button>
      ))}

      <button
        type="button"
        disabled={selected === null || answered}
        onClick={responderQuestao}
        style={{
          marginTop: 20,
          padding: "12px 20px",
          border: "none",
          borderRadius: 9,
          background:
            selected === null || answered ? "#94a3b8" : "#2563eb",
          color: "#ffffff",
          cursor:
            selected === null || answered ? "not-allowed" : "pointer",
          fontWeight: 700,
        }}
      >
        Responder
      </button>

      {answered && (
        <div
          style={{
            marginTop: 20,
            padding: 18,
            background:
              selected === question.correta ? "#f0fdf4" : "#fef2f2",
            borderRadius: 10,
            border:
              selected === question.correta
                ? "1px solid #86efac"
                : "1px solid #fca5a5",
          }}
        >
          <strong
            style={{
              color:
                selected === question.correta ? "#15803d" : "#b91c1c",
            }}
          >
            {selected === question.correta
              ? "✅ Você acertou!"
              : "❌ Você errou!"}
          </strong>

          <p
            style={{
              margin: "12px 0 0",
              lineHeight: 1.6,
              color: "#334155",
            }}
          >
            {question.explicacao}
          </p>
        </div>
      )}

 
{progresso && (
        <div
          style={{
            marginTop: 18,
            padding: 14,
            borderRadius: 10,
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            color: "#475569",
          }}
        >
          <strong>Seu desempenho nesta questão</strong>

          <div
            style={{
              display: "flex",
              gap: 18,
              flexWrap: "wrap",
              marginTop: 10,
              fontSize: 14,
            }}
          >
            <span>Tentativas: {progresso.tentativas}</span>
            <span>Acertos: {progresso.acertos}</span>
            <span>Erros: {progresso.erros}</span>
          </div>

          <small
            style={{
              display: "block",
              marginTop: 8,
            }}
          >
            Última resposta: {progresso.ultimaResposta}
          </small>
        </div>
      )}
    </div>
  );
}