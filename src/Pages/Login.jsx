import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import useCustomAxios from "../hooks/useCustomAxios";
import "./CSS/LoginSignup.css";

function LoginSignup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const axios = useCustomAxios();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/users/login", {
          email: values.email,
          password: values.password,
        });
        const data = response.data;

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
        login(data);
        if (data.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } catch (error) {
        alert(
          "Login failed: " + (error.response?.data?.message || error.message)
        );
      }
    },
  });

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="loginsignup">
      <form className="loginsignup-container" onSubmit={formik.handleSubmit}>
        <h1>Giriş Yap</h1>
        <div className="signin-form">
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
          <button type="submit">Giriş Yap</button>
        </div>
        <p className="login-direct">
          Üye değil misin? <span onClick={handleRegisterRedirect}>Üye Ol.</span>
        </p>
      </form>
    </div>
  );
}

export default LoginSignup;
