import { useState } from "react";
import { apiService } from "../services/api.service";
import { ProductCategory } from "../types/product.types";

interface AddProductFormProps {
  onProductAdded: () => void;
}

export const AddProductForm: React.FC<AddProductFormProps> = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: ProductCategory.ELECTRONICS,
    stock: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await apiService.createProduct({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category as ProductCategory,
        stock: parseInt(formData.stock),
      });

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        category: ProductCategory.ELECTRONICS,
        stock: "",
      });

      onProductAdded();
    } catch (err) {
      setError("Failed to add product");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "30px", border: "1px solid #ddd", padding: "16px" }}>
      <h2>Add New Product</h2>

      <div style={{ marginBottom: "12px" }}>
        <label>Product Name: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label>Description: </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label>Price: </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          required
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label>Category: </label>
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="ELECTRONICS">Electronics</option>
          <option value="CLOTHING">Clothing</option>
          <option value="BOOKS">Books</option>
          <option value="FOOD">Food</option>
        </select>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label>Stock: </label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};
