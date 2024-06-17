import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
// import { data } from "../../data/data";

function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let prevData = localStorage.getItem("data") || [];
  let data = [];
  console.log("prevData", prevData);

  const handleChange = (event) => {
    const selectedRole = event.target.value;
    setRole(selectedRole);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);

      let registrationDetails = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );

      let userData = {
        email: registrationDetails._tokenResponse.email,
        token: registrationDetails._tokenResponse.idToken,
        role: role,
      };

      if (prevData) {
        data = [...prevData, userData];
      } else {
        data.push(userData);
      }

      localStorage.setItem("data", JSON.stringify(data));

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
          <option value="">Select Role</option>
          <option value="Project Manager">Project Manager</option>
          <option value="Employee">Employee</option>
        </select>
        <br />
        <input type="email" ref={emailRef} required placeholder="Email" />{" "}
        <br />
        <input
          type="password"
          ref={passwordRef}
          required
          placeholder="Password"
        />{" "}
        <br />
        <input
          type="password"
          ref={passwordConfirmRef}
          required
          placeholder="Confirm Password"
        />{" "}
        <br />
        <button disabled={loading} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
