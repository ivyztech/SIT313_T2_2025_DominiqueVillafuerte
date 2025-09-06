import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPw] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // go home after login
    } catch {
      setErr("Invalid email or password.");
    }
  }

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="auth-card">
        <label>Your email</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <label>Your password</label>
        <input type="password" value={password} onChange={(e)=>setPw(e.target.value)} required />
        {err && <p className="error">{err}</p>}
        <button className="btn-primary">Login</button>
      </form>
      <p className="muted">No account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}
