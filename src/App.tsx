import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import "./premium.css";
import Login from "./pages/Login";
import ProfessorVirtual from "./components/ProfessorVirtual";
import { localDay } from "./utils/date";
import { questions } from "./data/questions";
import { obterProgresso } from "./utils/progress";
import { logoutCloud, notifyChange, readJSON, startCloud } from "./utils/cloud";
const Estudar = lazy(() => import("./pages/Estudar"));
const Questoes = lazy(() => import("./pages/Questoes"));
const Simulados = lazy(() => import("./pages/Simulados"));
const Estatisticas = lazy(() => import("./pages/Estatisticas"));
const Revisao = lazy(() => import("./pages/Revisao"));
const Configuracoes = lazy(() => import("./pages/Configuracoes"));
type MenuItem =
  | "Painel"
  | "Estudar"
  | "Questões"
  | "Simulados"
  | "Estatísticas"
  | "Revisão"
  | "Configurações";
const icons = ["◈", "▤", "▧", "◷", "▥", "↻", "⚙"];
export default function App() {
  const [pagina, setPagina] = useState<MenuItem>("Painel");
  const [logged, setLogged] = useState(
    localStorage.getItem("pcmg-guest") === "true",
  );
  const [loading, setLoading] = useState(true);
  const [sync, setSync] = useState("Progresso neste navegador");
  const [version, setVersion] = useState(0);
  const [theme, setTheme] = useState(
    localStorage.getItem("pcmg-theme") ?? "dark",
  );
  const [mobile, setMobile] = useState(false);
  async function authenticate() {
    try {
      const cloud = await startCloud();
      if (cloud) {
        setLogged(true);
        setSync("Sincronizado na nuvem");
        setTheme(localStorage.getItem("pcmg-theme") ?? "dark");
      } else setLogged(localStorage.getItem("pcmg-guest") === "true");
    } catch {
      setSync("Conexão indisponível. Tente entrar novamente.");
      setLogged(false);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    startCloud()
      .then((cloud) => {
        setLogged(cloud || localStorage.getItem("pcmg-guest") === "true");
        if (cloud) {
          setSync("Sincronizado na nuvem");
          setTheme(localStorage.getItem("pcmg-theme") ?? "dark");
        }
      })
      .catch(() => {
        setLogged(false);
        setSync("Conexão indisponível. Tente entrar novamente.");
      })
      .finally(() => setLoading(false));
    const update = () => setVersion((v) => v + 1);
    const status = (e: Event) => setSync((e as CustomEvent<string>).detail);
    window.addEventListener("pcmg-change", update);
    window.addEventListener("pcmg-sync", status);
    return () => {
      window.removeEventListener("pcmg-change", update);
      window.removeEventListener("pcmg-sync", status);
    };
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("pcmg-theme", theme);
  }, [theme]);
  void version;
  if (loading)
    return (
      <div className="loading-screen">Preparando seu ambiente de estudos…</div>
    );
  if (!logged)
    return (
      <Login
        onLogin={() => {
          setLoading(true);
          void authenticate();
        }}
      />
    );
  const menu: MenuItem[] = [
    "Painel",
    "Estudar",
    "Questões",
    "Simulados",
    "Estatísticas",
    "Revisão",
    "Configurações",
  ];
  const progresso = obterProgresso();
  const favoritos = readJSON<number[]>("pcmg-favorites", []);
  const erros = readJSON<number[]>("pcmg-erros", []);
  const events = readJSON<{ date: string }[]>("pcmg-events", []);
  const today = events.filter((e) => e.date.slice(0, 10) === localDay()).length;
  const total = Object.values(progresso).reduce((a, p) => a + p.tentativas, 0);
  const acertos = Object.values(progresso).reduce((a, p) => a + p.acertos, 0);
  const pct = total ? Math.round((acertos / total) * 100) : 0;
  const meta = Number(localStorage.getItem("pcmg-daily-goal") ?? 20);
  const nome = localStorage.getItem("pcmg-user-name") ?? "Aluno";
  const cargo = localStorage.getItem("pcmg-cargo") ?? "Investigador";
  const goto = (item: MenuItem) => {
    setPagina(item);
    setMobile(false);
    window.scrollTo(0, 0);
  };
  return (
    <div className="app">
      <aside className={`sidebar ${mobile ? "mobile-open" : ""}`}>
        <div className="logo">
          <span className="logo-icon">PC</span>
          <div>
            <strong>
              PCMG<span className="gold"> MASTER</span>
            </strong>
            <small>PREPARAÇÃO COM DIREÇÃO</small>
          </div>
        </div>
        <span className="nav-label">SEU AMBIENTE DE ESTUDO</span>
        <nav className="menu">
          {menu.map((item, i) => (
            <button
              key={item}
              className={pagina === item ? "menu-item ativo" : "menu-item"}
              onClick={() => goto(item)}
            >
              <span>{icons[i]}</span>
              {item}
              {item === "Revisão" && erros.length > 0 && (
                <b className="nav-count">{erros.length}</b>
              )}
            </button>
          ))}
        </nav>
        <div className="sidebar-target">
          <small>SEU DESTINO</small>
          <strong>Polícia Civil • MG</strong>
          <span>{cargo}</span>
        </div>
        <div className="perfil">
          <div className="avatar">{nome.slice(0, 2).toUpperCase()}</div>
          <div>
            <strong>{nome}</strong>
            <small>
              {localStorage.getItem("pcmg-guest") === "true"
                ? "Modo local"
                : "Conta pessoal"}
            </small>
          </div>
          <button
            aria-label="Sair da conta"
            title="Sair"
            onClick={async () => {
              try {
                await logoutCloud();
                setLogged(false);
              } catch {
                setSync(
                  "Falha ao salvar. Tente sair novamente quando conectado.",
                );
              }
            }}
          >
            ↗
          </button>
        </div>
      </aside>
      <main className="conteudo">
        <header className="topo">
          <div className="topo-left">
            <button
              className="mobile-toggle"
              aria-label="Abrir menu"
              onClick={() => setMobile(!mobile)}
            >
              ☰
            </button>
            <div>
              <p className="saudacao">Sua preparação, um passo adiante</p>
              <h1>{pagina === "Painel" ? "Visão geral" : pagina}</h1>
            </div>
          </div>
          <div className="topo-right">
            <small className="sync-status">● {sync}</small>
            <button
              aria-label="Alternar tema"
              className="modo"
              onClick={() => {
                const next = theme === "dark" ? "light" : "dark";
                setTheme(next);
                localStorage.setItem("pcmg-theme", next);
                notifyChange();
              }}
            >
              {theme === "dark" ? "☀" : "☾"}
            </button>
          </div>
        </header>
        {pagina === "Painel" && (
          <>
            <section className="premium-hero">
              <div>
                <span className="pcmg-kicker">
                  INVESTIGADOR & ESCRIVÃO / MINAS GERAIS
                </span>
                <h2>
                  Seu futuro começa
                  <br />
                  com o próximo <em>passo.</em>
                </h2>
                <p>
                  Transforme cada sessão em avanço. Estude com foco, pratique e
                  revise o que realmente precisa.
                </p>
                <div className="dashboard-actions">
                  <button
                    className="botao-principal"
                    onClick={() => goto("Estudar")}
                  >
                    Continuar estudando <span>→</span>
                  </button>
                  <button
                    className="botao-secundario"
                    onClick={() => goto("Simulados")}
                  >
                    Fazer um simulado
                  </button>
                </div>
              </div>
              <div className="hero-seal">
                <span>PREPARAÇÃO</span>
                <strong>
                  PC<span>MG</span>
                </strong>
                <small>FOCO · MÉTODO · CONSTÂNCIA</small>
              </div>
            </section>
            <section className="cards">
              <article className="card">
                <span>◈ Aproveitamento</span>
                <strong>
                  {pct}
                  <small>%</small>
                </strong>
                <small>{total} respostas registradas</small>
              </article>
              <article className="card">
                <span>▧ Banco de questões</span>
                <strong>{questions.length}</strong>
                <small>Treino autoral e adaptado</small>
              </article>
              <article className="card">
                <span>↻ Revisão pendente</span>
                <strong>{erros.length}</strong>
                <small>Questões no caderno de erros</small>
              </article>
              <article className="card">
                <span>☆ Favoritas</span>
                <strong>{favoritos.length}</strong>
                <small>Seu acervo de revisão</small>
              </article>
            </section>
            <div className="dashboard-grid">
              <article className="painel daily-panel">
                <div className="panel-heading">
                  <div>
                    <span className="pcmg-kicker">CONSTÂNCIA QUE CONTA</span>
                    <h3>Sua meta de hoje</h3>
                  </div>
                  <span className="goal-fraction">
                    {today}
                    <small>/{meta}</small>
                  </span>
                </div>
                <div className="progress-track">
                  <i
                    style={{ width: `${Math.min(100, (today / meta) * 100)}%` }}
                  />
                </div>
                <p>
                  {today >= meta
                    ? "Meta atingida. Hora de revisar e consolidar."
                    : `Faltam ${Math.max(0, meta - today)} respostas para completar sua meta.`}
                </p>
                <button
                  className="botao-secundario"
                  onClick={() => goto("Questões")}
                >
                  Iniciar treino →
                </button>
              </article>
              <article className="painel">
                <span className="pcmg-kicker">UM MÉTODO SIMPLES</span>
                <h3>O ciclo da sua aprovação</h3>
                <div className="study-cycle">
                  <span>
                    <b>01</b> Estude a teoria
                  </span>
                  <span>
                    <b>02</b> Conecte no mapa
                  </span>
                  <span>
                    <b>03</b> Resolva questões
                  </span>
                  <span>
                    <b>04</b> Revise seus erros
                  </span>
                </div>
              </article>
            </div>
            <section className="dashboard-shortcuts">
              <button
                className="painel shortcut-card"
                onClick={() => goto("Estudar")}
              >
                <span>▤</span>
                <div>
                  <small>CONSTRUA SUA BASE</small>
                  <h3>Central de estudos</h3>
                  <p>Roteiros, mapas, anotações e flashcards.</p>
                </div>
                <b>Explorar →</b>
              </button>
              <button
                className="painel shortcut-card"
                onClick={() => goto("Simulados")}
              >
                <span>◷</span>
                <div>
                  <small>PRATIQUE COM FOCO</small>
                  <h3>Simulados comentados</h3>
                  <p>Treino por matéria e modo cronometrado.</p>
                </div>
                <b>Começar →</b>
              </button>
              <button
                className="painel shortcut-card"
                onClick={() => goto("Revisão")}
              >
                <span>↻</span>
                <div>
                  <small>CONSOLIDE O QUE APRENDEU</small>
                  <h3>Revisão inteligente</h3>
                  <p>Refaça seus erros e acompanhe a evolução.</p>
                </div>
                <b>Revisar →</b>
              </button>
            </section>
            <ProfessorVirtual percentual={pct} />
          </>
        )}
        <Suspense fallback={<p>Carregando seu ambiente…</p>}>
          {pagina === "Estudar" && <Estudar />}
          {pagina === "Questões" && <Questoes />}
          {pagina === "Simulados" && <Simulados />}
          {pagina === "Estatísticas" && <Estatisticas />}
          {pagina === "Revisão" && <Revisao />}
          {pagina === "Configurações" && <Configuracoes />}
        </Suspense>
        <footer className="app-footer">
          PCMG Master • Plataforma independente de preparação • Investigador e
          Escrivão
        </footer>
      </main>
    </div>
  );
}
