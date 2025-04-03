import axios from "axios";
import { useState } from "react";
import { baseApi } from "./utils/api";
import { useNavigate } from "react-router-dom";
import { RegisterCon } from "./style";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const loginUser = async () => {
    setError(null);
  
    if (!email || !password) {
      setError("All fields are required.");
      return;
    }
  
    try {
      const response = await axios.post(baseApi + "/auth/login", {
        email,
        password,
      });
  
      console.log("Server Response:", response.data); // Debug log
  
      if (response.data.message === "Login successful") {
        const token = response.data.token;
        console.log("Token received:", token); // Debug log
  
        localStorage.setItem("authToken", token);
        navigate("/");
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Check console for details.");
    }
  };

  return (
    <RegisterCon>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" onClick={loginUser}>Log In</button>
      </form>
    </RegisterCon>
  );
};

export default Login;
