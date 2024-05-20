import { useState, useEffect, useRef } from "react";
import useCustomAxios from "../../hooks/useCustomAxios";
import { useAuth } from "../../Context/AuthContext";
import "./Newsletter.css";

function Newsletter() {
  const { user } = useAuth();
  const customAxios = useCustomAxios();
  const axiosRef = useRef(customAxios);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      fetchSubscriptionStatus();
    }
  }, [user]);

  const fetchSubscriptionStatus = async () => {
    if (user) {
      setLoading(true);
      try {
        const response = await axiosRef.current.get(`/users/${user._id}`);
        setIsSubscribed(response.data.isSubscribedToNewsletter);
      } catch (error) {
        console.error(
          "Bülten abonelik durumu yüklenirken bir hata oluştu:",
          error
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubscribe = async () => {
    if (!user) {
      setMessage("Lütfen abone olmak için giriş yapın.");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosRef.current.post("/users/subscribe");
      if (response.status === 200) {
        setIsSubscribed(true);
        setMessage(""); // Clear message to avoid conflict
        alert(response.data.message);
      }
    } catch (error) {
      setMessage(
        "Abonelik işlemi sırasında bir hata oluştu: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="newsletter">
        <h1>Sana Özel Teklifleri Kaçırma!</h1>
        <p>
          Bizden en güncel teklifler ve haberler için bültenimize abone olmayı
          unutma.
        </p>
        <p>Lütfen abone olmak için giriş yapın.</p>
      </div>
    );
  }

  return (
    <div className="newsletter">
      <h1>Sana Özel Teklifleri Kaçırma!</h1>
      <p>
        Bizden en güncel teklifler ve haberler için bültenimize abone olmayı
        unutma.
      </p>
      {loading ? (
        <p style={{ color: "orange" }}>Yükleniyor...</p>
      ) : isSubscribed ? (
        <p style={{ color: "orange" }}>Bültenimize abonesiniz.</p>
      ) : (
        <div>
          <input
            type="email"
            placeholder="E-Posta Adresiniz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />
          <button onClick={handleSubscribe}>Abone Ol</button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default Newsletter;
