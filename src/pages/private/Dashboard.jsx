import React, { useEffect, useState } from "react";
import { ApiCall } from "../../services/ApiCall";
import { DashboardCounts } from "../../services/BaseUrls";

function Dashboard() {
  const [dashboardData, setdashboardData] = useState(null);
  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {
    const response = await ApiCall("get", DashboardCounts);
    if (response?.status) {
      console.log(response);
      setdashboardData(response?.message?.data);
    }
  };

  return (
    <div>
      {/* <div className="row mb-4">
        <div className="col-12">
          <div className="card theme-bg text-center">
            <div className="card-body">
              <div className="row">
                <div className="col align-self-center">
                  <h1>15% OFF</h1>
                  <p className="size-12 text-muted">
                    On every bill pay, launch offer get 5% Extra
                  </p>
                  <div className="tag border-dashed border-opac">
                    BILLPAY15OFF
                  </div>
                </div>
                <div className="col-6 align-self-center ps-0">
                  <img
                    src="assets/img/offergraphics.png"
                    alt
                    className="mw-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="row mb-4">
        <div className="col-12">
          <div className="card theme-bg text-center">
            <div className="card-body">
              <div className="row">
                <div className="col align-self-center">
                  <h1>{dashboardData?.todaysTotalOrderAmount ?? 0} ₹</h1>
                  <p className="size-12 text-muted">
                    is the total amount of todays order
                  </p>
                  {/* <div className="tag border-dashed border-opac">
                    BILLPAY15OFF
                  </div> */}
                </div>
                <div className="col-6 align-self-center ps-0">
                  <img
                    src="assets/img/offergraphics.png"
                    alt
                    className="mw-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3" style={{ marginTop: "-30px" }}>
        <div className="col">
          <h6 className="title">Todays Order Report</h6>
        </div>
        <div className="col-auto"></div>
      </div>
      <div className="row mb-4" style={{ marginTop: "-20px" }}>
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card mb-3">
            <div className="card-body">
              <div className="row p-2">
                <div className="col-auto align-self-center ps-0">
                  <p
                    className="small mb-1"
                    style={{ color: "blue", fontWeight: "bold" }}
                  >
                    Total Order
                  </p>
                  <p>
                    <b> {dashboardData?.todaysTotalOrders ?? 0}</b> Nos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card mb-3">
            <div className="card-body">
              <div className="row p-2">
                <div className="col-auto align-self-center ps-0">
                  <p
                    className="small mb-1"
                    style={{ color: "blue", fontWeight: "bold" }}
                  >
                    Pending Order
                  </p>
                  <p>
                    <b> {dashboardData?.todaysPendingOrders ?? 0}</b> Nos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card mb-3">
            <div className="card-body">
              <div className="row p-2">
                <div className="col-auto align-self-center ps-0">
                  <p
                    className="small mb-1"
                    style={{ color: "blue", fontWeight: "bold" }}
                  >
                    Delivered Order
                  </p>
                  <p>
                    <b> {dashboardData?.todaysDeliveredOrders ?? 0}</b> Nos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card mb-3">
            <div className="card-body">
              <div className="row p-2">
                <div className="col-auto align-self-center ps-0">
                  <p
                    className="small mb-1"
                    style={{ color: "blue", fontWeight: "bold" }}
                  >
                    Canceled Order
                  </p>
                  <p>
                    <b> {dashboardData?.todaysCanceledOrders ?? 0}</b> Nos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="col-12 col-md-4 col-lg-6">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-auto">
                  <div className="avatar avatar-40 alert-danger text-danger rounded-circle">
                    <i className="bi bi-house" />
                  </div>
                </div>
                <div className="col align-self-center ps-0">
                  <div className="row mb-2">
                    <div className="col">
                      <p className="small text-muted mb-0">Home Loan</p>
                      <p>3510.00 $</p>
                    </div>
                    <div className="col-auto text-end">
                      <p className="small text-muted mb-0">Next EMI</p>
                      <p className="small">1 Aug 2024</p>
                    </div>
                  </div>
                  <div className="progress alert-danger h-4">
                    <div
                      className="progress-bar bg-danger w-50"
                      role="progressbar"
                      aria-valuenow={25}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="card theme-bg text-center">
            <div className="card-body">
              <div className="row">
                <div className="col align-self-center">
                  <h1>{dashboardData?.thisMonthTotalOrderAmount ?? 0} ₹</h1>
                  <p className="size-12 text-muted">
                    is the total amount of this month order
                  </p>
                  {/* <div className="tag border-dashed border-opac">
                    BILLPAY15OFF
                  </div> */}
                </div>
                <div className="col-6 align-self-center ps-0">
                  <img
                    src="assets/img/offergraphics.png"
                    alt
                    className="mw-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3" style={{ marginTop: "-30px" }}>
        <div className="col">
          <h6 className="title">This month Order Report</h6>
        </div>
        <div className="col-auto"></div>
      </div>
      <div className="row mb-4" style={{ marginTop: "-20px" }}>
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card mb-3">
            <div className="card-body">
              <div className="row p-2">
                <div className="col-auto align-self-center ps-0">
                  <p
                    className="small mb-1"
                    style={{ color: "blue", fontWeight: "bold" }}
                  >
                    Total Order
                  </p>
                  <p>
                    <b> {dashboardData?.thisMonthOrders ?? 0}</b> Nos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card mb-3">
            <div className="card-body">
              <div className="row p-2">
                <div className="col-auto align-self-center ps-0">
                  <p
                    className="small mb-1"
                    style={{ color: "blue", fontWeight: "bold" }}
                  >
                    Pending Order
                  </p>
                  <p>
                    <b> {dashboardData?.thisMonthPendingOrders ?? 0}</b> Nos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card mb-3">
            <div className="card-body">
              <div className="row p-2">
                <div className="col-auto align-self-center ps-0">
                  <p
                    className="small mb-1"
                    style={{ color: "blue", fontWeight: "bold" }}
                  >
                    Delivered Order
                  </p>
                  <p>
                    <b> {dashboardData?.thisMonthDeliveredOrders ?? 0}</b> Nos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-4 col-lg-3">
          <div className="card mb-3">
            <div className="card-body">
              <div className="row p-2">
                <div className="col-auto align-self-center ps-0">
                  <p
                    className="small mb-1"
                    style={{ color: "blue", fontWeight: "bold" }}
                  >
                    Canceled Order
                  </p>
                  <p>
                    <b> {dashboardData?.thisMonthCanceledOrders ?? 0}</b> Nos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="col-12 col-md-4 col-lg-6">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-auto">
                  <div className="avatar avatar-40 alert-danger text-danger rounded-circle">
                    <i className="bi bi-house" />
                  </div>
                </div>
                <div className="col align-self-center ps-0">
                  <div className="row mb-2">
                    <div className="col">
                      <p className="small text-muted mb-0">Home Loan</p>
                      <p>3510.00 $</p>
                    </div>
                    <div className="col-auto text-end">
                      <p className="small text-muted mb-0">Next EMI</p>
                      <p className="small">1 Aug 2024</p>
                    </div>
                  </div>
                  <div className="progress alert-danger h-4">
                    <div
                      className="progress-bar bg-danger w-50"
                      role="progressbar"
                      aria-valuenow={25}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Dashboard;
