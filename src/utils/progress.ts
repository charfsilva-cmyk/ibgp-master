export type ProgressoQuestao={tentativas:number;acertos:number;erros:number;ultimaResposta:string};
export type ProgressoCompleto=Record<number,ProgressoQuestao>;
const CHAVE="pcmg-progresso";
const LEGADA="ibgp-progresso";

export function obterProgresso():ProgressoCompleto{
  const atual=localStorage.getItem(CHAVE);
  const legado=localStorage.getItem(LEGADA);
  const dados=atual??legado;
  if(!dados)return {};
  try{
    const parsed=JSON.parse(dados) as ProgressoCompleto;
    if(!atual&&legado)localStorage.setItem(CHAVE,JSON.stringify(parsed));
    return parsed;
  }catch{return {}}
}
export function obterProgressoQuestao(id:number):ProgressoQuestao|null{return obterProgresso()[id]??null}
export function salvarResposta(id:number,acertou:boolean):ProgressoQuestao{
  const progresso=obterProgresso();
  const p=progresso[id]??{tentativas:0,acertos:0,erros:0,ultimaResposta:""};
  const novo={tentativas:p.tentativas+1,acertos:p.acertos+(acertou?1:0),erros:p.erros+(acertou?0:1),ultimaResposta:new Date().toLocaleString("pt-BR")};
  progresso[id]=novo;localStorage.setItem(CHAVE,JSON.stringify(progresso));return novo;
}
export function limparProgresso(){localStorage.removeItem(CHAVE);localStorage.removeItem(LEGADA)}
