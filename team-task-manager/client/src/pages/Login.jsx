import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Login Failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>

      <h1>Login</h1>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>

        <br />
<br />

<Link to="/signup">
  Go to Signup
</Link>

      </form>

    </div>
  );
}

export default Login;