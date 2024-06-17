import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      let loginDetails = await login(
        emailRef.current.value,
        passwordRef.current.value
      );

      localStorage.setItem(
        "firebase_token",
        loginDetails._tokenResponse.idToken
      );

      navigate("/");
    } catch {
      setError("Failed to sign in");
    }

    setLoading(false);
  }

  return (
    <div>
      <h2>Sign In</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="email" ref={emailRef} required placeholder="Email" />
        <input
          type="password"
          ref={passwordRef}
          required
          placeholder="Password"
        />
        <button disabled={loading} type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
