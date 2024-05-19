// src/Components/CategoryManagement.jsx
import { useEffect, useState } from "react";
import useCustomAxios from "../../hooks/useCustomAxios"; // Import the custom axios hook
import { useFormik } from "formik";
import "./CategoryManagement.css"; // Import the CSS file

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null); // Düzenlenen kategori ID'si
  const [loading, setLoading] = useState(false);
  const axios = useCustomAxios(); // Use the custom axios hook

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Kategoriler yüklenirken bir hata oluştu:", error);
      alert("Kategoriler yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        if (editingId) {
          await axios.put(`/categories/${editingId}`, { name: values.name });
          setEditingId(null);
          alert("Kategori başarıyla güncellendi.");
        } else {
          await axios.post("/categories", { name: values.name });
          alert("Kategori başarıyla eklendi.");
        }
        fetchCategories(); // Kategori listesini yeniden yükler
        resetForm(); // Formu sıfırlar
      } catch (error) {
        console.error("Kategori işlemi sırasında bir hata oluştu:", error);
        alert("Kategori işlemi sırasında bir hata oluştu.");
      }
    },
  });

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`/categories/${id}`);
      fetchCategories(); // Kategori listesini yeniden yükler
      alert("Kategori başarıyla silindi.");
    } catch (error) {
      console.error("Kategori silinirken bir hata oluştu:", error);
      alert("Kategori silinirken bir hata oluştu.");
    }
  };

  const startEdit = (category) => {
    setEditingId(category._id);
    formik.setFieldValue("name", category.name);
  };

  const handleCancelEdit = () => {
    formik.resetForm();
    setEditingId(null);
  };

  return (
    <div className="category-management">
      <h1>Kategori Yönetimi</h1>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Kategori İsmi:
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="Kategori İsmi"
          />
        </label>
        <button type="submit">
          {editingId ? "Kategori Güncelle" : "Kategori Ekle"}
        </button>
        {editingId && (
          <button type="button" onClick={handleCancelEdit}>
            İptal
          </button>
        )}
      </form>
      <br />
      <h1>Kategoriler</h1>
      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category._id}>
              {category.name}
              <div>
                <button onClick={() => startEdit(category)}>Düzenle</button>
                <button onClick={() => handleDeleteCategory(category._id)}>
                  Sil
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryManagement;
