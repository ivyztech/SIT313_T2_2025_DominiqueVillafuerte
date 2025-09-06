import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import { useAuth } from "./auth/AuthContext";

function Home() {
  const { logout, user } = useAuth();
  return (
    <div style={{ padding: 24 }}>
      <h2>Home</h2>
      <p>Welcome {user?.displayName || user?.email}!</p>
      <div style={{ display: "flex", gap: 12 }}>
        <button className="btn-primary" onClick={logout}>Sign out</button>
        <Link to="/login">Back to Login</Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute><Home /></ProtectedRoute>
      } />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}
