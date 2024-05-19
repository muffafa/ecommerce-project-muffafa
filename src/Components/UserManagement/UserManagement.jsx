import { useEffect, useState } from "react";
import useCustomAxios from "../../hooks/useCustomAxios";
import { useFormik } from "formik";
import "./UserManagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const axios = useCustomAxios();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error(
        "Kullanıcılar yüklenirken bir hata oluştu:",
        error.response?.data?.message || error.message
      );
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      isAdmin: false,
      isSubscribedToNewsletter: false,
    },
    onSubmit: async (values, { resetForm }) => {
      const data = {
        email: values.email,
        name: values.name,
        isAdmin: values.isAdmin,
        isSubscribedToNewsletter: values.isSubscribedToNewsletter,
      };
      if (values.password) {
        data.password = values.password;
      }
      try {
        if (editingId) {
          await axios.put(`/users/${editingId}`, data);
          setEditingId(null);
        } else {
          await axios.post("/users", data);
        }
        fetchUsers();
        resetForm();
        alert("Kullanıcı işlemi başarılı!");
      } catch (error) {
        console.error(
          "Kullanıcı işlemi sırasında bir hata oluştu:",
          error.response?.data?.message || error.message
        );
        alert("Kullanıcı işlemi sırasında bir hata oluştu: " + error.message);
      }
    },
  });

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      fetchUsers();
      alert("Kullanıcı silme işlemi başarılı!");
    } catch (error) {
      console.error(
        "Kullanıcı silinirken bir hata oluştu:",
        error.response?.data?.message || error.message
      );
      alert("Kullanıcı silinirken bir hata oluştu: " + error.message);
    }
  };

  const handleCancelEdit = () => {
    formik.resetForm();
    setEditingId(null);
  };

  const startEdit = (user) => {
    setEditingId(user._id);
    formik.setValues({
      email: user.email,
      name: user.name,
      password: "",
      isAdmin: user.isAdmin,
      isSubscribedToNewsletter: user.isSubscribedToNewsletter,
    });
  };

  return (
    <div className="user-management">
      <h1>Kullanıcı Yönetimi</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
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
            <label>
              Bülten Aboneliği:
              <input
                type="checkbox"
                name="isSubscribedToNewsletter"
                onChange={formik.handleChange}
                checked={formik.values.isSubscribedToNewsletter}
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
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                {user.email} - {user.name} -{" "}
                {user.isAdmin ? "Admin" : "Kullanıcı"} -{" "}
                {user.isSubscribedToNewsletter ? "Abone" : "Abone Değil"}
                <div>
                  <button onClick={() => startEdit(user)}>Düzenle</button>
                  <button onClick={() => handleDeleteUser(user._id)}>
                    Sil
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default UserManagement;
