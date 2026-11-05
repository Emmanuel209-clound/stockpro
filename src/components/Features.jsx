import {
  Inventory2Outlined,
  PointOfSaleOutlined,
  NotificationsActiveOutlined,
  AssessmentOutlined,
  LocalShippingOutlined,
  SecurityOutlined,
} from "@mui/icons-material";

import "./Features.css";

const Features = () => {
  const features = [
    {
      icon: <Inventory2Outlined />,
      title: "Inventory Management",
      description:
        "Manage your products, monitor stock quantities and keep your inventory organised.",
    },
    {
      icon: <PointOfSaleOutlined />,
      title: "Sales Tracking",
      description:
        "Record sales transactions, monitor daily revenue and keep track of business performance.",
    },
    {
      icon: <NotificationsActiveOutlined />,
      title: "Low Stock Alerts",
      description:
        "Get notified when products are running low so you can restock before they run out.",
    },
    {
      icon: <AssessmentOutlined />,
      title: "Reports & Analytics",
      description:
        "Understand your business performance through organised reports and useful insights.",
    },
    {
      icon: <LocalShippingOutlined />,
      title: "Supplier Management",
      description:
        "Keep supplier information organised and manage your product restocking process.",
    },
    {
      icon: <SecurityOutlined />,
      title: "Secure Access",
      description:
        "Keep your business information protected with controlled access to your system.",
    },
  ];

  return (
    <section className="features-section" id="features">
      <div className="features-container">

        <div className="features-heading">
          <span className="features-tag">WHAT WE OFFER</span>

          <h1>
            Powerful Features for
            <span> Smarter Business Management</span>
          </h1>

          <p>
            Everything you need to manage inventory, track sales
            and make better business decisions, all in one place.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

              <span className="feature-number">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;