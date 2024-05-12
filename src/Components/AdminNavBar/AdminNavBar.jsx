import { Link } from 'react-router-dom';

const AdminNavBar = () => {
  return (
    <div className="admin-nav">
      <Link to="/admin/products">Ürün Yönetimi</Link>
      <Link to="/admin/categories">Kategori Yönetimi</Link>
      <Link to="/admin/users">Kullanıcı Yönetimi</Link>
    </div>
  );
};

export default AdminNavBar;
