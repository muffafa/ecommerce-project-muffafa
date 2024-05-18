// src/Components/ProductManagement.jsx
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useFormik } from "formik";
import "./ProductManagement.css"; // Import the CSS file

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Kategoriler yüklenirken bir hata oluştu:", error);
      alert("Kategoriler yüklenirken bir hata oluştu.");
    }
  };

  const fetchProducts = async (categoryId = "") => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const endpoint = categoryId
      ? `/products?category=${categoryId}`
      : "/products";
    try {
      const response = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Ürünler yüklenirken bir hata oluştu:", error);
      alert("Ürünler yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (event) => {
    const selectedCategory = event.target.value;
    setFilterCategory(selectedCategory);
    fetchProducts(selectedCategory);
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    fetchProducts(filterCategory);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      stock: 0,
      category: "",
      currentPrice: 0,
      oldPrice: 0,
      imageUrl: "",
    },
    onSubmit: async (values, { resetForm }) => {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      try {
        if (editingId) {
          await axios.put(`/products/${editingId}`, values, { headers });
          setEditingId(null);
          alert("Ürün başarıyla güncellendi.");
        } else {
          await axios.post("/products", values, { headers });
          alert("Ürün başarıyla eklendi.");
        }
        fetchProducts();
        resetForm();
      } catch (error) {
        console.error("Ürün işlemi sırasında bir hata oluştu:", error);
        alert("Ürün işlemi sırasında bir hata oluştu.");
      }
    },
  });

  const handleDeleteProduct = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
      alert("Ürün başarıyla silindi.");
    } catch (error) {
      console.error("Ürün silinirken bir hata oluştu:", error);
      alert("Ürün silinirken bir hata oluştu.");
    }
  };

  const handleCancel = () => {
    formik.resetForm();
    setEditingId(null);
  };

  const handleEditClick = (product) => {
    setEditingId(product._id);
    formik.setValues({
      name: product.name,
      description: product.description,
      stock: product.stock,
      category: product.category._id,
      currentPrice: product.currentPrice,
      oldPrice: product.oldPrice,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <div className="product-management">
      <h1>Ürün Yönetimi</h1>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Ürün İsmi:
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="Ürün İsmi"
          />
        </label>
        <label>
          Açıklama:
          <input
            type="text"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            placeholder="Açıklama"
          />
        </label>
        <label>
          Stok Miktarı:
          <input
            type="number"
            name="stock"
            onChange={formik.handleChange}
            value={formik.values.stock}
            placeholder="Stok Miktarı"
          />
        </label>
        <label>
          Kategori:
          <select
            name="category"
            onChange={formik.handleChange}
            value={formik.values.category}
          >
            <option value="">Kategori Seçiniz</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Mevcut Fiyat:
          <input
            type="number"
            name="currentPrice"
            onChange={formik.handleChange}
            value={formik.values.currentPrice}
            placeholder="Mevcut Fiyat"
          />
        </label>
        <label>
          Eski Fiyat:
          <input
            type="number"
            name="oldPrice"
            onChange={formik.handleChange}
            value={formik.values.oldPrice}
            placeholder="Eski Fiyat"
          />
        </label>
        <label>
          Ürün Resmi URL:
          <input
            type="text"
            name="imageUrl"
            onChange={formik.handleChange}
            value={formik.values.imageUrl}
            placeholder="Ürün Resmi URL"
          />
        </label>
        <button type="submit">
          {editingId ? "Ürünü Güncelle" : "Ürün Ekle"}
        </button>
        {editingId && (
          <button type="button" onClick={handleCancel}>
            İptal
          </button>
        )}
      </form>
      <br />
      <h1>Ürünler</h1>
      <form className="filter-form" onSubmit={handleFilterSubmit}>
        <select value={filterCategory} onChange={handleFilterChange}>
          <option value="">Tümü</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit">Filtrele</button>
      </form>

      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              {product.name}
              <div>
                <button onClick={() => handleEditClick(product)}>
                  Düzenle
                </button>
                <button onClick={() => handleDeleteProduct(product._id)}>
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

export default ProductManagement;
