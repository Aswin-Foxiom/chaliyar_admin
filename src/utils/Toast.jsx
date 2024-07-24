import React, { useRef } from "react";
import { Toast } from "primereact/toast";

let toastRef = null;

export const setToastRef = (ref) => {
  toastRef = ref;
};

export const showToast = (message, type) => {
  if (!toastRef) {
    console.error("Toast reference is not set.");
    return; // Exit early if toast reference is not set
  }

  toastRef.current.show({
    severity: type,
    summary: type === "success" ? "Success" : "Failed",
    detail: message,
    life: 5000,
  });
};

export default function ToastContainer() {
  const toast = useRef(null);

  // Set the toast reference when the component mounts
  setToastRef(toast);

  return (
    <Toast
      ref={toast}
      position="top-right"
      limit={1}
      animation={{ duration: 300, easing: "ease-out" }}
    />
  );
}
