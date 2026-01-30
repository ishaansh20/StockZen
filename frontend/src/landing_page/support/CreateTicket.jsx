import React, { useState } from "react";

const supportData = [
  {
    title: "Account Opening",
    links: [
      "Resident individual",
      "Minor",
      "Non Resident Indian (NRI)",
      "Company, Partnership, HUF and LLP",
      "Glossary",
    ],
  },
  {
    title: "Your StockZen Account",
    links: [
      "Your Profile",
      "Account modification",
      "Client Master Report (CMR) and Depository Participant (DP)",
      "Nomination",
      "Transfer and conversion of securities",
    ],
  },
  {
    title: "Kite",
    links: [
      "IPO",
      "Trading FAQs",
      "Margin Trading Facility (MTF) and Margins",
      "Charts and orders",
      "Alerts and Nudges",
      "General",
    ],
  },
  {
    title: "Funds",
    links: ["Add money", "Withdraw money", "Add bank accounts", "eMandates"],
  },
  {
    title: "Console",
    links: [
      "Portfolio",
      "Corporate actions",
      "Funds statement",
      "Reports",
      "Profile",
      "Segments",
    ],
  },
  {
    title: "Coin",
    links: [
      "Mutual funds",
      "National Pension Scheme (NPS)",
      "Fixed Deposit (FD)",
      "Features on Coin",
      "Payments and Orders",
      "General",
    ],
  },
];

function CreateTicket() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(index === openIndex ? -1 : index);
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8">
          {supportData.map((section, index) => (
            <div key={index} className="accordion-box">
              <div
                className="accordion-header"
                onClick={() => toggleAccordion(index)}
              >
                <div className="d-flex align-items-center">
                  <span className="circle-icon">+</span>
                  <span>{section.title}</span>
                </div>
                <span className="chevron">
                  {openIndex === index ? "˄" : "˅"}
                </span>
              </div>

              {openIndex === index && (
                <ul className="accordion-content">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <a href="/">{link}</a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="col-md-4">
          <div className="alert-box mb-4">
            <ul>
              <li>
                <a href="/">Orders rejected in MCX segment</a>
                <span className="resolved"> [Resolved]</span>
              </li>
              <li>
                <a href="/">Offer for sale (OFS) – January 2026</a>
              </li>
            </ul>
          </div>

          <div className="quick-links">
            <h6>Quick links</h6>
            <ul>
              <li>
                <a href="/">Track account opening</a>
              </li>
              <li>
                <a href="/">Track segment activation</a>
              </li>
              <li>
                <a href="/">Intraday margins</a>
              </li>
              <li>
                <a href="/">Kite user manual</a>
              </li>
              <li>
                <a href="/">Learn how to create a ticket</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
