import { questions } from "../data/questions";
import { obterProgressoQuestao } from "../utils/progress";

export default function Revisao() {
  const revisar = questions.filter((questao) => {
    const progresso = obterProgressoQuestao(questao.id);

    return progresso && progresso.erros > 0;
  });

  return (
    <section className="pagina-vazia">
      <h2 style={{ color: "#ffffff" }}>📚 Revisão Inteligente</h2>

      <p
        style={{
          color: "#aebbd0",
          marginBottom: 30,
        }}
      >
        Estas são as questões que você já errou e deve revisar.
      </p>

      {revisar.length === 0 && (
        <div
          style={{
            padding: 28,
            borderRadius: 14,
            background: "rgba(34, 197, 94, 0.12)",
            border: "1px solid rgba(34, 197, 94, 0.35)",
            color: "#dcfce7",
          }}
        >
          <strong
            style={{
              display: "block",
              marginBottom: 6,
              color: "#86efac",
              fontSize: 18,
            }}
          >
            🎉 Parabéns!
          </strong>

          Você ainda não possui questões para revisar.
        </div>
      )}

      <div
        style={{
          display: "grid",
          gap: 16,
        }}
      >
        {revisar.map((questao) => {
          const progresso = obterProgressoQuestao(questao.id)!;

          return (
            <article
              key={questao.id}
              style={{
                background: "rgba(15, 23, 42, 0.82)",
                color: "#f8fafc",
                padding: 20,
                borderRadius: 14,
                border: "1px solid rgba(148, 163, 184, 0.18)",
                boxShadow: "0 14px 30px rgba(0, 0, 0, 0.18)",
              }}
            >
              <strong
                style={{
                  display: "block",
                  color: "#a78bfa",
                  fontSize: 15,
                }}
              >
                {questao.materia}
              </strong>

              <p
                style={{
                  margin: "12px 0",
                  color: "#f8fafc",
                  fontSize: 17,
                  lineHeight: 1.5,
                }}
              >
                {questao.pergunta}
              </p>

              <span
                style={{
                  display: "inline-block",
                  padding: "7px 10px",
                  borderRadius: 8,
                  background: "rgba(239, 68, 68, 0.14)",
                  color: "#fca5a5",
                  fontWeight: 700,
                }}
              >
                ❌ Erros: {progresso.erros}
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}