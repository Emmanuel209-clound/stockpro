
import { useState } from "react";
import { Link } from "react-router-dom";
import { useStock } from "../context/StockContext";
import "./Products.css";

const Products = () => {
  // Get shared product data
  const { products, setProducts } = useStock();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Add or update a product
  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingId !== null) {
      setProducts((previousProducts) =>
        previousProducts.map((product) =>
          product.id === editingId
            ? {
                ...product,
                ...formData,
                price: Number(formData.price),
                quantity: Number(formData.quantity),
              }
            : product
        )
      );
    } else {
      const newProduct = {
        id: Date.now(),
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        minimum: 5,
      };

      setProducts((previousProducts) => [
        ...previousProducts,
        newProduct,
      ]);
    }

    setFormData({
      name: "",
      category: "",
      price: "",
      quantity: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  // Load product details for editing
  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
    });

    setEditingId(product.id);
    setShowForm(true);
  };

  // Delete a product
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      setProducts((previousProducts) =>
        previousProducts.filter((product) => product.id !== id)
      );
    }
  };

  // Search products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate product statistics
  const totalStockUnits = products.reduce(
    (total, product) => total + Number(product.quantity),
    0
  );

  const totalCategories = new Set(
    products.map((product) => product.category)
  ).size;

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <h2>
          Stock<span>Pro</span>
        </h2>

        <p className="sidebar-label">MAIN MENU</p>

        <nav>
          <Link to="/dashboard">🏠 Dashboard</Link>
          <Link to="/products" className="active">📦 Products</Link>
          <Link to="/inventory">📋 Inventory</Link>
          <Link to="/sales">💳 Sales</Link>
          <Link to="/reports">📊 Reports</Link>
        </nav>

        <div className="sidebar-bottom">
          <Link to="/">🚪 Back to Website</Link>
        </div>
      </aside>

      <main className="products-main">
        <header className="products-header">
          <div>
            <h1>Products Management</h1>
            <p>Manage and organize your business products.</p>
          </div>

          <button
            className="add-product-btn"
            onClick={() => {
              setFormData({
                name: "",
                category: "",
                price: "",
                quantity: "",
              });

              setEditingId(null);
              setShowForm(!showForm);
            }}
          >
            + Add Product
          </button>
        </header>

        <section className="products-summary">
          <div className="product-summary-card">
            <span>Total Products</span>
            <h2>{products.length}</h2>
          </div>

          <div className="product-summary-card">
            <span>Total Stock Units</span>
            <h2>{totalStockUnits}</h2>
          </div>

          <div className="product-summary-card">
            <span>Product Categories</span>
            <h2>{totalCategories}</h2>
          </div>
        </section>

        {showForm && (
          <section className="product-form-container">
            <h2>{editingId !== null ? "Edit Product" : "Add New Product"}</h2>

            <form onSubmit={handleSubmit} className="product-form">
              <input
                type="text"
                name="name"
                placeholder="Product name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="category"
                placeholder="Product category"
                value={formData.category}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="price"
                placeholder="Price (₦)"
                value={formData.price}
                onChange={handleChange}
                min="0"
                required
              />

              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                required
              />

              <button type="submit">
                {editingId !== null ? "Update Product" : "Save Product"}
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
              >
                Cancel
              </button>
            </form>
          </section>
        )}

        <section className="products-table-container">
          <div className="products-table-header">
            <h2>All Products</h2>

            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>₦{Number(product.price).toLocaleString()}</td>
                      <td>{product.quantity}</td>

                      <td>
                        <span
                          className={
                            product.quantity <= (product.minimum ?? 10)
                              ? "low-stock"
                              : "in-stock"
                          }
                        >
                          {product.quantity <= (product.minimum ?? 10)
                            ? "Low Stock"
                            : "In Stock"}
                        </span>
                      </td>

                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No products found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Products;
