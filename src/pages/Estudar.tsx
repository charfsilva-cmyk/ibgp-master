import { useState } from "react";

const materias = [
  { nome: "Língua Portuguesa", icon: "📘", foco: "Interpretação, gramática e redação oficial" },
  { nome: "Raciocínio Lógico-Matemático", icon: "🧮", foco: "Lógica, conjuntos, porcentagem e problemas" },
  { nome: "Informática", icon: "💻", foco: "Segurança, internet, sistemas e ferramentas" },
  { nome: "Direito Constitucional", icon: "⚖️", foco: "Direitos fundamentais, segurança pública e Estado" },
  { nome: "Direito Administrativo", icon: "🏛️", foco: "Atos, poderes, agentes e administração pública" },
  { nome: "Direito Penal", icon: "📕", foco: "Teoria do crime, crimes em espécie e legislação" },
  { nome: "Direito Processual Penal", icon: "🔎", foco: "Inquérito, provas, prisão e procedimentos" },
  { nome: "Legislação PCMG", icon: "🛡️", foco: "Lei Orgânica, estatutos e normas institucionais" },
  { nome: "Direitos Humanos", icon: "🌐", foco: "Garantias, tratados e proteção da pessoa" },
  { nome: "Criminologia", icon: "🧠", foco: "Crime, vítima, controle social e teorias criminológicas" },
  { nome: "Medicina Legal", icon: "🧬", foco: "Perícias, lesões, morte e identificação" },
];

const recursos = ["📖 Teoria", "⚡ Resumo", "🧠 Mapa mental", "⚖️ Lei seca", "📝 Questões", "🔄 Revisão"];

export default function Estudar() {
  const [cargo, setCargo] = useState<"Investigador" | "Escrivão">("Investigador");
  const [aberta, setAberta] = useState<string | null>(null);

  return (
    <div className="estudo-page">
      <section className="estudo-hero">
        <div>
          <span className="pcmg-kicker">CENTRAL DE ESTUDOS PCMG</span>
          <h2>Preparação direcionada para a Polícia Civil de Minas Gerais</h2>
          <p>Estude por matéria, revise os pontos-chave e concentre o treino no perfil das provas da PCMG.</p>
        </div>
        <div className="cargo-switch">
          <button className={cargo === "Investigador" ? "active" : ""} onClick={() => setCargo("Investigador")}>Investigador</button>
          <button className={cargo === "Escrivão" ? "active" : ""} onClick={() => setCargo("Escrivão")}>Escrivão</button>
        </div>
      </section>

      <section className="estudo-hoje">
        <div><span>🎯 O que estudar hoje</span><h3>Direito Penal + Português</h3><p>Comece pela teoria, faça um resumo rápido e finalize com questões.</p></div>
        <div className="rotina"><strong>Plano sugerido</strong><span>30 min teoria</span><span>15 min mapa mental</span><span>20 questões</span><span>10 min revisão</span></div>
      </section>

      <div className="estudo-title"><div><h2>Matérias — {cargo}</h2><p>Abra uma matéria para acessar todas as ferramentas de estudo.</p></div><span>{materias.length} matérias</span></div>

      <section className="materias-grid">
        {materias.map((m) => (
          <article className={"materia-card " + (aberta === m.nome ? "open" : "")} key={m.nome}>
            <button className="materia-head" onClick={() => setAberta(aberta === m.nome ? null : m.nome)}>
              <span className="materia-icon">{m.icon}</span>
              <span><strong>{m.nome}</strong><small>{m.foco}</small></span>
              <b>{aberta === m.nome ? "−" : "+"}</b>
            </button>
            {aberta === m.nome && <div className="recursos-grid">{recursos.map((r) => <button key={r}>{r}<small>Em preparação</small></button>)}</div>}
          </article>
        ))}
      </section>

      <section className="estudo-bottom">
        <article><span>❌</span><div><h3>Caderno de erros</h3><p>Revise automaticamente os assuntos em que você mais erra.</p></div></article>
        <article><span>🧠</span><div><h3>Mapas mentais</h3><p>Conteúdo visual para memorizar leis, conceitos e procedimentos.</p></div></article>
        <article><span>🤖</span><div><h3>Professor Virtual</h3><p>Use as explicações do sistema para tirar dúvidas durante o estudo.</p></div></article>
      </section>
    </div>
  );
}