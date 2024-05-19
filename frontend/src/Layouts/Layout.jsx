import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import AdminNavBar from "../Components/AdminNavBar";

const Layout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div>
      {isAdminRoute ? <AdminNavBar /> : <Navbar />}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
