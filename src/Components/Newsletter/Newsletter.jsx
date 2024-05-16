import "./Newsletter.css"

function Newsletter(){

    return(
        
        <div className="newsletter">
            <h1>Sana Özel Teklifleri Kaçırma!</h1>
            <p>Bizden en güncel teklifler ve haberler için bültenimize abone olmayı unutma.</p>
            <div>
                <input type="email" placeholder="E-Posta Adresiniz" />
                <a href="https://bmb.cu.edu.tr/" target="_blank" rel="noopener noreferrer" style={{textDecoration: "none"}}>
                    <button>Abone Ol</button>
                </a>
            </div>
        </div>

    )

}

export default Newsletter