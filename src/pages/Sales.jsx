
import { useState } from "react";
import { Link } from "react-router-dom";
import { useStock } from "../context/StockContext";
import "./Sales.css";

const Sales = () => {
  // Get shared products and sales data
  const { products, setProducts, sales, setSales } = useStock();

  const [formData, setFormData] = useState({
    customer: "",
    product: "",
    quantity: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  // Find the selected product
  const selectedProduct = products.find(
    (product) => product.name === formData.product
  );

  // Calculate sale amount
  const totalAmount = selectedProduct
    ? selectedProduct.price * Number(formData.quantity || 0)
    : 0;

  // Calculate total revenue
  const totalRevenue = sales.reduce(
    (total, sale) => total + sale.amount,
    0
  );

  // Calculate total units sold
  const totalUnitsSold = sales.reduce(
    (total, sale) => total + sale.quantity,
    0
  );

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Record a new sale
  const handleSubmit = (event) => {
    event.preventDefault();

    const quantity = Number(formData.quantity);

    if (!formData.customer.trim() || !selectedProduct || !Number.isInteger(quantity) || quantity <= 0) {
      alert("Please enter valid sale information.");
      return;
    }

    // Check available stock
    if (quantity > selectedProduct.quantity) {
      alert(
        `Insufficient stock! Only ${selectedProduct.quantity} units are available.`
      );
      return;
    }

    // Create new sale record
    const newSale = {
      id: Date.now(),
      customer: formData.customer.trim(),
      product: selectedProduct.name,
      quantity,
      price: selectedProduct.price,
      amount: totalAmount,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    // Save the sale in shared data
    setSales((previousSales) => [...previousSales, newSale]);

    // Reduce the product quantity in shared data
    setProducts((previousProducts) =>
      previousProducts.map((product) =>
        product.id === selectedProduct.id
          ? {
              ...product,
              quantity: product.quantity - quantity,
            }
          : product
      )
    );

    // Reset the form
    setFormData({
      customer: "",
      product: "",
      quantity: "",
    });

    setShowForm(false);

    alert("Sale recorded successfully!");
  };

  // Search sales records
  const filteredSales = sales.filter(
    (sale) =>
      sale.product.toLowerCase().includes(search.toLowerCase()) ||
      sale.customer.toLowerCase().includes(search.toLowerCase())
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
          <Link to="/inventory">📋 Inventory</Link>
          <Link to="/sales" className="active">💳 Sales</Link>
          <Link to="/reports">📊 Reports</Link>
        </nav>

        <div className="sidebar-bottom">
          <Link to="/">🚪 Back to Website</Link>
        </div>
      </aside>

      <main className="sales-main">
        <header className="sales-header">
          <div>
            <h1>Sales Management</h1>
            <p>Record and monitor your business sales.</p>
          </div>

          <button
            className="record-sale-btn"
            onClick={() => setShowForm(!showForm)}
          >
            + Record Sale
          </button>
        </header>

        <section className="sales-summary">
          <div className="sales-card">
            <span>Total Revenue</span>
            <h2>₦{totalRevenue.toLocaleString()}</h2>
          </div>

          <div className="sales-card">
            <span>Total Transactions</span>
            <h2>{sales.length}</h2>
          </div>

          <div className="sales-card">
            <span>Units Sold</span>
            <h2>{totalUnitsSold}</h2>
          </div>
        </section>

        {showForm && (
          <section className="sale-form-container">
            <h2>Record New Sale</h2>

            <form onSubmit={handleSubmit} className="sale-form">
              <div>
                <label>Customer Name</label>
                <input
                  type="text"
                  name="customer"
                  placeholder="Enter customer name"
                  value={formData.customer}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Select Product</label>
                <select
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose a product</option>

                  {products.map((product) => (
                    <option
                      key={product.id}
                      value={product.name}
                      disabled={product.quantity <= 0}
                    >
                      {product.name} (Stock: {product.quantity})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Enter quantity"
                  min="1"
                  max={selectedProduct?.quantity || undefined}
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="sale-total">
                <span>Total Amount</span>
                <h3>₦{totalAmount.toLocaleString()}</h3>
              </div>

              <button type="submit">Save Sale</button>

              <button
                type="button"
                className="sale-cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </form>
          </section>
        )}

        <section className="sales-table-container">
          <div className="sales-table-header">
            <h2>Recent Sales</h2>

            <input
              type="search"
              placeholder="Search product or customer..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="sales-table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total Amount</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {filteredSales.length > 0 ? (
                  filteredSales.map((sale) => (
                    <tr key={sale.id}>
                      <td>{sale.customer}</td>
                      <td>{sale.product}</td>
                      <td>{sale.quantity}</td>
                      <td>₦{sale.price.toLocaleString()}</td>
                      <td>₦{sale.amount.toLocaleString()}</td>
                      <td>{sale.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No sales records found.</td>
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

export default Sales;
