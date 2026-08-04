type Props = {
  percentual: number;
};

export default function ProfessorVirtual({ percentual }: Props) {
  let titulo = "";
  let mensagem = "";

  if (percentual >= 90) {
    titulo = "🏆 Excelente!";
    mensagem =
      "Seu desempenho está excelente. Continue resolvendo simulados completos para manter o nível.";
  } else if (percentual >= 75) {
    titulo = "😊 Muito bom!";
    mensagem =
      "Você está evoluindo bem. Revise apenas as questões erradas antes de seguir.";
  } else if (percentual >= 60) {
    titulo = "📚 Atenção";
    mensagem =
      "Seu desempenho é bom, mas ainda há espaço para melhorar. Faça revisões frequentes.";
  } else if (percentual >= 40) {
    titulo = "⚠️ Precisa reforçar";
    mensagem =
      "Recomendamos voltar à teoria e resolver questões fáceis antes de avançar.";
  } else {
    titulo = "🚨 Hora de revisar";
    mensagem =
      "Seu aproveitamento ainda está baixo. Revise a teoria e pratique diariamente.";
  }

  return (
    <div
      style={{
        marginTop: 20,
        padding: 20,
        borderRadius: 14,
        background: "#eff6ff",
        border: "1px solid #bfdbfe",
      }}
    >
      <h3>{titulo}</h3>

      <p
        style={{
          marginTop: 10,
          lineHeight: 1.8,
        }}
      >
        {mensagem}
      </p>
    </div>
  );
}