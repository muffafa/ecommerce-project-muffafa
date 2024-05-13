import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <div className="admin-content">
        Hoşgeldin!
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
