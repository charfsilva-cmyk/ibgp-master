import { useMemo, useState } from "react";

type Cargo = "Investigador" | "Escrivão";
type Materia = { nome:string; icon:string; foco:string; topicos:string[]; resumo:string; lei:string };

const base: Materia[] = [
 {nome:"Língua Portuguesa",icon:"📘",foco:"Interpretação, gramática e redação oficial",topicos:["Compreensão e interpretação","Coesão e coerência","Semântica e figuras de linguagem","Pontuação","Sintaxe, concordância e regência","Redação oficial"],resumo:"Priorize interpretação e os efeitos de sentido. Em gramática, estude a regra aplicada ao texto, não apenas definições isoladas.",lei:"Manual de Redação Oficial e regras do padrão formal."},
 {nome:"Raciocínio Lógico-Matemático",icon:"🧮",foco:"Lógica e resolução de problemas",topicos:["Proposições","Conectivos e equivalências","Conjuntos","Porcentagem","Problemas lógico-matemáticos"],resumo:"Treine por questões: identifique a estrutura lógica antes de calcular.",lei:"Sem lei seca específica."},
 {nome:"Informática",icon:"💻",foco:"Tecnologia, internet e segurança",topicos:["Sistemas e arquivos","Internet e navegadores","Segurança da informação","Ferramentas de produtividade"],resumo:"Associe conceitos a situações práticas e atenção à terminologia usada pela banca.",lei:"Sem lei seca específica."},
 {nome:"Direito Constitucional",icon:"⚖️",foco:"Constituição e segurança pública",topicos:["Direitos e garantias fundamentais","Administração Pública","Segurança Pública","Organização do Estado"],resumo:"Leia a Constituição junto com questões. Marque competências, direitos e exceções.",lei:"Constituição Federal: especialmente arts. 5º, 37 e 144."},
 {nome:"Direito Administrativo",icon:"🏛️",foco:"Administração pública e agentes",topicos:["Princípios","Atos administrativos","Poderes administrativos","Agentes públicos","Responsabilidade do Estado"],resumo:"Compare conceitos semelhantes e memorize requisitos, atributos e exceções.",lei:"Constituição e legislação administrativa indicada no edital."},
 {nome:"Direito Penal",icon:"📕",foco:"Teoria do crime e crimes em espécie",topicos:["Aplicação da lei penal","Teoria do crime","Ilicitude e culpabilidade","Concurso de pessoas","Crimes contra a pessoa","Crimes contra o patrimônio","Crimes contra a Administração"],resumo:"Monte quadros comparativos de elementos do crime, consumação, tentativa e causas de aumento.",lei:"Código Penal e legislação penal especial prevista no edital."},
 {nome:"Direito Processual Penal",icon:"🔎",foco:"Investigação e persecução penal",topicos:["Inquérito policial","Ação penal","Provas","Prisão e liberdade","Procedimentos"],resumo:"Dê atenção especial ao inquérito policial: características, diligências, prazos e valor probatório.",lei:"Código de Processo Penal."},
 {nome:"Legislação PCMG",icon:"🛡️",foco:"Organização e carreira policial civil",topicos:["Organização institucional","Carreiras policiais","Deveres e atribuições","Normas específicas da PCMG"],resumo:"Faça leitura literal e revisões curtas. Questões de legislação costumam explorar detalhes do texto normativo.",lei:"Lei Orgânica e normas da Polícia Civil de Minas Gerais indicadas no edital."},
 {nome:"Direitos Humanos",icon:"🌐",foco:"Direitos, garantias e proteção",topicos:["Teoria geral","Sistema internacional","Direitos fundamentais","Proteção contra abusos"],resumo:"Relacione os princípios de direitos humanos com a atuação estatal e policial.",lei:"Constituição e tratados previstos no programa."},
 {nome:"Criminologia",icon:"🧠",foco:"Crime, vítima e controle social",topicos:["Conceito e objeto","Escolas criminológicas","Teorias criminológicas","Vitimologia","Controle social"],resumo:"Crie uma linha do tempo das escolas e associe cada teoria aos seus conceitos centrais.",lei:"Disciplina predominantemente teórica."},
 {nome:"Medicina Legal",icon:"🧬",foco:"Perícia e fenômenos médico-legais",topicos:["Traumatologia","Tanatologia","Identificação","Sexologia forense","Perícias"],resumo:"Use mapas visuais para diferenciar lesões, fenômenos cadavéricos e métodos de identificação.",lei:"Estude em conjunto com as normas periciais previstas no edital."},
];

const escrivaoExtras: Materia[] = [
 {nome:"Arquivologia e Rotinas Cartorárias",icon:"🗂️",foco:"Organização documental e rotina do escrivão",topicos:["Documentos e arquivos","Classificação","Gestão documental","Rotinas cartorárias"],resumo:"Foque em organização, classificação e fluxo documental aplicado à atividade policial.",lei:"Conteúdo deve ser ajustado ao próximo edital de Escrivão."}
];

