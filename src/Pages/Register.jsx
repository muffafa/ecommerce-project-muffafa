// src/Pages/Register.jsx
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "../api/axios"; // Import Axios instance
import "./CSS/LoginSignup.css"; // Import the CSS file

function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        // Send registration request to the API using Axios
        const response = await axios.post("/users", {
          name: values.name,
          email: values.email,
          password: values.password,
        });

        if (response.status === 201) {
          alert("Registration successful!");
          navigate("/login"); // Redirect to login page on successful registration
        }
      } catch (error) {
        // Show error message based on HTTP status code
        alert(
          "Registration failed: " +
            (error.response?.data?.message || error.message)
        );
      }
    },
  });

  const handleLoginRedirect = () => {
    navigate("/login"); // Redirect user to login page
  };

  return (
    <div className="loginsignup">
      <form className="loginsignup-container" onSubmit={formik.handleSubmit}>
        <h1>Üye Ol</h1>
        <div className="signin-form">
          <input
            name="name"
            type="text"
            placeholder="İsminiz"
            required
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <input
            name="email"
            type="email"
            placeholder="E-Posta Adresiniz"
            required
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <input
            name="password"
            type="password"
            placeholder="Şifre"
            required
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <button type="submit">Üye Ol</button>
        </div>
        <p className="login-direct">
          Zaten üye misin? <span onClick={handleLoginRedirect}>Giriş Yap.</span>
        </p>
        <div className="loginsignup-privacy-text">
          <input type="checkbox" name="terms" id="terms" required />
          <p>Kullanım şartları ve gizlilik politikaları formunu okudum,</p>
        </div>
      </form>
    </div>
  );
}

export default Register;
