import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );

      alert("Signup Successful");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Signup Failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>

      <h1>Signup</h1>

      <form onSubmit={handleSignup}>

        <input
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={handleChange}
        />

        <br />
        <br />

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

        <select
          name="role"
          onChange={handleChange}
        >
          <option value="member">
            Member
          </option>

          <option value="admin">
            Admin
          </option>
        </select>

        <br />
        <br />

        <button type="submit">
          Signup
        </button>

      </form>

    </div>
  );
}

export default Signup;