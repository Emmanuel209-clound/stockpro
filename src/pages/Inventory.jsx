
import { useState } from "react";
import { Link } from "react-router-dom";
import { useStock } from "../context/StockContext";
import "./Inventory.css";

const Inventory = () => {
  // Get shared products
  const { products, setProducts } = useStock();

  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newQuantity, setNewQuantity] = useState("");

  // Calculate total stock units
  const totalUnits = products.reduce(
    (total, product) => total + Number(product.quantity),
    0
  );

  // Count products with available stock
  const productsInStock = products.filter(
    (product) => product.quantity > 0
  ).length;

  // Count low-stock products
  const lowStock = products.filter(
    (product) =>
      product.quantity > 0 &&
      product.quantity <= (product.minimum ?? 10)
  ).length;

  // Count products with zero stock
  const outOfStock = products.filter(
    (product) => product.quantity === 0
  ).length;

  // Update stock quantity
  const handleUpdateStock = (event) => {
    event.preventDefault();

    const quantity = Number(newQuantity);

    if (!Number.isInteger(quantity) || quantity < 0) {
      alert("Please enter a valid stock quantity.");
      return;
    }

    setProducts((previousProducts) =>
      previousProducts.map((product) =>
        product.id === selectedProduct
          ? { ...product, quantity }
          : product
      )
    );

    setSelectedProduct(null);
    setNewQuantity("");

    alert("Stock updated successfully!");
  };

  // Search inventory
  const filteredInventory = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <h2>
          Stock<span>Pro</span>
        </h2>

        <p className="sidebar-label">MAIN MENU</p>

        <nav>
          <Link to="/dashboard">🏠 Dashboard</Link>
          <Link to="/products">📦 Products</Link>
          <Link to="/inventory" className="active">📋 Inventory</Link>
          <Link to="/sales">💳 Sales</Link>
          <Link to="/reports">📊 Reports</Link>
        </nav>

        <div className="sidebar-bottom">
          <Link to="/">🚪 Back to Website</Link>
        </div>
      </aside>

      <main className="inventory-main">
        <header className="inventory-header">
          <div>
            <h1>Inventory Management</h1>
            <p>Monitor and manage your available stock.</p>
          </div>
        </header>

        <section className="inventory-summary">
          <div className="inventory-card">
            <span>Total Stock Units</span>
            <h2>{totalUnits}</h2>
          </div>

          <div className="inventory-card">
            <span>Products in Stock</span>
            <h2>{productsInStock}</h2>
          </div>

          <div className="inventory-card warning">
            <span>Low Stock Items</span>
            <h2>{lowStock}</h2>
          </div>

          <div className="inventory-card danger">
            <span>Out of Stock</span>
            <h2>{outOfStock}</h2>
          </div>
        </section>

        {selectedProduct !== null && (
          <section className="stock-update-form">
            <h2>Update Stock Quantity</h2>

            <form onSubmit={handleUpdateStock}>
              <input
                type="number"
                min="0"
                step="1"
                placeholder="Enter new quantity"
                value={newQuantity}
                onChange={(event) => setNewQuantity(event.target.value)}
                required
              />

              <button type="submit">Update Stock</button>

              <button
                type="button"
                className="stock-cancel-btn"
                onClick={() => {
                  setSelectedProduct(null);
                  setNewQuantity("");
                }}
              >
                Cancel
              </button>
            </form>
          </section>
        )}

        <section className="inventory-table-container">
          <div className="inventory-table-header">
            <h2>Stock Overview</h2>

            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="inventory-table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Available Quantity</th>
                  <th>Minimum Stock</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredInventory.length > 0 ? (
                  filteredInventory.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.quantity}</td>
                      <td>{product.minimum ?? 10}</td>

                      <td>
                        <span
                          className={
                            product.quantity === 0
                              ? "stock-out"
                              : product.quantity <= (product.minimum ?? 10)
                              ? "stock-low"
                              : "stock-available"
                          }
                        >
                          {product.quantity === 0
                            ? "Out of Stock"
                            : product.quantity <= (product.minimum ?? 10)
                            ? "Low Stock"
                            : "In Stock"}
                        </span>
                      </td>

                      <td>
                        <button
                          className="stock-update-btn"
                          onClick={() => {
                            setSelectedProduct(product.id);
                            setNewQuantity(String(product.quantity));
                          }}
                        >
                          Update
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

export default Inventory;
