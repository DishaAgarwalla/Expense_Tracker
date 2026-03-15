import { NavLink } from "react-router-dom";

function Sidebar({ sidebarOpen }) {
  const menuItems = [
    { path: "/dashboard", icon: "📊", label: "Dashboard" },
    { path: "/expenses", icon: "💰", label: "Expenses" },
    { path: "/analytics", icon: "📈", label: "Analytics" },
    { path: "/budget", icon: "🎯", label: "Budget" },
    { path: "/settings", icon: "⚙️", label: "Settings" },
  ];

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            {sidebarOpen && <span className="sidebar-label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;