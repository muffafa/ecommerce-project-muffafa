// src/Pages/Login.jsx
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "../api/axios"; // axios instance'ı import edilir
import "./CSS/LoginSignup.css";

function LoginSignup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        // API'ye login isteği gönderilir (axios kullanılarak)
        const response = await axios.post("/users/login", {
          email: values.email,
          password: values.password,
        });
        const data = response.data;

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
        login(data); // Kullanıcı bilgileriyle login fonksiyonunu çağır
        if (data.isAdmin) {
          navigate("/admin"); // Admin kullanıcılar için admin paneline yönlendir
        } else {
          navigate("/"); // Diğer kullanıcılar için anasayfaya yönlendir
        }
      } catch (error) {
        // HTTP durum koduna göre hata mesajı göster
        alert(
          "Login failed: " + error.response?.data?.message || error.message
        );
      }
    },
  });

  const handleRegisterRedirect = () => {
    navigate("/register"); // Kullanıcıyı kayıt sayfasına yönlendir
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
