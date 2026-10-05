import { questions } from "../data/questions";
import { obterProgressoQuestao } from "../utils/progress";

export default function Revisao(){
  const idsSimulado=JSON.parse(localStorage.getItem("pcmg-erros")??"[]") as number[];
  const revisar=questions.filter(q=>{const p=obterProgressoQuestao(q.id);return (p&&p.erros>0)||idsSimulado.includes(q.id)});
  const porMateria=revisar.reduce<Record<string,number>>((a,q)=>{a[q.materia]=(a[q.materia]||0)+1;return a},{});

  return <section className="review-page">
    <div className="section-heading"><span className="pcmg-kicker">REVISÃO INTELIGENTE</span><h2>Caderno de Erros</h2><p>Reúne erros do banco de questões e dos simulados em um único lugar.</p></div>
    {revisar.length>0&&<div className="review-summary"><article><small>Total para revisar</small><strong>{revisar.length}</strong></article><article><small>Matérias envolvidas</small><strong>{Object.keys(porMateria).length}</strong></article><article><small>Prioridade</small><strong>{Object.entries(porMateria).sort((a,b)=>b[1]-a[1])[0]?.[0]??"—"}</strong></article></div>}
    {revisar.length===0?<div className="empty-pcmg"><strong>Caderno de erros vazio.</strong><span>Quando você errar uma questão, ela aparecerá aqui automaticamente.</span></div>:<div className="review-list">{revisar.map(q=>{const p=obterProgressoQuestao(q.id);return <article className="review-card" key={q.id}><div className="review-meta"><span>{q.materia}</span><small>{q.assunto}</small></div><h3>{q.pergunta}</h3><div className="review-footer"><span>Erros registrados: <b>{Math.max(p?.erros??0,idsSimulado.includes(q.id)?1:0)}</b></span><span className="review-tip">Revise a explicação e refaça no Simulado → Só Questões Erradas</span></div></article>})}</div>}
  </section>;
}