import { useState } from "react";
import axios from "axios";
import "./Login.css";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        formData
      );
      setMessage(response.data.message);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login_header">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="input_login"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className="input_login"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button className="button_login" type="submit">
          Login
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
