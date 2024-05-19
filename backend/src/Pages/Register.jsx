import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import useCustomAxios from "../hooks/useCustomAxios";
import "./CSS/LoginSignup.css";

function Register() {
  const navigate = useNavigate();
  const axios = useCustomAxios();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/users", {
          name: values.name,
          email: values.email,
          password: values.password,
        });

        if (response.status === 201) {
          alert("Registration successful!");
          navigate("/login");
        }
      } catch (error) {
        alert(
          "Registration failed: " +
            (error.response?.data?.message || error.message)
        );
      }
    },
  });

  const handleLoginRedirect = () => {
    navigate("/login");
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
