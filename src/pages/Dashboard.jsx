
import { Link } from "react-router-dom";
import { useStock } from "../context/StockContext";
import "./Dashboard.css";

const Dashboard = () => {
  // Get shared products and sales
  const { products, sales } = useStock();

  // Calculate total revenue from all recorded sales
  const totalRevenue = sales.reduce(
    (total, sale) => total + Number(sale.amount || 0),
    0
  );

  // Count products that need restocking
  const lowStock = products.filter(
    (product) =>
      product.quantity > 0 &&
      product.quantity <= (product.minimum ?? 10)
  ).length;

  // Format amounts as Nigerian Naira
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);

  // Dashboard statistics
  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: "📦",
      change: "Registered products",
    },
    {
      title: "Total Sales",
      value: sales.length,
      icon: "💰",
      change: "Recorded transactions",
    },
    {
      title: "Low Stock Items",
      value: lowStock,
      icon: "⚠️",
      change: "Needs attention",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(totalRevenue),
      icon: "📊",
      change: "From recorded sales",
    },
  ];

  // Show the five most recent transactions
  const recentTransactions = [...sales]
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, 5);

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <h2>
          Stock<span>Pro</span>
        </h2>

        <p className="sidebar-label">MAIN MENU</p>

        <nav>
          <Link to="/dashboard" className="active">🏠 Dashboard</Link>
          <Link to="/products">📦 Products</Link>
          <Link to="/inventory">📋 Inventory</Link>
          <Link to="/sales">💳 Sales</Link>
          <Link to="/reports">📊 Reports</Link>
        </nav>

        <div className="sidebar-bottom">
          <Link to="/">🚪 Back to Website</Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">

        <header className="dashboard-header">
          <div>
            <h1>Dashboard Overview</h1>
            <p>
              Welcome back! Here's what's happening with your business.
            </p>
          </div>

          <div className="dashboard-user">
            <span>👤</span>
            <div>
              <h4>Administrator</h4>
              <small>StockPro User</small>
            </div>
          </div>
        </header>

        {/* STATISTICS */}
        <section className="dashboard-stats">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index}>
              <div className="stat-top">
                <span>{stat.title}</span>
                <span className="stat-icon">{stat.icon}</span>
              </div>

              <h2>{stat.value}</h2>
              <small>{stat.change}</small>
            </div>
          ))}
        </section>

        {/* LOWER CONTENT */}
        <section className="dashboard-content">

          <div className="dashboard-panel">
            <h2>Business Performance</h2>
            <p>Your business overview will appear here.</p>

            <div className="performance-placeholder">
              <span>📈</span>
              <h3>Sales Performance</h3>
              <p>
                Analytics and sales charts will be added here.
              </p>
            </div>
          </div>

          <div className="dashboard-panel">
            <h2>Recent Transactions</h2>

            <div className="transaction-list">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((transaction) => (
                  <div
                    className="transaction-item"
                    key={transaction.id}
                  >
                    <div>
                      <h4>{transaction.product}</h4>
                      <small>{transaction.customer}</small>
                    </div>

                    <div className="transaction-details">
                      <strong>
                        {formatCurrency(Number(transaction.amount || 0))}
                      </strong>
                      <small>{transaction.status || "Recorded"}</small>
                    </div>
                  </div>
                ))
              ) : (
                <p>No transactions recorded yet.</p>
              )}
            </div>
          </div>

        </section>

      </main>
    </div>
  );
};

export default Dashboard;
