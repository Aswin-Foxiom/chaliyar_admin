import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IndexPath } from "../../../services/urlPaths";
import SubCategoryDatas from "../../../components/CategoryComponents/SubCategoryDatas";
import { ApiCall } from "../../../services/ApiCall";
import { CategoryUrl } from "../../../services/BaseUrls";
import { showToast } from "../../../utils/Toast";

function CategoryDetails() {
  const { id } = useParams();
  const [CategoryData, setCategoryData] = useState({
    oldname: null,
    id: null,
    newname: null,
  });
  let navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      return navigate(IndexPath);
    }
    getCategoryDatas();
  }, []);
  const getCategoryDatas = async () => {
    const response = await ApiCall("get", CategoryUrl, {}, { id: id });
    if (response?.status) {
      console.log("THE RESPOSE", response);
      setCategoryData({
        oldname: response?.message?.data?.name,
        id: response?.message?.data?._id,
        newname: response?.message?.data?.name,
      });
    }
  };

  const updateCategory = async () => {
    const response = await ApiCall(
      "put",
      `${CategoryUrl}/${CategoryData?.id}`,
      { name: CategoryData?.newname }
    );
    if (response?.status) {
      setCategoryData({
        oldname: response?.message?.data?.name,
        id: response?.message?.data?._id,
        newname: response?.message?.data?.name,
      });
      showToast("Category updated successfully", "success");
    }
  };

  return (
    <div>
      {/* coupon code*/}
      <div className="row">
        <div className="col-12 mb-4">
          <div className="form-group form-floating is-valid">
            <input
              type="text"
              className="form-control "
              id="coupon"
              value={CategoryData?.newname}
              onChange={(e) =>
                setCategoryData({ ...CategoryData, newname: e.target.value })
              }
              placeholder="Coupon Code"
            />
            <label className="form-control-label" htmlFor="coupon">
              Category Name
            </label>
            <div className=" tooltip-btn">
              {CategoryData?.oldname === CategoryData?.newname ||
              CategoryData?.newname === "" ? (
                <button
                  disabled
                  className="float-end text-black btn btn-light text-danger shadow-sm"
                >
                  <i className="bi bi-save-fill" />
                </button>
              ) : (
                <button
                  onClick={updateCategory}
                  className="float-end text-black btn btn-light text-danger shadow-sm"
                >
                  <i className="bi bi-save-fill" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Saving targets */}
      <SubCategoryDatas categoryId={id} />
      {/* <div className="row mb-4">
        <div className="col-12 ">
          <button
            className="btn btn-default btn-lg shadow-sm w-100"
            onclick="window.location.replace('thankyou3.html');"
          >
            Pay Bill
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default CategoryDetails;
