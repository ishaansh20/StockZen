import React from "react";
import Menu from "./Menu";

const TopBar = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const username = user.username || "User";
  const role = user.role || "user";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "http://localhost:5174/login";
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "#ff6b6b";
      case "trader":
        return "#4ecdc4";
      default:
        return "#95a5a6";
    }
  };

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">{100.2} </p>
          <p className="percent"> </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">{100.2}</p>
          <p className="percent"></p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {user.username && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ color: "#666", fontWeight: "500" }}>
              Welcome, {username}
            </span>
            <span
              style={{
                padding: "4px 8px",
                background: getRoleBadgeColor(role),
                color: "white",
                borderRadius: "12px",
                fontSize: "0.75rem",
                fontWeight: "600",
                textTransform: "uppercase",
              }}
            >
              {role}
            </span>
          </div>
        )}
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            background: "#ff4757",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Logout
        </button>
        <Menu />
      </div>
    </div>
  );
};

export default TopBar;
