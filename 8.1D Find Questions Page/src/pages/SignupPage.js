import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");

    if (password !== confirm) {
      setErr("Passwords do not match.");
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: `${firstName} ${lastName}` });
      await setDoc(doc(db, "users", cred.user.uid), {
        uid: cred.user.uid,
        firstName,
        lastName,
        email,
        createdAt: serverTimestamp(),
      });
      navigate("/login"); // redirect to login after register
    } catch (e) {
      setErr(e.message.replace("Firebase:", "").trim());
    }
  }

  return (
    <div className="auth-container">
      <h1>Create a DEV@Deakin Account</h1>
      <form onSubmit={handleSubmit} className="auth-card">
        <div className="grid2">
          <div>
            <label>Name*</label>
            <input value={firstName} onChange={(e)=>setFirst(e.target.value)} required />
          </div>
          <div>
            <label>Last name*</label>
            <input value={lastName} onChange={(e)=>setLast(e.target.value)} required />
          </div>
        </div>
        <label>Email*</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <label>Password*</label>
        <input type="password" value={password} onChange={(e)=>setPw(e.target.value)} required />
        <label>Confirm password*</label>
        <input type="password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} required />
        {err && <p className="error">{err}</p>}
        <button className="btn-primary">Create</button>
      </form>
      <p className="muted">Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
