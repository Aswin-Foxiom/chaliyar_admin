import React from "react";

function Header() {
  return (
    <header className="header position-fixed">
      <div className="row">
        <div className="col-auto">
          <a
            href="#"
            onClick={() => window.history.back()}
            className="btn btn-light btn-44 menu-btn"
          >
            <i className="bi bi-arrow-left" />
          </a>
        </div>
        <div className="col align-self-center text-center">
          <div className="logo-small">
            {/* <img src="assets/img/logo.png" alt /> */}
            <h5>Chaliyar Fish Hub</h5>
          </div>
        </div>
        <div className="col-auto">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="btn btn-light btn-44"
          >
            <i className="bi bi-power" />
            {/* <span className="count-indicator" /> */}
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
