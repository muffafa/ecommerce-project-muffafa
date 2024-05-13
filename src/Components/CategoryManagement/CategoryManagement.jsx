// src/Components/CategoryManagement.jsx
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useFormik } from "formik";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null); // Düzenlenen kategori ID'si

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error(
        "Kategoriler yüklenirken bir hata oluştu:",
        error.response?.data?.message || error.message
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const token = localStorage.getItem("token");
        if (editingId) {
          await axios.put(
            `/categories/${editingId}`,
            { name: values.name },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setEditingId(null);
        } else {
          await axios.post(
            "/categories",
            { name: values.name },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
        fetchCategories(); // Kategori listesini yeniden yükler
        resetForm(); // Formu sıfırlar
      } catch (error) {
        console.error(
          "Kategori işlemi sırasında bir hata oluştu:",
          error.response?.data?.message || error.message
        );
      }
    },
  });

  const handleDeleteCategory = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCategories(); // Kategori listesini yeniden yükler
    } catch (error) {
      console.error(
        "Kategori silinirken bir hata oluştu:",
        error.response?.data?.message || error.message
      );
    }
  };

  const startEdit = (category) => {
    setEditingId(category._id);
    formik.setFieldValue("name", category.name);
  };

  return (
    <div>
      <h1>Kategori Yönetimi</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          placeholder="Kategori İsmi"
        />
        <button type="submit">
          {editingId ? "Kategori Güncelle" : "Kategori Ekle"}
        </button>
      </form>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.name}
            <button onClick={() => startEdit(category)}>Düzenle</button>
            <button onClick={() => handleDeleteCategory(category._id)}>
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManagement;
