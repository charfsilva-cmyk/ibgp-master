import { useEffect, useState } from "react";
import { notifyChange, syncCloud } from "../utils/cloud";
type Cargo = "Investigador" | "Escrivão";
export default function Configuracoes() {
  const [nome, setNome] = useState(
    localStorage.getItem("pcmg-user-name") ??
      localStorage.getItem("ibgp-user-name") ??
      "Aluno",
  );
  const [cargo, setCargo] = useState<Cargo>(
    (localStorage.getItem("pcmg-cargo") as Cargo) ?? "Investigador",
  );
  const [meta, setMeta] = useState(
    Number(
      localStorage.getItem("pcmg-daily-goal") ??
        localStorage.getItem("ibgp-daily-goal") ??
        "20",
    ),
  );
  const [salvo, setSalvo] = useState(false);
  useEffect(() => {
    if (!salvo) return;
    const t = window.setTimeout(() => setSalvo(false), 2500);
    return () => clearTimeout(t);
  }, [salvo]);
  function salvar() {
    localStorage.setItem("pcmg-user-name", nome.trim() || "Aluno");
    localStorage.setItem("pcmg-cargo", cargo);
    localStorage.setItem(
      "pcmg-daily-goal",
      String(Math.max(1, Math.min(meta, 200))),
    );
    setSalvo(true);
    notifyChange();
  }
  function limparFavoritos() {
    if (window.confirm("Deseja apagar todas as questões favoritas?")) {
      localStorage.removeItem("pcmg-favorites");
      localStorage.removeItem("ibgp-favorites");
      notifyChange();
      alert("Favoritos apagados.");
    }
  }
  async function limparTudo() {
    if (
      !window.confirm(
        "Isso apagará seu progresso, caderno de erros, favoritos e preferências do PCMG Master. Deseja continuar?",
      )
    )
      return;
    Object.keys(localStorage)
      .filter((k) => k.startsWith("pcmg-") || k.startsWith("ibgp-"))
      .forEach((k) => localStorage.removeItem(k));
    notifyChange();
    try {
      await syncCloud();
      alert("Progresso apagado.");
      location.reload();
    } catch {
      alert(
        "Não foi possível sincronizar a exclusão. Tente novamente quando estiver conectado.",
      );
    }
  }
  return (
    <section className="settings-page">
      <div className="section-heading">
        <span className="pcmg-kicker">PREFERÊNCIAS</span>
        <h2>Configurações</h2>
        <p>Personalize seu perfil e sua rotina de preparação.</p>
      </div>
      <div className="settings-grid">
        <article className="settings-card">
          <h3>👤 Perfil de estudo</h3>
          <label>
            Nome
            <input value={nome} onChange={(e) => setNome(e.target.value)} />
          </label>
          <label>
            Cargo-alvo
            <select
              value={cargo}
              onChange={(e) => setCargo(e.target.value as Cargo)}
            >
              <option>Investigador</option>
              <option>Escrivão</option>
            </select>
          </label>
        </article>
        <article className="settings-card">
          <h3>🎯 Meta diária</h3>
          <p>Defina uma referência de questões para sua rotina.</p>
          <label>
            Questões por dia
            <input
              type="number"
              min={1}
              max={200}
              value={meta}
              onChange={(e) => setMeta(Number(e.target.value))}
            />
          </label>
          <small>Sugestão inicial: 20 questões por dia.</small>
        </article>
        <article className="settings-card">
          <h3>🎨 Aparência</h3>
          <div className="theme-status">
            <strong>Tema PCMG ativo</strong>
            <small>
              Grafite, dourado e contraste confortável. Use o botão de tema no
              topo.
            </small>
          </div>
        </article>
        <article className="settings-card">
          <h3>🗂️ Seu progresso</h3>
          <p>As exclusões abaixo não podem ser desfeitas.</p>
          <button className="warning-button" onClick={limparFavoritos}>
            Limpar favoritas
          </button>
          <button className="danger-button" onClick={limparTudo}>
            Limpar todo o progresso
          </button>
        </article>
      </div>
      <div className="settings-save">
        <button className="botao-principal" onClick={salvar}>
          Salvar configurações
        </button>
        {salvo && <span>✓ Configurações salvas</span>}
      </div>
      <footer className="settings-footer">
        PCMG Master • Preparação independente • Investigador e Escrivão
      </footer>
    </section>
  );
}
