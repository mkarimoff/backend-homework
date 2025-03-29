import axios from "axios";
import { useState } from "react";
import { baseApi } from "./utils/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const registerUser = async () => {

    setError(null);
    setSuccess(null);

    if (!username || !email || !password) {
      setError("All fields are required.");
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
      setSuccess("Registration successful!");

    } catch (error) {
      setError("Failed to register user. Please try again.");
      console.error("Failed to register user:", error);
    }
  };

  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <button onClick={registerUser}>Register</button>
    </div>
  );
};

export default Register;

