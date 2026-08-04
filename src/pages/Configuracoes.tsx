import { useEffect, useState } from "react";

const cardStyle = {
  background: "rgba(15, 23, 42, 0.82)",
  border: "1px solid rgba(148, 163, 184, 0.18)",
  borderRadius: 16,
  padding: 22,
  color: "#f8fafc",
  boxShadow: "0 14px 32px rgba(0, 0, 0, 0.20)",
} as const;

const inputStyle = {
  width: "100%",
  marginTop: 8,
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid rgba(148, 163, 184, 0.24)",
  background: "rgba(2, 6, 23, 0.55)",
  color: "#f8fafc",
  outline: "none",
} as const;

export default function Configuracoes() {
  const [nome, setNome] = useState(
    localStorage.getItem("ibgp-user-name") ?? "Charles",
  );
  const [concurso, setConcurso] = useState(
    localStorage.getItem("ibgp-target") ?? "GCM Brumadinho",
  );
  const [metaDiaria, setMetaDiaria] = useState(
    Number(localStorage.getItem("ibgp-daily-goal") ?? "20"),
  );
  const [salvo, setSalvo] = useState(false);

  useEffect(() => {
    if (!salvo) return;
    const timer = window.setTimeout(() => setSalvo(false), 2500);
    return () => window.clearTimeout(timer);
  }, [salvo]);

  function salvarConfiguracoes() {
    localStorage.setItem("ibgp-user-name", nome.trim() || "Charles");
    localStorage.setItem("ibgp-target", concurso.trim() || "GCM Brumadinho");
    localStorage.setItem(
      "ibgp-daily-goal",
      String(Math.max(1, Math.min(metaDiaria, 200))),
    );
    setSalvo(true);
  }

  function limparFavoritos() {
    const confirmar = window.confirm(
      "Deseja realmente apagar todas as questões favoritas?",
    );
    if (!confirmar) return;

    localStorage.removeItem("ibgp-favorites");
    window.alert("Favoritos apagados.");
  }

  function limparTodoProgresso() {
    const confirmar = window.confirm(
      "Isso apagará progresso, estatísticas, favoritos e configurações do IBGP Master. Deseja continuar?",
    );
    if (!confirmar) return;

    Object.keys(localStorage)
      .filter((chave) => chave.startsWith("ibgp-"))
      .forEach((chave) => localStorage.removeItem(chave));

    window.alert("Dados do IBGP Master apagados.");
    window.location.reload();
  }

  return (
    <section className="pagina-vazia">
      <div style={{ marginBottom: 26 }}>
        <h2 style={{ margin: 0, color: "#ffffff" }}>⚙️ Configurações</h2>
        <p style={{ marginTop: 8, color: "#aebbd0" }}>
          Personalize seu perfil, sua meta de estudos e os dados da plataforma.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 18,
        }}
      >
        <article style={cardStyle}>
          <h3 style={{ marginTop: 0, color: "#ffffff" }}>👤 Perfil</h3>

          <label style={{ display: "block", color: "#cbd5e1" }}>
            Nome
            <input
              type="text"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              style={inputStyle}
            />
          </label>

          <label style={{ display: "block", marginTop: 16, color: "#cbd5e1" }}>
            Concurso-alvo
            <input
              type="text"
              value={concurso}
              onChange={(event) => setConcurso(event.target.value)}
              style={inputStyle}
            />
          </label>
        </article>

        <article style={cardStyle}>
          <h3 style={{ marginTop: 0, color: "#ffffff" }}>🎯 Meta diária</h3>

          <p style={{ color: "#aebbd0", lineHeight: 1.6 }}>
            Defina quantas questões pretende responder por dia.
          </p>

          <label style={{ display: "block", color: "#cbd5e1" }}>
            Quantidade de questões
            <input
              type="number"
              min={1}
              max={200}
              value={metaDiaria}
              onChange={(event) => setMetaDiaria(Number(event.target.value))}
              style={inputStyle}
            />
          </label>

          <small style={{ display: "block", marginTop: 10, color: "#94a3b8" }}>
            Sugestão inicial: 20 questões por dia.
          </small>
        </article>

        <article style={cardStyle}>
          <h3 style={{ marginTop: 0, color: "#ffffff" }}>🎨 Aparência</h3>

          <div
            style={{
              marginTop: 16,
              padding: 16,
              borderRadius: 12,
              border: "1px solid rgba(124, 58, 237, 0.35)",
              background: "rgba(124, 58, 237, 0.12)",
            }}
          >
            <strong style={{ display: "block", color: "#c4b5fd" }}>
              Tema escuro ativo
            </strong>
            <small style={{ display: "block", marginTop: 6, color: "#aebbd0" }}>
              Tema otimizado para leitura e apresentação.
            </small>
          </div>
        </article>

        <article style={cardStyle}>
          <h3 style={{ marginTop: 0, color: "#ffffff" }}>🗂️ Dados e progresso</h3>

          <p style={{ color: "#aebbd0", lineHeight: 1.6 }}>
            Use estas opções com cuidado. As exclusões não podem ser desfeitas.
          </p>

          <button
            type="button"
            onClick={limparFavoritos}
            style={{
              width: "100%",
              padding: "12px 16px",
              border: "1px solid rgba(245, 158, 11, 0.45)",
              borderRadius: 10,
              background: "rgba(245, 158, 11, 0.12)",
              color: "#fcd34d",
              fontWeight: 700,
            }}
          >
            Limpar favoritas
          </button>

          <button
            type="button"
            onClick={limparTodoProgresso}
            style={{
              width: "100%",
              marginTop: 12,
              padding: "12px 16px",
              border: "1px solid rgba(239, 68, 68, 0.45)",
              borderRadius: 10,
              background: "rgba(239, 68, 68, 0.12)",
              color: "#fca5a5",
              fontWeight: 700,
            }}
          >
            Limpar todo o progresso
          </button>
        </article>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginTop: 22,
          flexWrap: "wrap",
        }}
      >
        <button
          type="button"
          onClick={salvarConfiguracoes}
          className="botao-secundario"
          style={{ marginTop: 0 }}
        >
          Salvar configurações
        </button>

        {salvo && (
          <span style={{ color: "#86efac", fontWeight: 700 }}>
            ✅ Configurações salvas
          </span>
        )}
      </div>

      <div
        style={{
          marginTop: 24,
          paddingTop: 18,
          borderTop: "1px solid rgba(148, 163, 184, 0.16)",
          color: "#94a3b8",
          fontSize: 13,
        }}
      >
        IBGP Master • GCM Brumadinho • Versão de apresentação
      </div>
    </section>
  );
}