import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiCall } from "../../services/ApiCall";
import { OrderDetailsUrl, OrdersUrl } from "../../services/BaseUrls";
import NoDataFound from "../../components/NoDataFound";
import { formatDate, formatTime } from "../../utils/DateFormatting";
import OrderStatusTag from "../../components/OrderStatusTag";
import { showToast } from "../../utils/Toast";

function OrderDetails() {
  const { id } = useParams();
  const [orderData, setorderData] = useState(null);
  const [orderedProducts, setorderedProducts] = useState([]);

  useEffect(() => {
    getOrderDetails();
    getOrder();
  }, []);

  const getOrder = async () => {
    const response = await ApiCall("get", OrdersUrl, {}, { id: id });
    if (response?.status) {
      console.log("THE ORDER DATA", response);
      setorderData(response?.message?.data?.docs?.[0]);
    }
  };

  const getOrderDetails = async () => {
    const response = await ApiCall("get", OrderDetailsUrl, {}, { orderId: id });
    if (response?.status) {
      console.log(response);
      setorderedProducts(response?.message?.data?.docs);
    }
  };

  const updateOrder = async (status) => {
    const response = await ApiCall("put", `${OrdersUrl}/${id}`, {
      status: status,
    });
    if (response?.status) {
      getOrder();
      showToast("Order updated successfully", "success");
    }
  };

  return (
    <div>
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col align-self-center ps-3">
              <h5 className="text-color-theme mb-0">{orderData?.orderId}</h5>
              <p className="text-muted">
                ₹ <b>{orderData?.total}</b>
              </p>
            </div>
            <div className="col-auto  align-self-center text-end">
              <h6 className="mb-0">
                {formatDate(orderData?.createdAt ?? null)}
              </h6>
              <p className="text-muted">
                {formatTime(orderData?.createdAt ?? null)}
              </p>
              <OrderStatusTag status={orderData?.status ?? null} />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <h6 className="title">User Details</h6>
        </div>
        <div className="col-auto"></div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <p className="text-muted">Name</p>
        </div>
        <div className="col text-end">
          <p>{`${orderData?.firstName} ${orderData?.lastName}`}</p>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <p className="text-muted">Phone</p>
        </div>
        <div className="col text-end">
          <p>{orderData?.phone}</p>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <p className="text-muted">Email</p>
        </div>
        <div className="col text-end">
          <p>{orderData?.email}</p>
        </div>
      </div>
      <hr />
      {/* <div className="row mb-3">
        <div className="col">
          <h6 className="title">Delivery Details</h6>
        </div>
        <div className="col-auto"></div>
      </div> */}

      <div className="row mb-3">
        <div className="col">
          <p className="text-muted">Address</p>
        </div>
        <div className="col text-end">
          <p>{orderData?.deliveryAddress}</p>
        </div>
      </div>
      {/* <div className="row mb-3">
        <div className="col">
          <p className="text-muted">Delivery Time</p>
        </div>
        <div className="col text-end">
          <p>{orderData?.deliveryTime ?? "NA"}</p>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <p className="text-muted">Delivery Date</p>
        </div>
        <div className="col text-end">
          <p>{orderData?.deliveryDate ?? "NA"}</p>
        </div>
      </div> */}
      <p className="small text-secondary">Order Note</p>
      <p>{orderData?.orderNote ?? "NA"}</p>
      <hr />

      <div className="row mb-3">
        <div className="col">
          <h6 className="title">Payment Details</h6>
        </div>
        <div className="col-auto"></div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <p className="text-muted">Payment Method</p>
        </div>
        <div className="col text-end">
          <p>{orderData?.paymentMethod ?? "NA"}</p>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <p className="text-muted">Payment Status</p>
        </div>
        <div className="col text-end">
          <p>{orderData?.paymentStatus ?? "NA"}</p>
        </div>
      </div>
      <hr />
      <div className="row mb-3">
        <div className="col">
          <h6 className="title">Order Details</h6>
        </div>
        <div className="col-auto"></div>
      </div>

      {orderedProducts?.length ? (
        <>
          {orderedProducts.map((value, key) => (
            <div className="row mb-3" key={key}>
              <div className="col">
                <p className="text-muted">{value?.productName}</p>
              </div>
              <div className="col text-end">
                <p className="text-muted">{value?.quantity}</p>
              </div>
              <div className="col text-end">
                <p> ₹ {value?.quantity * value?.price}</p>
              </div>
            </div>
          ))}
          <div className="row mb-3">
            <div className="col">
              <p className=" fw-bold">Total</p>
            </div>
            <div className="col text-end">
              <p className=" fw-bold">{orderData?.totalProducts}</p>
            </div>
            <div className="col text-end">
              <p className=" fw-bold">₹ {orderData?.total}</p>
            </div>
          </div>
        </>
      ) : (
        <NoDataFound />
      )}
      <hr />
      <div className="row" style={{ paddingBottom: "50px" }}>
        {orderData?.status === "delivered" ? (
          <button className="btn btn-success btn-lg shadow-sm w-100">
            Delivered
          </button>
        ) : (
          ""
        )}

        {orderData?.status === "canceled" ? (
          <button
            onClick={() => updateOrder("pending")}
            className="btn btn-danger btn-lg shadow-sm w-100"
          >
            Canceled ( click this button to change the status to Pending)
          </button>
        ) : (
          ""
        )}
        {orderData?.status === "pending" ? (
          <>
            <div className="col">
              <button
                onClick={() => updateOrder("delivered")}
                className="btn btn-success btn-lg shadow-sm w-100"
              >
                Complete
              </button>
            </div>
            <div className="col">
              <button
                onClick={() => updateOrder("canceled")}
                className="btn btn-danger btn-lg shadow-sm w-100"
              >
                Cancel
              </button>
            </div>{" "}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default OrderDetails;
