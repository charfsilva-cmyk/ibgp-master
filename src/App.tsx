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
        <section className="destaque"><div><span className="etiqueta">Treino recomendado</span><h2>Simulados PCMG para Investigador e Escrivão</h2><p>Treine por matéria, refaça seus erros ou use o modo prova.</p><button className="botao-principal" onClick={() => setPagina("Simulados")}>Abrir simulados</button></div><div className="progresso-circular"><strong>PCMG</strong><span>foco na prova</span></div></section>
        <section className="grade-inferior"><article className="painel"><h3>Central de Estudos</h3><p className="revisao-titulo">Teoria + resumo + mapa mental + lei seca</p><p className="texto-secundario">Organize o estudo por disciplina e faça revisões ativas.</p><button className="botao-secundario" onClick={() => setPagina("Estudar")}>Começar a estudar</button></article><article className="painel"><h3>Professor Virtual</h3><ProfessorVirtual percentual={0} /></article></section>
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