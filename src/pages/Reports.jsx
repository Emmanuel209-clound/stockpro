
import { useState } from "react";
import { Link } from "react-router-dom";
import { useStock } from "../context/StockContext";
import "./Reports.css";

const Reports = () => {
  // Get shared sales data
  const { sales } = useStock();

  const [search, setSearch] = useState("");

  // Calculate total revenue
  const totalRevenue = sales.reduce(
    (total, sale) => total + Number(sale.amount || 0),
    0
  );

  // Calculate total units sold
  const totalProductsSold = sales.reduce(
    (total, sale) => total + Number(sale.quantity || 0),
    0
  );

  // Count transactions
  const totalTransactions = sales.length;

  // Calculate sales for each product
  const productSales = sales.reduce((result, sale) => {
    result[sale.product] =
      (result[sale.product] || 0) + Number(sale.quantity || 0);

    return result;
  }, {});

  // Find the best-selling product
  const bestSellingProduct = Object.entries(productSales).sort(
    (a, b) => b[1] - a[1]
  )[0];

  // Format currency
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);

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
          <Link to="/sales">💳 Sales</Link>
          <Link to="/reports" className="active">📊 Reports</Link>
        </nav>

        <div className="sidebar-bottom">
          <Link to="/">🚪 Back to Website</Link>
        </div>
      </aside>

      <main className="reports-main">
        <header className="reports-header">
          <div>
            <h1>Business Reports</h1>
            <p>
              Monitor your business performance and sales activities.
            </p>
          </div>

          <span className="report-date">Sales Overview</span>
        </header>

        {/* REPORT SUMMARY */}
        <section className="reports-summary">
          <div className="report-card">
            <span>Total Revenue</span>
            <h2>{formatCurrency(totalRevenue)}</h2>
            <small>Revenue from recorded sales</small>
          </div>

          <div className="report-card">
            <span>Total Transactions</span>
            <h2>{totalTransactions}</h2>
            <small>Recorded sales transactions</small>
          </div>

          <div className="report-card">
            <span>Products Sold</span>
            <h2>{totalProductsSold}</h2>
            <small>Total units sold</small>
          </div>

          <div className="report-card">
            <span>Best Selling Product</span>
            <h2 className="best-product">
              {bestSellingProduct ? bestSellingProduct[0] : "N/A"}
            </h2>
            <small>
              {bestSellingProduct
                ? `${bestSellingProduct[1]} units sold`
                : "No sales"}
            </small>
          </div>
        </section>

        {/* SALES PERFORMANCE */}
        <section className="report-performance">
          <div className="report-section-heading">
            <h2>Sales Performance</h2>
            <span>Recorded sales overview</span>
          </div>

          <div className="performance-highlight">
            <div>
              <p>Total Revenue Generated</p>
              <h2>{formatCurrency(totalRevenue)}</h2>
            </div>

            <div className="performance-icon">📈</div>
          </div>

          <div className="report-note">
            <p>
              This report summarizes the sales transactions recorded
              in StockPro.
            </p>
          </div>
        </section>

        {/* SALES RECORDS */}
        <section className="report-table-container">
          <div className="report-table-header">
            <h2>Sales Records</h2>

            <input
              type="search"
              placeholder="Search product or customer..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="report-table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Customer</th>
                  <th>Quantity Sold</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {filteredSales.length > 0 ? (
                  filteredSales.map((sale) => (
                    <tr key={sale.id}>
                      <td>{sale.product}</td>
                      <td>{sale.customer}</td>
                      <td>{sale.quantity}</td>
                      <td>
                        {formatCurrency(Number(sale.amount || 0))}
                      </td>
                      <td>{sale.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No sales records found.</td>
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

export default Reports;
