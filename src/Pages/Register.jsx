import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const response = await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();

    if (response.ok) {
      alert("Registration successful!");
      navigate("/login"); // Kayıt başarılıysa giriş sayfasına yönlendir
    } else {
      alert("Registration failed: " + data.message);
    }
  };

  return (
    <div className="loginsignup">
      <form className="loginsignup-container" onSubmit={handleSubmit}>
        <h1>Üye Ol</h1>
        <div className="signin-form">
          <input name="name" type="text" placeholder="İsminiz" required />
          <input
            name="email"
            type="email"
            placeholder="E-Posta Adresiniz"
            required
          />
          <input name="password" type="password" placeholder="Şifre" required />
          <button type="submit">Üye Ol</button>
        </div>
        <p className="login-direct">
          Zaten üye misin? <a href="/login">Giriş Yap.</a>
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
