import { localDay } from "../utils/date";
import { readJSON } from "../utils/cloud";
import { questions } from "../data/questions";
import { obterProgressoQuestao } from "../utils/progress";
import { getMateriaStats } from "../utils/statistics";

export default function Estatisticas() {
  const materias = getMateriaStats();
  let acertos = 0,
    erros = 0,
    respondidas = 0;
  questions.forEach((q) => {
    const p = obterProgressoQuestao(q.id);
    if (!p) return;
    respondidas++;
    acertos += p.acertos;
    erros += p.erros;
  });
  const total = acertos + erros;
  const aproveitamento = total ? Math.round((acertos / total) * 100) : 0;
  const ranking = Object.entries(materias).sort(
    (a, b) =>
      b[1].acertos / Math.max(1, b[1].acertos + b[1].erros) -
      a[1].acertos / Math.max(1, a[1].acertos + a[1].erros),
  );

  const events = readJSON<{ date: string; correct: boolean }[]>(
    "pcmg-events",
    [],
  );
  const week = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 6 + i);
    return {
      date,
      items: events.filter((e) => e.date.slice(0, 10) === localDay(date)),
    };
  });
  return (
    <section className="stats-page">
      <div className="section-heading">
        <span className="pcmg-kicker">DESEMPENHO PCMG</span>
        <h2>Estatísticas de estudo</h2>
        <p>
          Acompanhe seus resultados e descubra quais matérias precisam de mais
          atenção.
        </p>
      </div>
      <div className="stats-summary">
        <article className="stat-card">
          <small>Questões distintas</small>
          <strong>{respondidas}</strong>
        </article>
        <article className="stat-card">
          <small>Acertos</small>
          <strong>{acertos}</strong>
        </article>
        <article className="stat-card">
          <small>Erros</small>
          <strong>{erros}</strong>
        </article>
        <article className="stat-card">
          <small>Aproveitamento</small>
          <strong>{aproveitamento}%</strong>
        </article>
      </div>
      <h3>Últimos sete dias</h3>
      <div className="weekly-grid">
        {week.map((d) => (
          <article className="weekly-day" key={localDay(d.date)}>
            <small>
              {d.date.toLocaleDateString("pt-BR", {
                weekday: "short",
                day: "numeric",
              })}
            </small>
            <strong>{d.items.length}</strong>
            <small>{d.items.filter((e) => e.correct).length} acertos</small>
          </article>
        ))}
      </div>
      <p className="source-note">
        Histórico diário disponível a partir desta atualização. Acertos e erros
        contam todas as tentativas.
      </p>
      {ranking.length > 0 ? (
        <div className="stats-list">
          <h3>Desempenho por matéria</h3>
          {ranking.map(([nome, d]) => {
            const pct = Math.round(
              (d.acertos / Math.max(1, d.acertos + d.erros)) * 100,
            );
            return (
              <article className="subject-stat" key={nome}>
                <div>
                  <strong>{nome}</strong>
                  <small>
                    {d.acertos} acertos • {d.erros} erros
                  </small>
                </div>
                <div className="subject-score">
                  <strong>{pct}%</strong>
                  <small>
                    {pct < 60
                      ? "Prioridade de revisão"
                      : pct < 80
                        ? "Continuar treinando"
                        : "Bom desempenho"}
                  </small>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty-pcmg">
          <strong>Suas estatísticas aparecerão aqui.</strong>
          <span>Responda questões ou faça um simulado para começar.</span>
        </div>
      )}
    </section>
  );
}
