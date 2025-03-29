import axios from "axios";
import { useState } from "react";
import { baseApi } from "./utils/api";
import { useNavigate } from "react-router-dom";



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

    if (response.data.message === "Login successful") {
      // Save JWT token in localStorage
      localStorage.setItem("authToken", response.data.token);


      console.log("Login successful:", response.data);
      navigate("/"); 
    } else {
      setError("Invalid email or password.");
    }
  } catch (error) {
    setError("Invalid email or password.");
    console.error("Login failed:", error);
  }
};

  return (
    <div style={{display:'flex',flexDirection:'column'}}>
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
      <button onClick={loginUser}>Log In</button>
    </div>
  );
};

export default Login;