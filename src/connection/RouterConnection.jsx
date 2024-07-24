import React from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Outlet } from "react-router-dom";
import Dashboard from "../pages/private/Dashboard";

function RouterConnection() {
  return (
    <div>
      <Sidebar />
      <main
        className="h-100"
        style={{
          minHeight: "667px",
          paddingTop: "85.7188px",
        }}
      >
        <Header />
        <div
          className="main-container container"
          style={{ paddingBottom: "60px" }}
        >
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default RouterConnection;
