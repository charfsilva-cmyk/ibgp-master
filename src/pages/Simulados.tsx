import { useEffect, useMemo, useState } from "react";
import { questions } from "../data/questions";

type Cargo = "Investigador" | "Escrivão";
type Modo = "completo" | "materia" | "erros" | "prova";

export default function Simulados() {
  const [cargo, setCargo] = useState<Cargo>((localStorage.getItem("pcmg-cargo") as Cargo) ?? "Investigador");
  const [modo, setModo] = useState<Modo | null>(null);
  const [materia, setMateria] = useState("");
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState<Record<number, number>>({});
  const [finalizado, setFinalizado] = useState(false);
  const [segundos, setSegundos] = useState(4 * 60 * 60);

  const materias = useMemo(() => [...new Set(questions.map(q => q.materia))], []);
  const errosSalvos = JSON.parse(localStorage.getItem("pcmg-erros") ?? "[]") as number[];

  useEffect(() => {
    if (modo !== "prova" || finalizado) return;
    if (segundos <= 0) { finalizar(); return; }
    const timer = window.setInterval(() => setSegundos(s => s - 1), 1000);
    return () => window.clearInterval(timer);
  }, [modo, finalizado, segundos]);

  const relogio = `${String(Math.floor(segundos / 3600)).padStart(2,"0")}:${String(Math.floor((segundos % 3600) / 60)).padStart(2,"0")}:${String(segundos % 60).padStart(2,"0")}`;

  const lista = useMemo(() => {
    const doCargo = questions.filter(q => !q.cargo || q.cargo === "Ambos" || q.cargo === cargo);
    if (modo === "materia" && materia) return doCargo.filter(q => q.materia === materia);
    if (modo === "erros") return doCargo.filter(q => errosSalvos.includes(q.id));
    return doCargo;
  }, [modo, materia, cargo, errosSalvos.join(",")]);

  function iniciar(novoModo: Modo) {
    if (novoModo === "erros" && errosSalvos.length === 0) {
      alert("Seu caderno de erros ainda está vazio. Responda questões primeiro.");
      return;
    }
    setModo(novoModo); setIndice(0); setRespostas({}); setFinalizado(false); setSegundos(4 * 60 * 60);
  }

  function finalizar() {
    const respondidas = lista.filter(q => respostas[q.id] !== undefined);
    const erradas = respondidas.filter(q => respostas[q.id] !== q.correta).map(q => q.id);
    localStorage.setItem("pcmg-erros", JSON.stringify([...new Set([...errosSalvos, ...erradas])]));
    const acertosAgora = respondidas.filter(q => respostas[q.id] === q.correta).length;
    const historico = JSON.parse(localStorage.getItem("pcmg-simulado-history") ?? "[]");
    historico.unshift({data:new Date().toISOString(),cargo,modo,materia:modo==="materia"?materia:null,total:lista.length,respondidas:respondidas.length,acertos:acertosAgora});
    localStorage.setItem("pcmg-simulado-history",JSON.stringify(historico.slice(0,30)));
    setFinalizado(true);
  }

  if (!modo) return <div className="simulados-page">
    <section className="simulados-hero">
      <div><span className="pcmg-kicker">CENTRAL DE SIMULADOS</span><h2>Treine como no dia da prova</h2><p>Escolha o cargo e o formato do treino. Seu desempenho alimenta o caderno de erros.</p></div>
      <div className="cargo-switch"><button className={cargo === "Investigador" ? "active" : ""} onClick={() => setCargo("Investigador")}>Investigador</button><button className={cargo === "Escrivão" ? "active" : ""} onClick={() => setCargo("Escrivão")}>Escrivão</button></div>
    </section>
    <section className="simulados-grid">
      <button className="simulado-card" onClick={() => iniciar("completo")}><span>📋</span><div><small>TREINO GERAL</small><h3>Simulado Completo</h3><p>Questões de todas as matérias disponíveis no banco.</p></div><b>Iniciar →</b></button>
      <button className="simulado-card destaque-card" onClick={() => iniciar("prova")}><span>⏱️</span><div><small>MODO PROVA</small><h3>Modo Prova</h3><p>Treino cronometrado, sem mostrar respostas durante a execução.</p></div><b>Iniciar →</b></button>
      <div className="simulado-card materia-simulado"><span>📚</span><div><small>FOCO DIRECIONADO</small><h3>Por Matéria</h3><p>Escolha uma disciplina e treine somente aquele conteúdo.</p><select value={materia} onChange={e => setMateria(e.target.value)}><option value="">Selecione a matéria</option>{materias.map(m => <option key={m}>{m}</option>)}</select></div><button disabled={!materia} onClick={() => iniciar("materia")}>Iniciar →</button></div>
      <button className="simulado-card" onClick={() => iniciar("erros")}><span>🎯</span><div><small>REVISÃO INTELIGENTE</small><h3>Só Questões Erradas</h3><p>Refaça as questões registradas no seu caderno de erros.</p></div><b>{errosSalvos.length} salvas →</b></button>
    </section>
  </div>;

  if (lista.length === 0) return <div className="pagina-vazia"><button className="voltar-estudo" onClick={() => setModo(null)}>← Voltar</button><h2>Nenhuma questão disponível</h2></div>;

  const acertos = lista.filter(q => respostas[q.id] === q.correta).length;
  const atual = lista[indice];

  if (finalizado) return <section className="result-page"><div className="result-header"><span className="result-label">{cargo} • PCMG Master</span><h2>Simulado finalizado</h2><p>Resultado geral do seu treino.</p></div><div className="result-cards"><article><span>Acertos</span><strong>{acertos}/{lista.length}</strong></article><article><span>Erros</span><strong>{lista.length-acertos}</strong></article><article><span>Aproveitamento</span><strong>{Math.round(acertos/lista.length*100)}%</strong></article></div><div className="resultado-materias"><h3>Desempenho por matéria</h3>{[...new Set(lista.map(q=>q.materia))].map(m=>{const qs=lista.filter(q=>q.materia===m);const ok=qs.filter(q=>respostas[q.id]===q.correta).length;return <div key={m}><span>{m}</span><strong>{ok}/{qs.length} • {Math.round(ok/qs.length*100)}%</strong></div>})}</div><button className="botao-principal" onClick={() => setModo(null)}>Voltar aos simulados</button></section>;

  return <section className="simulado-execucao"><div className="simulado-bar"><button onClick={() => setModo(null)}>← Sair</button><div><strong>{modo === "prova" ? "Modo Prova • PCMG Master" : `Simulado • ${cargo}`}</strong><small>{Object.keys(respostas).length} de {lista.length} respondidas</small></div>{modo === "prova" && <span className="prova-timer">⏱ {relogio}</span>}<span>Questão {indice+1}/{lista.length}</span></div><article className="question-card"><span className="materia-badge">{atual.materia}</span><h2>{atual.pergunta}</h2><div className="alternativas">{atual.alternativas.map((op,i)=><button className={`option ${respostas[atual.id]===i?"selected":""}`} key={op} onClick={()=>setRespostas(r=>({...r,[atual.id]:i}))}><span>{String.fromCharCode(65+i)}</span><p>{op}</p></button>)}</div></article><div className="quiz-actions"><button className="navigation-button" disabled={indice===0} onClick={()=>setIndice(i=>i-1)}>Anterior</button>{indice<lista.length-1?<button className="next-button" onClick={()=>setIndice(i=>i+1)}>Próxima</button>:<button className="finish-button" onClick={()=>{const faltam=lista.length-Object.keys(respostas).length;if(faltam>0&&!window.confirm(`Ainda existem ${faltam} questão(ões) sem resposta. Deseja finalizar mesmo assim?`))return;finalizar();}}>Finalizar simulado</button>}</div></section>;
}