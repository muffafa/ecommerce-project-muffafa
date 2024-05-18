// src/Components/UserManagement.jsx
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useFormik } from "formik";
import "./UserManagement.css"; // Import the CSS file

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Kullanıcılar yüklenirken bir hata oluştu:", error);
      alert("Kullanıcılar yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      isAdmin: false,
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const token = localStorage.getItem("token");
        const data = {
          email: values.email,
          name: values.name,
          isAdmin: values.isAdmin,
        };
        // Eğer bir şifre girilmişse, bu veriyi de ekleyin
        if (values.password) {
          data.password = values.password;
        }
        if (editingId) {
          await axios.put(`/users/${editingId}`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setEditingId(null);
          alert("Kullanıcı başarıyla güncellendi.");
        } else {
          await axios.post("/users", data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          alert("Kullanıcı başarıyla eklendi.");
        }
        fetchUsers(); // Kullanıcı listesini yeniden yükler
        resetForm(); // Formu sıfırlar
      } catch (error) {
        console.error("Kullanıcı işlemi sırasında bir hata oluştu:", error);
        alert("Kullanıcı işlemi sırasında bir hata oluştu.");
      }
    },
  });

  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers(); // Kullanıcı listesini yeniden yükler
      alert("Kullanıcı başarıyla silindi.");
    } catch (error) {
      console.error("Kullanıcı silinirken bir hata oluştu:", error);
      alert("Kullanıcı silinirken bir hata oluştu.");
    }
  };

  const startEdit = (user) => {
    setEditingId(user._id);
    formik.setValues({
      email: user.email,
      name: user.name,
      password: "",
      isAdmin: user.isAdmin,
    });
  };

  const handleCancelEdit = () => {
    formik.resetForm();
    setEditingId(null);
  };

  return (
    <div className="user-management">
      <h1>Kullanıcı Yönetimi</h1>
      <form onSubmit={formik.handleSubmit}>
        <label>
          E-posta:
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="E-posta"
          />
        </label>
        <label>
          Adı:
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="Adı"
          />
        </label>
        <label>
          Şifre:
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Şifre"
          />
        </label>
        <label>
          Admin:
          <input
            type="checkbox"
            name="isAdmin"
            onChange={formik.handleChange}
            checked={formik.values.isAdmin}
          />
        </label>
        <button type="submit">
          {editingId ? "Kullanıcı Güncelle" : "Kullanıcı Ekle"}
        </button>
        {editingId && (
          <button type="button" onClick={handleCancelEdit}>
            İptal
          </button>
        )}
      </form>
      <br />
      <h1>Kullanıcılar</h1>
      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.email} - {user.name} -{" "}
              {user.isAdmin ? "Admin" : "Kullanıcı"}
              <div>
                <button onClick={() => startEdit(user)}>Düzenle</button>
                <button onClick={() => handleDeleteUser(user._id)}>Sil</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserManagement;
