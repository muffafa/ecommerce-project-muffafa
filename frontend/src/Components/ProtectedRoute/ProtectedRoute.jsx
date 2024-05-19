import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const ProtectedRoute = () => {
  const { user } = useAuth();

  // Eğer user yoksa veya isAdmin değilse, kullanıcıyı ana sayfaya yönlendir
  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // Erişim izni verilen çocuk bileşenleri render eder
};

export default ProtectedRoute;
