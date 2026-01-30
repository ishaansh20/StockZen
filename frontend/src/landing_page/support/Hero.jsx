import React from "react";
function Hero() {
  return (
    <div className="support-hero">
      <div className="container">
        <div className="hero-header">
          <h1>Support Portal</h1>
          <button className="my-tickets-btn">My tickets</button>
        </div>

        <div className="hero-search">
          <input
            type="text"
            placeholder="Eg: How do I open my account, How do I activate F&O..."
          />
        </div>
      </div>
    </div>
  );
}
export default Hero;
