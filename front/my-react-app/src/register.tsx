import axios from "axios";
import { useState } from "react";
import { baseApi } from "./utils/api";
import { useNavigate } from "react-router-dom";
import { RegisterCon } from "./style";

const Register = () => {
  let navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const registerUser = async ( e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format.");
      return;
    }

    try {
      await axios.post(baseApi + "/auth/register/", {
        username,
        email,
        password,
      });
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setSuccess("Registration successful!");
      navigate("/login"); 

    } catch (error) {
      setError("Failed to register user. Please try again.");
      console.error("Failed to register user:", error);
    }
  };

  return (
    <RegisterCon>
    <form onSubmit={registerUser}>
    <label htmlFor="">Username</label>
      <input
        type="text"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="">Password</label>
      <input
        required
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="">Confirm Password</label>
      <input
      required
        type="text"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <label htmlFor="">Email</label>
      <input
      required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <button type="submit">Register</button>
    </form>
    </RegisterCon>
  );
};

export default Register;

