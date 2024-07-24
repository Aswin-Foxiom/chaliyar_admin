import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  CategoryPath,
  IndexPath,
  OrderPath,
  ProductsPath,
  SettingsPath,
} from "../services/urlPaths";
import { ContextDatas } from "../services/Context";

function Footer() {
  const { urlPath, seturlPath } = useContext(ContextDatas);
  return (
    <footer className="footer">
      <div className="container">
        <ul className="nav nav-pills nav-justified">
          <li className="nav-item">
            <Link
              to={IndexPath}
              onClick={() => seturlPath("/")}
              className={urlPath === "/" ? "nav-link active" : "nav-link"}
            >
              <span>
                <i className="nav-icon bi bi-house" />
                <span className="nav-text">Home</span>
              </span>
            </Link>
          </li>

          <li className="nav-item ">
            <Link
              to={IndexPath + CategoryPath}
              className={
                urlPath === "/category" ? "nav-link active" : "nav-link"
              }
              onClick={() => seturlPath("/category")}
            >
              <span>
                <i className="nav-icon bi bi-laptop" />
                <span className="nav-text">Category</span>
              </span>
            </Link>
          </li>
          {/* <li className="nav-item centerbutton">
            <div className="nav-link">
              <span className="theme-radial-gradient">
                <i className="close bi bi-x" />
                <img
                  src="assets/img/centerbutton.svg"
                  className="nav-icon"
                  alt
                />
              </span>
              <div className="nav-menu-popover justify-content-between">
                <button
                  type="button"
                  className="btn btn-lg btn-icon-text"
                  onclick="window.location.replace('pay.html');"
                >
                  <i className="bi bi-credit-card size-32" />
                  <span>Pay</span>
                </button>
                <button
                  type="button"
                  className="btn btn-lg btn-icon-text"
                  onclick="window.location.replace('sendmoney.html');"
                >
                  <i className="bi bi-arrow-up-right-circle size-32" />
                  <span>Send</span>
                </button>
                <button
                  type="button"
                  className="btn btn-lg btn-icon-text"
                  onclick="window.location.replace('bills.html');"
                >
                  <i className="bi bi-receipt size-32" />
                  <span>Bills</span>
                </button>
                <button
                  type="button"
                  className="btn btn-lg btn-icon-text"
                  onclick="window.location.replace('receivemoney.html');"
                >
                  <i className="bi bi-arrow-down-left-circle size-32" />
                  <span>Receive</span>
                </button>
              </div>
            </div>
          </li> */}
          <li className="nav-item">
            <Link
              to={IndexPath + ProductsPath}
              onClick={() => seturlPath("/products")}
              className={
                urlPath === "/products" ? "nav-link active" : "nav-link"
              }
            >
              <span>
                <i className="nav-icon bi bi-gift" />
                <span className="nav-text">Products</span>
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={IndexPath + OrderPath}
              onClick={() => seturlPath("/orders")}
              className={urlPath === "/orders" ? "nav-link active" : "nav-link"}
            >
              <span>
                <i className="nav-icon bi bi-wallet2" />
                <span className="nav-text">Order</span>
              </span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to={IndexPath + SettingsPath}
              onClick={() => seturlPath("/settings")}
              className={
                urlPath === "/settings" ? "nav-link active" : "nav-link"
              }
            >
              <span>
                <i className="nav-icon bi bi-laptop" />
                <span className="nav-text">Settings</span>
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
