import React, { useEffect, useState } from "react";
import { SubCategoryUrl } from "../../services/BaseUrls";
import { ApiCall } from "../../services/ApiCall";
import NoDataFound from "../NoDataFound";
import { capitalizeFirstLetter } from "../../utils/StringFunctions";
import { showToast } from "../../utils/Toast";

function SubCategoryDatas({ categoryId }) {
  const [subCategoryDatas, setsubCategoryDatas] = useState([]);
  const [subCategoryname, setsubCategoryname] = useState("");
  const [addNew, setaddNew] = useState(false);
  useEffect(() => {
    getSubgroups();
  }, []);

  const getSubgroups = async () => {
    const response = await ApiCall(
      "get",
      SubCategoryUrl,
      {},
      { categoryId: categoryId }
    );
    if (response?.status) {
      setsubCategoryDatas(response?.message?.data?.docs);
    }
  };

  const addSubCategory = async () => {
    const response = await ApiCall("post", SubCategoryUrl, {
      name: subCategoryname,
      categoryId: categoryId,
    });
    if (response?.status) {
      setsubCategoryname("");
      getSubgroups();
      showToast("Subcategory added successfully", "success");
    }
  };

  const deleteSubCategory = async (id) => {
    const response = await ApiCall("delete", `${SubCategoryUrl}/${id}`);
    if (response?.status) {
      getSubgroups();
      showToast("Subcategory Deleted", "success");
    }
  };
  return (
    <div>
      <div className="row mb-3">
        <div className="col">
          <h6 className="title">Sub Category</h6>
        </div>
        <div className="col-auto">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setaddNew(!addNew);
            }}
            className="small"
          >
            {addNew ? "Close" : "Add New"}
          </a>
        </div>
      </div>
      {addNew && (
        <div className="row">
          <div className="col-12 mb-4">
            <div className="form-group form-floating">
              <input
                type="text"
                className="form-control "
                id="coupon"
                value={subCategoryname}
                onChange={(e) => setsubCategoryname(e.target.value)}
                placeholder="Coupon Code"
              />

              <div className="tooltip-btn col-auto">
                {subCategoryname && subCategoryname?.trim() != "" ? (
                  <button
                    onClick={addSubCategory}
                    className="btn btn-44 btn-light text-danger shadow-sm"
                  >
                    <i className="bi bi-save-fill" />
                  </button>
                ) : (
                  <button
                    disabled
                    className="btn btn-44 btn-light text-danger shadow-sm"
                  >
                    <i className="bi bi-save-fill" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {subCategoryDatas?.length ? (
        <>
          <div class="row">
            <div className="col">
              {subCategoryDatas?.map((value, key) => (
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col align-self-center ps-3">
                        <p className="small mb-1">
                          <a
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            className="fw-medium"
                          >
                            {value?.name}
                          </a>{" "}
                        </p>
                      </div>
                      <div className="col-auto">
                        <button
                          onClick={() => deleteSubCategory(value?._id)}
                          className="btn btn-44 btn-light text-danger shadow-sm"
                        >
                          <i className="bi bi-trash" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <NoDataFound />
      )}
    </div>
  );
}

export default SubCategoryDatas;