export default function Estudar(){
 const [cargo,setCargo]=useState<Cargo>("Investigador");
 const [materia,setMateria]=useState<Materia|null>(null);
 const [aba,setAba]=useState("Teoria");
 const materias=useMemo(()=>cargo==="Investigador"?base:[...base,...escrivaoExtras],[cargo]);

 if(materia) return <div className="estudo-page">
   <button className="voltar-estudo" onClick={()=>setMateria(null)}>← Voltar às matérias</button>
   <section className="materia-detalhe">
    <div className="detalhe-top"><span className="materia-icon">{materia.icon}</span><div><span className="pcmg-kicker">{cargo.toUpperCase()} • PCMG MASTER</span><h2>{materia.nome}</h2><p>{materia.foco}</p></div></div>
    <div className="study-tabs">{["Teoria","Resumo","Mapa mental","Lei seca","Questões","Revisão"].map(x=><button className={aba===x?"active":""} onClick={()=>setAba(x)} key={x}>{x}</button>)}</div>
    <div className="study-content">
      {aba==="Teoria" && <><h3>Roteiro de estudo</h3>{materia.topicos.map((t,i)=><div className="topico-linha" key={t}><b>{String(i+1).padStart(2,"0")}</b><span>{t}</span><small>Estudar → resumir → praticar</small></div>)}</>}
      {aba==="Resumo" && <><h3>Resumo estratégico</h3><p>{materia.resumo}</p><div className="dica-prova">💡 Ao terminar, faça questões sem consultar o material e anote os erros.</div></>}
      {aba==="Mapa mental" && <><h3>Mapa mental</h3><div className="mindmap"><strong>{materia.nome}</strong><div>{materia.topicos.map(t=><span key={t}>{t}</span>)}</div></div></>}
      {aba==="Lei seca" && <><h3>Leitura de lei seca</h3><p>{materia.lei}</p><div className="dica-prova">⚖️ Marque palavras de exceção, prazos, competências e requisitos.</div></>}
      {aba==="Questões" && <><h3>Treino por questões</h3><p>O próximo passo desta matéria será abrir diretamente o banco filtrado por <b>{materia.nome}</b>.</p><div className="dica-prova">📝 Base principal de Investigador: concurso PCMG Edital 04/2024, prova FGV aplicada em 26/01/2025.</div></>}
      {aba==="Revisão" && <><h3>Revisão ativa</h3><div className="review-plan"><span><b>24h</b> releia o resumo</span><span><b>7 dias</b> refaça questões erradas</span><span><b>30 dias</b> faça revisão geral</span></div></>}
    </div>
   </section>
 </div>;

 return <div className="estudo-page">
  <section className="estudo-hero"><div><span className="pcmg-kicker">CENTRAL DE ESTUDOS PCMG</span><h2>Preparação para Investigador e Escrivão</h2><p>Conteúdo organizado por matéria, com estudo ativo, mapas mentais, lei seca e revisão.</p></div><div className="cargo-switch"><button className={cargo==="Investigador"?"active":""} onClick={()=>setCargo("Investigador")}>Investigador</button><button className={cargo==="Escrivão"?"active":""} onClick={()=>setCargo("Escrivão")}>Escrivão</button></div></section>
  <section className="estudo-hoje"><div><span>🎯 O que estudar hoje</span><h3>Português + Direito Penal + Processo Penal</h3><p>Use um ciclo curto: teoria, mapa mental, questões e revisão dos erros.</p></div><div className="rotina"><strong>Plano sugerido</strong><span>30 min teoria</span><span>15 min mapa</span><span>20 questões</span><span>10 min revisão</span></div></section>
  <div className="estudo-title"><div><h2>Matérias — {cargo}</h2><p>Toque em uma matéria para abrir o ambiente completo de estudo.</p></div><span>{materias.length} matérias</span></div>
  <section className="materias-grid">{materias.map(m=><article className="materia-card" key={m.nome}><button className="materia-head" onClick={()=>{setMateria(m);setAba("Teoria")}}><span className="materia-icon">{m.icon}</span><span><strong>{m.nome}</strong><small>{m.foco}</small></span><b>›</b></button></article>)}</section>
  <section className="estudo-bottom"><article><span>❌</span><div><h3>Caderno de erros</h3><p>Reforce os assuntos com maior índice de erro.</p></div></article><article><span>🧠</span><div><h3>Mapas mentais</h3><p>Revise conceitos e leis de forma visual.</p></div></article><article><span>🎯</span><div><h3>Foco FGV</h3><p>Investigador usa como referência principal a prova PCMG 2025.</p></div></article></section>
 </div>
}