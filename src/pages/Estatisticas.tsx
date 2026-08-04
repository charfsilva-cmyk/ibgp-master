import { questions } from "../data/questions";
import { obterProgressoQuestao } from "../utils/progress";
import { getMateriaStats } from "../utils/statistics";

export default function Estatisticas() {
  const materias = getMateriaStats();

  let acertos = 0;
  let erros = 0;
  let respondidas = 0;

  questions.forEach((questao) => {
    const progresso = obterProgressoQuestao(questao.id);

    if (!progresso) return;

    respondidas += 1;
    acertos += progresso.acertos;
    erros += progresso.erros;
  });

  const total = acertos + erros;

  const aproveitamento =
    total === 0 ? 0 : Math.round((acertos / total) * 100);

  const rankingMaterias = Object.entries(materias).sort((a, b) => {
    const percentualA = Math.round(
      (a[1].acertos / Math.max(1, a[1].acertos + a[1].erros)) * 100,
    );

    const percentualB = Math.round(
      (b[1].acertos / Math.max(1, b[1].acertos + b[1].erros)) * 100,
    );

    return percentualB - percentualA;
  });

  return (
    <section className="pagina-vazia">
      <h2>📊 Estatísticas</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
          marginTop: 25,
        }}
      >
        <Card
          titulo="Questões respondidas"
          valor={respondidas}
          cor="#60a5fa"
        />

        <Card titulo="Acertos" valor={acertos} cor="#22c55e" />

        <Card titulo="Erros" valor={erros} cor="#ef4444" />

        <Card
          titulo="Aproveitamento"
          valor={`${aproveitamento}%`}
          cor="#a78bfa"
        />
      </div>

      <h2 style={{ marginTop: 40 }}>🏆 Ranking das matérias</h2>

      <div
        style={{
          marginTop: 20,
          display: "grid",
          gap: 14,
        }}
      >
        {rankingMaterias.map(([nome, dados], index) => {
          const percentual = Math.round(
            (dados.acertos / Math.max(1, dados.acertos + dados.erros)) * 100,
          );

          return (
            <article
              key={nome}
              style={{
                padding: 20,
                borderRadius: 14,
                border: "1px solid rgba(148, 163, 184, 0.18)",
                background: "rgba(15, 23, 42, 0.78)",
                color: "#f8fafc",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <strong
                  style={{
                    color: "#ffffff",
                    fontSize: 18,
                  }}
                >
                  {index + 1}º — {nome}
                </strong>

                <strong
                  style={{
                    color: "#a78bfa",
                    fontSize: 18,
                  }}
                >
                  {percentual}%
                </strong>
              </div>

              <div
                style={{
                  marginTop: 14,
                  height: 10,
                  background: "rgba(148, 163, 184, 0.18)",
                  borderRadius: 20,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${percentual}%`,
                    height: "100%",
                    borderRadius: 20,
                    background:
                      "linear-gradient(90deg, #7c3aed, #2563eb)",
                  }}
                />
              </div>

              <small
                style={{
                  display: "block",
                  marginTop: 10,
                  color: "#aebbd0",
                }}
              >
                {dados.acertos} acertos e {dados.erros} erros
              </small>
            </article>
          );
        })}
      </div>

      <h2 style={{ marginTop: 40 }}>📚 Desempenho por matéria</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
          marginTop: 20,
        }}
      >
        {Object.entries(materias).map(([nome, dados]) => (
          <article
            key={nome}
            style={{
              background: "rgba(15, 23, 42, 0.78)",
              color: "#f8fafc",
              border: "1px solid rgba(148, 163, 184, 0.18)",
              borderRadius: 14,
              padding: 20,
            }}
          >
            <strong
              style={{
                color: "#ffffff",
                fontSize: 18,
              }}
            >
              {nome}
            </strong>

            <div
              style={{
                marginTop: 14,
                color: "#86efac",
              }}
            >
              ✅ Acertos: {dados.acertos}
            </div>

            <div
              style={{
                marginTop: 7,
                color: "#fca5a5",
              }}
            >
              ❌ Erros: {dados.erros}
            </div>
          </article>
        ))}
      </div>

      {Object.keys(materias).length === 0 && (
        <div
          style={{
            marginTop: 25,
            padding: 30,
            borderRadius: 14,
            border: "1px dashed rgba(148, 163, 184, 0.35)",
            background: "rgba(15, 23, 42, 0.55)",
            color: "#aebbd0",
            textAlign: "center",
          }}
        >
          Responda algumas questões para gerar suas estatísticas.
        </div>
      )}
    </section>
  );
}

function Card({
  titulo,
  valor,
  cor,
}: {
  titulo: string;
  valor: number | string;
  cor: string;
}) {
  return (
    <article
      style={{
        background: "rgba(15, 23, 42, 0.82)",
        padding: 24,
        borderRadius: 14,
        border: "1px solid rgba(148, 163, 184, 0.18)",
        borderTop: `5px solid ${cor}`,
        boxShadow: "0 14px 32px rgba(0, 0, 0, 0.22)",
      }}
    >
      <div
        style={{
          color: "#aebbd0",
          fontSize: 14,
        }}
      >
        {titulo}
      </div>

      <div
        style={{
          fontSize: 36,
          fontWeight: 700,
          marginTop: 10,
          color: cor,
        }}
      >
        {valor}
      </div>
    </article>
  );
}