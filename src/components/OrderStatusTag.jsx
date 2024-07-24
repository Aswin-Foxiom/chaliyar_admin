import React from "react";

const OrderStatusTag = ({ status }) => {
  let bgColor;
  let text;

  switch (status) {
    case "pending":
      bgColor = "bg-warning";
      text = "Pending";
      break;
    case "delivered":
      bgColor = "bg-success";
      text = "Delivered";
      break;
    default:
      bgColor = "bg-danger";
      text = "Cancelled";
  }

  return (
    <div
      className={`tag ${bgColor} text-white py-2 px-2`}
      style={{ width: "100%", textAlign: "center" }}
    >
      {text}
    </div>
  );
};

export default OrderStatusTag;
