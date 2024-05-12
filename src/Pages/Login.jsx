import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./CSS/LoginSignup.css";

function LoginSignup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegisterRedirect = () => {
    navigate("/register"); // Kullanıcıyı kayıt sayfasına yönlendir
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      // API'ye login isteği gönderilir
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (response.ok) {
        login(data); // Kullanıcı bilgileriyle login fonksiyonunu çağır
        if (data.isAdmin) {
          navigate("/admin"); // Admin kullanıcılar için admin paneline yönlendir
        } else {
          navigate("/"); // Diğer kullanıcılar için anasayfaya yönlendir
        }
      } else {
        // Hata mesajı göster
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      alert("Login error: " + error.message);
    }
  };

  return (
    <div className="loginsignup">
      <form className="loginsignup-container" onSubmit={handleSubmit}>
        <h1>Giriş Yap</h1>
        <div className="signin-form">
          <input
            name="email"
            type="email"
            placeholder="E-Posta Adresiniz"
            required
          />
          <input name="password" type="password" placeholder="Şifre" required />
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
