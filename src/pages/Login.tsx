import { useState } from "react";

type Props = {
  onLogin: () => void;
};

export default function Login({ onLogin }: Props) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  function entrar() {
    if (usuario === "admin" && senha === "123456") {
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
        background: "#0f172a",
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
        <h2>IBGP Master</h2>

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