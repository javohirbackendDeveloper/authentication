import { useState, useEffect } from "react";
import axios from "axios";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [timer, setTimer] = useState(120);

  useEffect(() => {
    let interval;
    if (verified && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [verified, timer]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/register",
        formData
      );
      setMessage(response.data.message);
      if (response.data.message.includes("verify code")) {
        setVerified(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/verify", {
        email: formData.email,
        verify_code_by_user: verifyCode,
      });
      setMessage(response.data.message);
      if (response.data.message.includes("verified")) {
        setVerified(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="headerOfRegister"
      style={{
        backgroundImage:
          "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYp-eLRGOac5LDb9qmYaTaCkX7pM0NxSDGvRFWisxUhTozeNfDyHlhlqjGA1NA1ZjUIGk&usqp=CAU')",
      }}
    >
      <h2>{verified ? "Hello World" : "Register"}</h2>
      {!verified ? (
        <form onSubmit={handleRegister} className="headerForm">
          <input
            className="input"
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button className="button" type="submit">
            Register
          </button>
        </form>
      ) : (
        <div className="verify_code">
          <p>
            Please enter the verification code sent to your email. You have{" "}
            <b>
              {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
            </b>{" "}
            minutes left.
          </p>
          <form onSubmit={handleVerify}>
            <input
              className="verify_input"
              type="text"
              placeholder="Verification Code"
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
              required
            />
            <button
              className="button_verify"
              type="submit"
              disabled={timer === 0}
              style={{ marginLeft: "200px" }}
            >
              Verify
            </button>
          </form>
          {timer === 0 && (
            <p className="text-danger">
              The verification code has expired. Please try again.
            </p>
          )}
        </div>
      )}
      <p>{message}</p>
    </div>
  );
}

export default Register;
