import { useState } from "react";

type Props = {
  onLogin: () => void;
};

export default function Login({ onLogin }: Props) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  function entrar() {
    if (usuario.trim().toLowerCase() === "admin" && senha.trim() === "123456") {
      localStorage.setItem("pcmg-login", "true");
      localStorage.setItem("ibgp-login", "true");
      onLogin();
    } else {
      alert("Usuário ou senha incorretos.");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #061426, #0b315d)",
      }}
    >
      <div
        style={{
          width: 380,
          background: "white",
          padding: 35,
          borderRadius: 18,
          boxShadow: "0 10px 40px rgba(0,0,0,.25)",
        }}
      >
        <h2>PCMG Master</h2>

        <p>Entre para continuar.</p>

        <input
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginTop: 20,
          }}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginTop: 12,
          }}
        />

        <div style={{marginTop:16,padding:12,borderRadius:10,background:"#f1f5f9",color:"#172033"}}><small>Usuário</small><strong style={{display:"block"}}>admin</strong><small>Senha</small><strong style={{display:"block"}}>123456</strong></div>

        <button
          onClick={entrar}
          style={{
            width: "100%",
            marginTop: 20,
            padding: 14,
            cursor: "pointer",
          }}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}