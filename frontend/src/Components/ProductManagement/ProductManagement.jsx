import { useEffect, useState } from "react";
import useCustomAxios from "../../hooks/useCustomAxios";
import { useFormik } from "formik";
import "./ProductManagement.css";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const axios = useCustomAxios();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Kategoriler yüklenirken hata oluştu:", error);
    }
    setLoading(false);
  };

  const fetchProducts = async (categoryId = "") => {
    setLoading(true);
    const endpoint = categoryId
      ? `/products?category=${categoryId}`
      : "/products";
    try {
      const response = await axios.get(endpoint);
      setProducts(response.data);
    } catch (error) {
      console.error("Ürünler yüklenirken hata oluştu:", error);
    }
    setLoading(false);
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
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      try {
        if (editingId) {
          await axios.put(`/products/${editingId}`, values, { headers });
          setEditingId(null);
        } else {
          await axios.post("/products", values, { headers });
        }
        fetchProducts();
        resetForm();
        alert("Ürün işlemi başarılı!");
      } catch (error) {
        console.error("Ürün işlemi sırasında bir hata oluştu:", error);
        alert("Ürün işlemi sırasında bir hata oluştu: " + error.message);
      }
    },
  });

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchProducts();
      alert("Ürün silme işlemi başarılı!");
    } catch (error) {
      console.error("Ürün silinirken hata oluştu:", error);
      alert("Ürün silinirken hata oluştu: " + error.message);
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
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default ProductManagement;
