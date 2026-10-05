import professor from "../assets/professor/professor.png";
import { questions } from "../data/questions";
import { obterProgressoQuestao } from "../utils/progress";

type Props={percentual:number};

export default function ProfessorVirtual({percentual}:Props){
  const erros=questions.map(q=>({q,p:obterProgressoQuestao(q.id)})).filter(x=>x.p&&x.p.erros>0);
  const contagem=erros.reduce<Record<string,number>>((a,x)=>{a[x.q.materia]=(a[x.q.materia]||0)+(x.p?.erros||0);return a},{});
  const prioridade=Object.entries(contagem).sort((a,b)=>b[1]-a[1])[0]?.[0];
  const temHistorico=erros.length>0||percentual>0;
  const mensagem=!temHistorico
    ?"Comece resolvendo questões. Conforme seus resultados forem registrados, vou indicar automaticamente o que merece prioridade."
    :prioridade
      ?`Sua prioridade de revisão é ${prioridade}. Revise a teoria, confira seu caderno de erros e depois faça um novo bloco de questões.`
      :"Seu desempenho não aponta erros pendentes. Continue alternando teoria, questões e simulados.";

  return <section className="professor-pcmg">
    <div className="professor-head">
      <img src={professor} alt="Professor Virtual PCMG"/>
      <div><span className="pcmg-kicker">ASSISTENTE DE ESTUDOS</span><h3>Professor Virtual PCMG</h3><p>Orientação baseada no seu desempenho dentro da plataforma.</p></div>
    </div>
    <div className="professor-analysis"><small>ANÁLISE ATUAL</small><p>{mensagem}</p>{temHistorico&&<span>Aproveitamento registrado: <b>{percentual}%</b></span>}</div>
    <div className="professor-tools">
      <article><span>📖</span><div><strong>Explicar matéria</strong><small>Use a Central de Estudos para teoria, resumo e mapa mental.</small></div></article>
      <article><span>❌</span><div><strong>Revisar erros</strong><small>{erros.length} questão(ões) identificada(s) para reforço.</small></div></article>
      <article><span>🎯</span><div><strong>Treinar para a prova</strong><small>Faça blocos por matéria ou use o modo prova.</small></div></article>
    </div>
    <small className="professor-note">O Professor Virtual é um recurso de apoio da plataforma independente PCMG Master e não representa a Polícia Civil de Minas Gerais.</small>
  </section>;
}