import { useState } from "react";
import axios from "axios";

function Verify() {
  const [formData, setFormData] = useState({
    email: "",
    verify_code_by_user: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/verify",
        formData
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Verify Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="verify_code_by_user"
          placeholder="Verification Code"
          onChange={handleChange}
          required
        />
        <button type="submit">Verify</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Verify;
