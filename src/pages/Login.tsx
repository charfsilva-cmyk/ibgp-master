import { useState } from "react";
import { supabase } from "../utils/cloud";
export default function Login({ onLogin }: { onLogin: () => void }) {
  const [confirmation, setConfirmation] = useState("");
  const [awaiting, setAwaiting] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [cadastro, setCadastro] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function entrar(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const result = cadastro
        ? await supabase.auth.signUp({
            email,
            password: senha,
            options: { data: { display_name: nome } },
          })
        : await supabase.auth.signInWithPassword({ email, password: senha });
      if (result.error) {
        setMessage(result.error.message);
        return;
      }
      if (!result.data.session) {
        setAwaiting(true);
        setMessage(
          "Cadastro recebido. Confira seu e-mail para confirmar a conta e depois entre.",
        );
        return;
      }
      localStorage.removeItem("pcmg-guest");
      onLogin();
    } catch {
      setMessage(
        "Não foi possível conectar. Verifique a conexão e tente novamente.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function confirmar() {
    setBusy(true);
    try {
      const url = new URL(confirmation);
      const token =
        url.searchParams.get("token_hash") || url.searchParams.get("token");
      if (!token) {
        setMessage("Cole o link completo do e-mail de confirmação.");
        return;
      }
      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: "signup",
      });
      if (error) {
        setMessage(
          "Link inválido ou expirado. Tente entrar para verificar se a conta já foi confirmada.",
        );
        return;
      }
      localStorage.removeItem("pcmg-guest");
      onLogin();
    } catch {
      setMessage("Não foi possível confirmar. Confira o link e a conexão.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="login-pcmg">
      <section className="login-story">
        <span className="pcmg-kicker">SEU OBJETIVO. SEU MÉTODO.</span>
        <h1>
          Uma preparação
          <br />à altura da sua
          <br />
          <em>próxima conquista.</em>
        </h1>
        <p>Investigador e Escrivão • Polícia Civil de Minas Gerais</p>
        <div className="story-tags">
          <span>Estudo ativo</span>
          <span>Revisão inteligente</span>
          <span>Progresso individual</span>
        </div>
        <small>
          Plataforma independente de estudos. Sem vínculo institucional com a
          PCMG.
        </small>
      </section>
      <section className="login-card">
        <div className="login-brand">
          <span>PC</span>
          <div>
            <h2>PCMG Master</h2>
            <small>Preparação com direção</small>
          </div>
        </div>
        <h3>{cadastro ? "Comece sua preparação" : "Bom ter você de volta"}</h3>
        <p>
          {cadastro
            ? "Crie sua conta para guardar seu progresso."
            : "Entre para retomar seus estudos."}
        </p>
        <form onSubmit={entrar}>
          {cadastro && (
            <label>
              Nome
              <input
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                autoComplete="name"
              />
            </label>
          )}
          <label>
            E-mail
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              minLength={6}
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete={cadastro ? "new-password" : "current-password"}
            />
          </label>
          <button disabled={busy} className="botao-principal">
            {busy
              ? "Aguarde…"
              : cadastro
                ? "Criar conta"
                : "Entrar na minha conta"}
          </button>
        </form>
        {awaiting && (
          <div className="confirmation-help">
            <p>
              Se o link recebido abrir uma página indisponível, copie o link do
              e-mail e confirme aqui:
            </p>
            <input
              aria-label="Link de confirmação"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              placeholder="Cole o link de confirmação"
            />
            <button
              type="button"
              disabled={busy || !confirmation}
              onClick={() => {
                void confirmar();
              }}
            >
              Confirmar minha conta
            </button>
          </div>
        )}
        {message && (
          <p role="status" className="login-message">
            {message}
          </p>
        )}
        <button
          className="text-button"
          onClick={() => {
            setCadastro(!cadastro);
            setMessage("");
          }}
        >
          {cadastro ? "Já tenho uma conta" : "Criar minha conta"}
        </button>
        <div className="guest-access">
          <button
            onClick={() => {
              localStorage.setItem("pcmg-guest", "true");
              onLogin();
            }}
          >
            Experimentar sem conta →
          </button>
          <small>Modo local: os dados ficam somente neste navegador.</small>
        </div>
      </section>
    </div>
  );
}
