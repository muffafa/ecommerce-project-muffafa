import { Outlet } from "react-router-dom";
import "./CSS/Admin.css"; // Import the CSS file

const Admin = () => {
  return (
    <div className="admin-container">
      <div className="admin-content">
        <h1>Hoşgeldin Sayın Yetkili!</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
