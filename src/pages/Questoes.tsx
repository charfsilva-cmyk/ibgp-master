import { useState } from "react";
import FilterBar from "../components/FilterBar";
import QuestionCard from "../components/QuestionCard";
import { questions } from "../data/questions";
import type { Question } from "../types/question";

export default function Questoes() {
  const [questaoAberta, setQuestaoAberta] = useState<Question | null>(null);
  const [search, setSearch] = useState("");
  const [materia, setMateria] = useState("");
  const [somenteFavoritas, setSomenteFavoritas] = useState(false);

  const materias = [...new Set(questions.map((q) => q.materia))];

  const favoritos = JSON.parse(
    localStorage.getItem("ibgp-favorites") ?? "[]",
  ) as number[];

  const termo = search.trim().toLowerCase();

  const filteredQuestions = questions.filter((question) => {
    const correspondeMateria =
      materia === "" || question.materia === materia;

    const correspondePesquisa =
      termo === "" ||
      question.pergunta.toLowerCase().includes(termo) ||
      question.assunto.toLowerCase().includes(termo) ||
      question.materia.toLowerCase().includes(termo);

    const correspondeFavorita =
      !somenteFavoritas || favoritos.includes(question.id);

    return (
      correspondeMateria &&
      correspondePesquisa &&
      correspondeFavorita
    );
  });

  if (questaoAberta) {
    const indiceAtual = filteredQuestions.findIndex(
  (item) => item.id === questaoAberta.id
);

const proximaQuestao = filteredQuestions[indiceAtual + 1];
    return (
      <section className="pagina-vazia">
        <button
          type="button"
          className="botao-secundario"
          onClick={() => setQuestaoAberta(null)}
        >
          ← Voltar ao banco
        </button>

        <QuestionCard question={questaoAberta} />
        {proximaQuestao ? (
  <button
    type="button"
    className="botao-principal"
    onClick={() => {
      setQuestaoAberta(proximaQuestao);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    style={{
      marginTop: 20,
      width: "100%",
      padding: 14,
      border: "none",
      borderRadius: 10,
      background: "#4f46e5",
      color: "#ffffff",
      fontSize: 16,
      fontWeight: 700,
      cursor: "pointer",
    }}
  >
    Próxima questão →
  </button>
) : (
  <button
    type="button"
    className="botao-secundario"
    onClick={() => setQuestaoAberta(null)}
    style={{
      marginTop: 20,
      width: "100%",
      padding: 14,
      borderRadius: 10,
      cursor: "pointer",
    }}
  >
    Finalizar e voltar ao banco
  </button>
)}
      </section>
    );
  }

  return (
    <section className="pagina-vazia">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 20,
          flexWrap: "wrap",
          marginBottom: 20,
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Banco de questões</h2>

          <p className="texto-secundario">
            Pesquise, filtre e clique em uma questão para responder.
          </p>
        </div>

        <div
          style={{
            padding: "10px 16px",
            borderRadius: 10,
            background: "#eff6ff",
            color: "#1d4ed8",
            fontWeight: 700,
          }}
        >
          {filteredQuestions.length} encontradas
        </div>
      </div>

      <FilterBar
        search={search}
        setSearch={setSearch}
        materia={materia}
        setMateria={setMateria}
        materias={materias}
      />

      <label
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 9,
          margin: "8px 0 20px",
          padding: "10px 14px",
          border: "1px solid #dfe3eb",
          borderRadius: 10,
          background: "#ffffff",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <input
          type="checkbox"
          checked={somenteFavoritas}
          onChange={(event) =>
            setSomenteFavoritas(event.target.checked)
          }
        />

        <span>Mostrar somente favoritas</span>
      </label>

      <div
        style={{
          display: "grid",
          gap: 14,
        }}
      >
        {filteredQuestions.map((item, index) => {
          const favoritada = favoritos.includes(item.id);

          const corDificuldade =
            item.dificuldade === "Fácil"
              ? "#15803d"
              : item.dificuldade === "Média"
                ? "#b45309"
                : "#b91c1c";

          const fundoDificuldade =
            item.dificuldade === "Fácil"
              ? "#dcfce7"
              : item.dificuldade === "Média"
                ? "#fef3c7"
                : "#fee2e2";

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setQuestaoAberta(item)}
              style={{
                width: "100%",
                padding: 20,
                border: "1px solid #dfe3eb",
                borderRadius: 14,
                background: "#ffffff",
                color: "#172033",
                textAlign: "left",
                cursor: "pointer",
                boxShadow: "0 3px 12px rgba(15, 23, 42, 0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 15,
                }}
              >
                <div>
                  <strong
                    style={{
                      color: "#2563eb",
                      fontSize: 14,
                    }}
                  >
                    Questão {index + 1} • {item.materia}
                  </strong>

                  <h3
                    style={{
                      margin: "10px 0",
                      fontSize: 18,
                      lineHeight: 1.5,
                    }}
                  >
                    {item.pergunta}
                  </h3>
                </div>

                <span
                  title={
                    favoritada
                      ? "Questão favorita"
                      : "Questão não favoritada"
                  }
                  style={{
                    fontSize: 24,
                    color: favoritada ? "#eab308" : "#94a3b8",
                  }}
                >
                  {favoritada ? "★" : "☆"}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  flexWrap: "wrap",
                  marginTop: 12,
                }}
              >
                <span
                  style={{
                    padding: "6px 9px",
                    borderRadius: 8,
                    background: "#f1f5f9",
                    color: "#475569",
                    fontSize: 13,
                  }}
                >
                  {item.assunto}
                </span>

                <span
                  style={{
                    padding: "6px 9px",
                    borderRadius: 8,
                    background: "#f1f5f9",
                    color: "#475569",
                    fontSize: 13,
                  }}
                >
                  {item.banca}
                </span>

                <span
                  style={{
                    padding: "6px 9px",
                    borderRadius: 8,
                    background: fundoDificuldade,
                    color: corDificuldade,
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {item.dificuldade}
                </span>

                <span
                  style={{
                    marginLeft: "auto",
                    color: "#2563eb",
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  Responder →
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {filteredQuestions.length === 0 && (
        <div
          style={{
            marginTop: 20,
            padding: 30,
            border: "1px dashed #cbd5e1",
            borderRadius: 14,
            textAlign: "center",
            color: "#64748b",
          }}
        >
          Nenhuma questão encontrada com esses filtros.
        </div>
      )}
    </section>
  );
}