import professor from "../assets/professor/professor.png";
type Props = {
  percentual: number;
};

type FaixaDesempenho = {
  titulo: string;
  mensagem: string;
  cor: string;
  fundo: string;
  borda: string;
};

export default function ProfessorVirtual({ percentual }: Props) {
  let resultado: FaixaDesempenho;

  if (percentual >= 90) {
    resultado = {
      titulo: "🏆 Excelente!",
      mensagem:
        "Seu desempenho está excelente. Continue resolvendo simulados completos para manter o nível.",
      cor: "#166534",
      fundo: "#f0fdf4",
      borda: "#86efac",
    };
  } else if (percentual >= 75) {
    resultado = {
      titulo: "😊 Muito bom!",
      mensagem:
        "Você está evoluindo bem. Revise apenas as questões erradas antes de seguir.",
      cor: "#1d4ed8",
      fundo: "#eff6ff",
      borda: "#93c5fd",
    };
  } else if (percentual >= 60) {
    resultado = {
      titulo: "📚 Atenção",
      mensagem:
        "Seu desempenho é bom, mas ainda há espaço para melhorar. Faça revisões frequentes.",
      cor: "#a16207",
      fundo: "#fefce8",
      borda: "#fde047",
    };
  } else if (percentual >= 40) {
    resultado = {
      titulo: "⚠️ Precisa reforçar",
      mensagem:
        "Recomendamos voltar à teoria e resolver questões fáceis antes de avançar.",
      cor: "#c2410c",
      fundo: "#fff7ed",
      borda: "#fdba74",
    };
  } else {
    resultado = {
           titulo: "🎯 Comece seus estudos",
mensagem:
  "Você ainda não possui respostas registradas. Resolva algumas questões para receber uma análise do seu desempenho.",
      cor: "#b91c1c",
      fundo: "#fef2f2",
      borda: "#fca5a5",
    };
  }

  return (
    <div
      style={{
        marginTop: 20,
        padding: 24,
        borderRadius: 14,
        background: resultado.fundo,
        border: `2px solid ${resultado.borda}`,
        color: "#111827",
        boxShadow: "0 4px 14px rgba(15, 23, 42, 0.08)",
      }}
    ><div
  style={{
    display: "flex",
    alignItems: "center",
    gap: 18,
    marginBottom: 18,
  }}
>
  <img
    src={professor}
    alt="Professor Virtual"
    style={{
      width: 180,
height: 180,
objectFit: "contain",
background: "#0f172a",
     borderRadius: 24,
      border: "3px solid #6366f1",
      boxShadow: "0 8px 24px rgba(79, 70, 229, 0.25)",
    }}
  />

  <div>
    <strong
      style={{
        display: "block",
        fontSize: 24,
        color: "#1e1b4b",
      }}
    >
      🤖 Professor Virtual
    </strong>

    <span
      style={{
        display: "block",
        marginTop: 6,
        color: "#64748b",
        fontSize: 15,
      }}
    >
      Seu mentor de estudos
    </span>
  </div>
</div>
      <h3
        style={{
          margin: 0,
          color: resultado.cor,
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        {resultado.titulo}
      </h3>

      <p
        style={{
          marginTop: 12,
          marginBottom: 0,
          lineHeight: 1.7,
          color: "#374151",
          fontSize: 16,
          fontWeight: 500,
        }}
      >
        {resultado.mensagem}
      </p>

      <div
        style={{
          marginTop: 18,
          height: 8,
          borderRadius: 999,
          background: "#e5e7eb",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${Math.min(100, Math.max(0, percentual))}%`,
            height: "100%",
            borderRadius: 999,
            background: resultado.cor,
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <small
        style={{
          display: "block",
          marginTop: 8,
          color: "#475569",
          fontWeight: 600,
        }}
      >
        Aproveitamento atual: {percentual}%
      </small>
    </div>
  );
}