import React from "react";
import { Link } from "react-router-dom";

function Universe() {
  return (
    <div className="container">
      <div className="row text-center mt-5">
        <h1>The StockZen Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
        <div className="col-4 p-3 mt-5 ">
          <img
            style={{ width: "70%" }}
            src="media/images/zerodhaFundhouse.png"
          />
          <p
            className="text-small text-muted mt-3"
            style={{ fontSize: "13px" }}
          >
            Our asset management venture <br />
            that is creating simple and transparent index <br />
            funds to help you save for your goals.
          </p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img style={{ width: "70%" }} src="media/images/sensibullLogo.svg" />
          <p
            className="text-small text-muted "
            style={{ paddingTop: "38px", fontSize: "13px" }}
          >
            Options trading platform that lets you <br />
            create strategies, analyze positions, and examine <br /> data points
            like open interest, FII/DII, and more.
          </p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img style={{ width: "50%" }} src="media/images/tijori.svg" />
          <p
            className="text-small text-muted"
            style={{ paddingTop: "16px", fontSize: "13px" }}
          >
            Investment research platform <br /> that offers detailed insights on
            stocks,
            <br /> sectors, supply chains, and more.
          </p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img style={{ width: "50%" }} src="media/images/streakLogo.png" />
          <p
            className="text-small text-muted"
            style={{ paddingTop: "6px", fontSize: "13px" }}
          >
            Systematic trading platform <br /> that allows you to create and
            backtest <br />
            strategies without coding.
          </p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/smallcaseLogo.png" />
          <p
            className="text-small text-muted"
            style={{ fontSize: "13px", paddingTop: "12px" }}
          >
            Thematic investing platform <br />
            that helps you invest in diversified <br />
            baskets of stocks on ETFs.
          </p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img style={{ width: "40%" }} src="media/images/dittoLogo.png" />
          <p
            className="text-small text-muted"
            style={{ fontSize: "13px", paddingTop: "12px" }}
          >
            Personalized advice on life
            <br />
            and health insurance. No spam <br />
            and no mis-selling.
          </p>
        </div>
        <Link to="/signup">
          <button
            className="p-3 btn btn-primary fs-5 mb-5"
            style={{ width: "20%", margin: "0 auto" }}
          >
            Sign up now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Universe;
