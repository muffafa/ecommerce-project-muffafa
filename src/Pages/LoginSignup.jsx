import "./CSS/LoginSignup.css"

function LoginSignup(){

    return(

        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>Üye Ol</h1>
                <div className="signin-form">
                    <input type="text" placeholder="İsminiz" />
                    <input type="email" placeholder="E-Posta Adresiniz" />
                    <input type="password" placeholder="Şifre" />
                    <button>Üye Ol</button>
                </div>
                <p className="login-direct">Zaten üye misin? <span>Giriş Yap.</span></p>
                <div className="loginsignup-privacy-text">
                    <input type="checkbox" name="" id="" />
                    <p>Kullanım şartları ve gizlilik politikaları formunu okudum,</p>
                </div>
            </div>
        </div>

    )

}

export default LoginSignup;