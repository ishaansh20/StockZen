import React from "react";
function Team() {
  return (
    <div className="container">
      <div className="row py-3 border-top">
        <h1 className="text-center fs-2">Our Values</h1>
      </div>
      <div
        className="row py-5 text-muted"
        style={{ lineHeight: "1.8", fontSize: "16px" }}
      >
        <div className="col-6 p-5">
          <h4 className="mb-4">Transparency</h4>
          <p>
            We believe in complete transparency in pricing and operations. No
            hidden charges, no surprises - just honest, straightforward trading
            and investment services.
          </p>
          <p>
            Our commitment to transparency extends to every aspect of our
            platform, from fee structures to data security practices.
          </p>
        </div>
        <div className="col-6 p-5">
          <h4 className="mb-4">Innovation</h4>
          <p>
            Technology is at the heart of everything we do. We continuously
            innovate to provide cutting-edge tools and features that empower
            traders and investors.
          </p>
          <p>
            From advanced charting to real-time analytics, we're committed to
            building the best trading experience possible.
          </p>
        </div>
      </div>
      <div
        className="row py-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "16px" }}
      >
        <div className="col-6 p-5">
          <h4 className="mb-4">Customer First</h4>
          <p>
            Your success is our success. We prioritize customer satisfaction
            above all else, providing responsive support and educational
            resources to help you make informed decisions.
          </p>
          <p>
            Our dedicated support team is always ready to assist you with any
            questions or concerns.
          </p>
        </div>
        <div className="col-6 p-5">
          <h4 className="mb-4">Security</h4>
          <p>
            We employ industry-leading security measures to protect your data
            and investments. Your trust is our most valuable asset, and we take
            every precaution to safeguard it.
          </p>
          <p>
            With encrypted transactions and secure authentication, your account
            remains protected at all times.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
