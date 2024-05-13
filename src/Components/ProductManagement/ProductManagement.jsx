import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useFormik } from "formik";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("/categories", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCategories(response.data);
  };

  const fetchProducts = async (categoryId = "") => {
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
      console.error("Ürünleri çekerken hata oluştu:", error);
    }
  };

  const handleFilterChange = (event) => {
    const selectedCategory = event.target.value;

    if (selectedCategory === "") {
      setFilterCategory(""); // Tüm ürünleri getirecek şekilde ayarla
    } else {
      setFilterCategory(selectedCategory);
    }
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault(); // Formun varsayılan gönderimini engelle
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
      if (editingId) {
        await axios.put(`/products/${editingId}`, values, { headers });
        setEditingId(null);
      } else {
        await axios.post("/products", values, { headers });
      }
      fetchProducts();
      resetForm();
    },
  });

  const handleDeleteProduct = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProducts();
  };

  const handleCancel = () => {
    formik.resetForm();
    setEditingId(null);
  };

  const handleEditClick = (product) => {
    setEditingId(product._id);
    // Formik değerlerini seçilen ürünün değerleriyle güncelle
    formik.setValues({
      name: product.name,
      description: product.description,
      stock: product.stock,
      category: product.category._id, // Bu satırın doğru çalıştığından emin olun
      currentPrice: product.currentPrice,
      oldPrice: product.oldPrice,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <div>
      <h1>Ürün Yönetimi</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          placeholder="Ürün İsmi"
        />
        <input
          type="text"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          placeholder="Açıklama"
        />
        <input
          type="number"
          name="stock"
          onChange={formik.handleChange}
          value={formik.values.stock}
          placeholder="Stok Miktarı"
        />
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
        <input
          type="number"
          name="currentPrice"
          onChange={formik.handleChange}
          value={formik.values.currentPrice}
          placeholder="Mevcut Fiyat"
        />
        <input
          type="number"
          name="oldPrice"
          onChange={formik.handleChange}
          value={formik.values.oldPrice}
          placeholder="Eski Fiyat"
        />
        <input
          type="text"
          name="imageUrl"
          onChange={formik.handleChange}
          value={formik.values.imageUrl}
          placeholder="Ürün Resmi URL"
        />
        <button type="submit">
          {editingId ? "Ürünü Güncelle" : "Ürün Ekle"}
        </button>
        {editingId && (
          <button type="button" onClick={handleCancel}>
            İptal
          </button>
        )}
      </form>
      <form onSubmit={handleFilterSubmit}>
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

      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name}
            <button onClick={() => handleEditClick(product)}>Düzenle</button>
            <button onClick={() => handleDeleteProduct(product._id)}>
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;
