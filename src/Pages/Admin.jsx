import AdminNavBar from "../Components/AdminNavBar/AdminNavBar";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <AdminNavBar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
