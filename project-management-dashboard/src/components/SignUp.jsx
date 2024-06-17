import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const selectedRole = event.target.value;
    localStorage.setItem("Role", selectedRole);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/signin");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <select onChange={handleChange}>
          <option value="" selected>Select Role</option>
          <option value="project-manager">Project Manager</option>
          <option value="employee">Employee</option>
        </select>
        <input type="email" ref={emailRef} required placeholder="Email" />
        <input
          type="password"
          ref={passwordRef}
          required
          placeholder="Password"
        />
        <input
          type="password"
          ref={passwordConfirmRef}
          required
          placeholder="Confirm Password"
        />
        <button disabled={loading} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
