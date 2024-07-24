import React, { useEffect, useState } from "react";
import { ApiCall } from "../../services/ApiCall";
import { OrdersUrl } from "../../services/BaseUrls";
import NoDataFound from "../../components/NoDataFound";
import { useNavigate } from "react-router-dom";
import { IndexPath, OrderDetailsPath } from "../../services/urlPaths";
import OrderStatusTag from "../../components/OrderStatusTag";
import { formatDate, formatTime } from "../../utils/DateFormatting";
import { InputSwitch } from "primereact/inputswitch";

function OrderListing() {
  const today = new Date().toISOString().split("T")[0];

  const getFirstDayOfMonth = () => {
    const date = new Date();
    date.setDate(1);
    return date.toISOString().split("T")[0];
  };
  let navigate = useNavigate();
  const [ordersList, setordersList] = useState([]);
  const [status, setstatus] = useState("");
  const [orderId, setorderId] = useState("");
  const [fromDate, setfromDate] = useState("");
  const [toDate, settoDate] = useState("");
  const [checked, setChecked] = useState(false);
  const [pages, setpages] = useState({
    page: 1,
    limit: 20,
  });
  const [pagination, setpagination] = useState({
    hasNextPage: false,
    hasPreviousPage: false,
  });

  useEffect(() => {
    setfromDate(getFirstDayOfMonth());
    settoDate(today);
  }, [today]);

  useEffect(() => {
    getOrders();
  }, [status, orderId, fromDate, toDate, pages]);

  const getOrders = async () => {
    const response = await ApiCall(
      "get",
      OrdersUrl,
      {},
      {
        status,
        orderId,
        fromDate,
        toDate,
        page: pages?.page,
        limit: pages?.limit,
      }
    );
    if (response?.status) {
      setordersList(response?.message?.data?.docs ?? []);
      setpagination({
        hasPreviousPage: response?.message?.data?.hasPreviousPage ?? false,
        hasNextPage: response?.message?.data?.hasNextPage ?? false,
      });
    }
  };
  return (
    <div>
      <div className="row mb-3">
        <div className="col">
          <h6 className="title">Filter</h6>
        </div>
        <div className="col-auto align-self-center">
          <InputSwitch
            checked={checked}
            onChange={(e) => setChecked(e.value)}
          />
        </div>
      </div>

      {checked ? (
        <>
          <div className="form-group form-floating ">
            <input
              type="text"
              className="form-control "
              id="search"
              value={orderId}
              onChange={(e) => setorderId(e.target.value)}
              placeholder="Search"
            />
            <label className="form-control-label" htmlFor="search">
              Search By Order ID
            </label>
            {orderId != "" ? (
              <button
                type="button"
                className="text-color-theme tooltip-btn"
                style={{ marginTop: "-15px" }}
                onClick={() => setorderId("")}
              >
                <i className="bi bi-x-lg" />
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="form-group form-floating">
            <div className="row">
              <div className="col-12" style={{ textAlign: "right" }}>
                <h6
                  className="title"
                  onClick={() => {
                    setfromDate(getFirstDayOfMonth());
                    settoDate(today);
                  }}
                >
                  Filter
                </h6>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label className="form-control-label" htmlFor="search">
                  From Date
                </label>
                <input
                  type="date"
                  value={fromDate}
                  max={today}
                  onChange={(e) => setfromDate(e.target.value)}
                  className="form-control"
                  placeholder="From Date"
                />
              </div>

              <div className="col-6">
                <label className="form-control-label" htmlFor="search">
                  To Date
                </label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => settoDate(e.target.value)}
                  max={today}
                  min={fromDate}
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <div class="row mb-2">
            <div class="col-12 px-0">
              <div class="swiper-container tagsswiper">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" onClick={() => setstatus(null)}>
                    <div class={`tag ${!status ? "active" : ""}`}>All</div>
                  </div>
                  <div
                    class="swiper-slide"
                    onClick={() => setstatus("pending")}
                  >
                    <div class={`tag ${status === "pending" ? "active" : ""}`}>
                      Pending
                    </div>
                  </div>
                  <div
                    class="swiper-slide"
                    onClick={() => setstatus("delivered")}
                  >
                    <div
                      class={`tag ${status === "delivered" ? "active" : ""}`}
                    >
                      Delivered
                    </div>
                  </div>
                  <div
                    class="swiper-slide"
                    onClick={() => setstatus("canceled")}
                  >
                    <div class={`tag ${status === "canceled" ? "active" : ""}`}>
                      Canceled
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      <div className="row mb-3">
        <div className="col">
          <h6 className="title">Orders</h6>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {ordersList?.length ? (
            <>
              {ordersList?.map((value, key) => (
                <div
                  className="card mb-3"
                  onClick={() => {
                    return navigate(
                      `${IndexPath + OrderDetailsPath}/${value?._id}`
                    );
                  }}
                >
                  <div className="card-body">
                    <div className="row">
                      <div className="col align-self-center ps-3">
                        <p className="small mb-1">
                          <a
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            className="fw-medium"
                          >
                            {value?.orderId}
                          </a>{" "}
                          <br />
                          {/* <span className="text-muted">request send</span> */}
                        </p>
                        <p>
                          {`${value?.firstName} ${value?.lastName}`} ,{" "}
                          <span className="text-muted">
                            <b> ₹ {value?.total}</b> <br />
                          </span>{" "}
                          <small className="text-muted">
                            {formatDate(value?.createdAt ?? "")}{" "}
                            {formatTime(value?.createdAt ?? "")}
                          </small>
                        </p>
                      </div>
                      <div className="col-auto">
                        {/* <button className="btn btn-44 btn-light text-danger shadow-sm">
                          <i className="bi bi-trash" />
                        </button> */}
                        <OrderStatusTag status={value?.status ?? null} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="row" style={{ textAlign: "center" }}>
                <div className="col">
                  {pagination?.hasPreviousPage ? (
                    <h6
                      className="title"
                      onClick={() =>
                        setpages({ ...pages, page: pages?.page - 1 })
                      }
                      style={{ marginRight: "10px" }}
                    >
                      {"<< "}Previous
                    </h6>
                  ) : (
                    ""
                  )}
                  {pagination?.hasNextPage ? (
                    <h6
                      className="title"
                      onClick={() =>
                        setpages({ ...pages, page: pages?.page + 1 })
                      }
                    >
                      Next {" >>"}
                    </h6>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </>
          ) : (
            <NoDataFound />
          )}
          {/* <div className="card mb-3">
            <div className="card-body">
              <div className="row">
                <div className="col-auto">
                  <div className="avatar avatar-44 shadow-sm rounded-10">
                    <img src="assets/img/user3.jpg" alt />
                  </div>
                </div>
                <div className="col align-self-center ps-0">
                  <p className="small mb-1">
                    <a href="profile.html" className="fw-medium">
                      Shelvey
                    </a>{" "}
                    <span className="text-muted">request send</span>
                  </p>
                  <p>
                    150 <span className="text-muted">$</span>{" "}
                    <small className="text-muted">1 min ago</small>
                  </p>
                </div>
                <div className="col-auto">
                  <button className="btn btn-44 btn-light text-danger shadow-sm">
                    <i className="bi bi-trash" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <div className="row">
                <div className="col-auto">
                  <div className="avatar avatar-44 shadow-sm rounded-10">
                    <img src="assets/img/user4.jpg" alt />
                  </div>
                </div>
                <div className="col align-self-center ps-0">
                  <p className="small mb-1">
                    <a href="profile.html" className="fw-medium">
                      John Pattent
                    </a>
                    <span className="text-muted">request send</span>
                  </p>
                  <p>
                    150 <span className="text-muted">$</span>{" "}
                    <small className="text-muted">5 min ago</small>
                  </p>
                </div>
                <div className="col-auto">
                  <button className="btn btn-44 btn-light text-danger shadow-sm">
                    <i className="bi bi-trash" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <div className="row">
                <div className="col-auto">
                  <div className="avatar avatar-44 shadow-sm rounded-10">
                    <img src="assets/img/user2.jpg" alt />
                  </div>
                </div>
                <div className="col align-self-center ps-0">
                  <p className="small mb-1">
                    <a href="profile.html" className="fw-medium">
                      Alice Doe
                    </a>
                    <span className="text-muted">helped you</span>
                  </p>
                  <div className="row">
                    <div className="col">
                      <p>
                        150 <span className="text-muted">$</span>
                      </p>
                    </div>
                    <div className="col-auto">
                      <div className="tag bg-success border-success text-white py-1 px-2">
                        Completed
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default OrderListing;
