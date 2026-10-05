import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Estudar from "./pages/Estudar";
import Questoes from "./pages/Questoes";
import Simulados from "./pages/Simulados";
import Estatisticas from "./pages/Estatisticas";
import Revisao from "./pages/Revisao";
import Configuracoes from "./pages/Configuracoes";
import ProfessorVirtual from "./components/ProfessorVirtual";
import { questions } from "./data/questions";

type MenuItem = "Painel" | "Estudar" | "Questões" | "Simulados" | "Estatísticas" | "Revisão" | "Configurações";

export default function App() {
  const [pagina, setPagina] = useState<MenuItem>("Painel");
  const [logged, setLogged] = useState(localStorage.getItem("ibgp-login") === "true");

  if (!logged) return <Login onLogin={() => setLogged(true)} />;

  const menu: MenuItem[] = ["Painel", "Estudar", "Questões", "Simulados", "Estatísticas", "Revisão", "Configurações"];
  const erros = JSON.parse(localStorage.getItem("pcmg-erros") ?? "[]") as number[];
  const favoritas = JSON.parse(localStorage.getItem("ibgp-favorites") ?? "[]") as number[];

  return <div className="app">
    <aside className="sidebar">
      <div className="logo"><span className="logo-icon">PC</span><div><strong>PCMG Master</strong><small>Preparação independente</small></div></div>
      <nav className="menu">{menu.map(item => <button key={item} className={pagina === item ? "menu-item ativo" : "menu-item"} onClick={() => setPagina(item)}>{item}</button>)}</nav>
      <div className="perfil"><div className="avatar">CS</div><div><strong>Charles</strong><small>Aluno</small></div></div>
    </aside>

    <main className="conteudo">
      <header className="topo"><div><p className="saudacao">Olá, Charles</p><h1>{pagina}</h1></div><button className="modo" type="button">☾</button></header>

      {pagina === "Painel" && <>
        <section className="cards">
          <article className="card"><span>📚 Banco PCMG</span><strong>{questions.length}</strong><small>Questões disponíveis</small></article>
          <article className="card"><span>⭐ Favoritas</span><strong>{favoritas.length}</strong><small>Questões salvas</small></article>
          <article className="card"><span>🎯 Caderno de erros</span><strong>{erros.length}</strong><small>Questões para revisar</small></article>
          <article className="card"><span>🤖 Professor Virtual</span><strong>Online</strong><small>Assistente de preparação</small></article>
        </section>
        <section className="destaque dashboard-hero"><div><span className="etiqueta">CONTINUAR ESTUDANDO</span><h2>Seu próximo bloco de preparação PCMG</h2><p>Português • Direito Penal • Processo Penal. Revise a teoria e finalize com questões.</p><div className="dashboard-actions"><button className="botao-principal" onClick={() => setPagina("Estudar")}>Continuar estudando</button><button className="botao-secundario" onClick={() => setPagina("Simulados")}>Simulado FGV</button></div></div><div className="pcmg-focus"><strong>PCMG</strong><span>Investigador • Escrivão</span><small>Preparação independente</small></div></section>
        <section className="dashboard-shortcuts">
          <button className="painel shortcut-card" onClick={() => setPagina("Estudar")}><span>📖</span><div><small>ESTUDO RECOMENDADO</small><h3>Direito Processual Penal</h3><p>Inquérito, provas e prisão em flagrante.</p></div><b>Estudar →</b></button>
          <button className="painel shortcut-card" onClick={() => setPagina("Questões")}><span>📝</span><div><small>TREINO RÁPIDO</small><h3>Banco de Questões</h3><p>Pratique por matéria, banca e dificuldade.</p></div><b>Resolver →</b></button>
          <button className="painel shortcut-card" onClick={() => setPagina("Revisão")}><span>🎯</span><div><small>REVISÃO PRIORITÁRIA</small><h3>Caderno de Erros</h3><p>{erros.length ? `${erros.length} questão(ões) aguardando revisão.` : "Nenhuma questão pendente no momento."}</p></div><b>Revisar →</b></button>
        </section>
        <section className="grade-inferior"><article className="painel"><span className="etiqueta">CICLO DE HOJE</span><h3>Plano rápido de estudo</h3><div className="study-cycle"><span><b>1</b> 30 min de teoria</span><span><b>2</b> 15 min de mapa mental</span><span><b>3</b> 20 questões</span><span><b>4</b> Revisão dos erros</span></div><button className="botao-secundario" onClick={() => setPagina("Estudar")}>Abrir Central de Estudos</button></article><article className="painel"><h3>Professor Virtual</h3><p className="texto-secundario">Tire dúvidas sobre as matérias e organize sua preparação.</p><ProfessorVirtual percentual={0} /></article></section>
      </>}
      {pagina === "Estudar" && <Estudar />}
      {pagina === "Questões" && <Questoes />}
      {pagina === "Simulados" && <Simulados />}
      {pagina === "Estatísticas" && <Estatisticas />}
      {pagina === "Revisão" && <Revisao />}
      {pagina === "Configurações" && <Configuracoes />}
    </main>
  </div>;
}