import axios from "axios";
import { BaseUrl } from "./BaseUrls";
import { showToast } from "../utils/Toast";

export const ApiCall = async (method, endPoint, data, params, is_formdata) => {
  var headers = {
    "Content-Type": is_formdata ? "multipart/form-data" : "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  var url = BaseUrl + endPoint;

  try {
    const res = await axios({
      method,
      url,
      params,
      data,
      headers,
    });
    var response = { status: true, message: res.data };

    return response;
  } catch (error) {
    if (error?.response?.status === 401) {
      if (localStorage.getItem("token")) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    showToast(
      error?.response?.data?.message ?? "something went wrong",
      "error"
    );
    return {
      status: false,
      message: error?.response?.data?.message ?? "something went wrong",
    };
  }
};
