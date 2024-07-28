import React, { useEffect, useState } from "react";
import { ApiCall } from "../../services/ApiCall";
import { CategoryUrl } from "../../services/BaseUrls";
import NoDataFound from "../../components/NoDataFound";
import { capitalizeFirstLetter } from "../../utils/StringFunctions";
import { useNavigate } from "react-router-dom";
import { CategoryDetailsPath, IndexPath } from "../../services/urlPaths";
import { showToast } from "../../utils/Toast";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";

function CategoryList() {
  let navigate = useNavigate();
  const [deleteModal, setdeleteModal] = useState({
    show: false,
    id: null,
  });
  const [addNew, setaddNew] = useState(false);
  const [categoryName, setcategoryName] = useState("");
  const [query, setquery] = useState("");
  const [categoryList, setcategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, [query]);

  const getCategoryList = async () => {
    const response = await ApiCall("get", CategoryUrl, {}, { name: query });
    if (response?.status) {
      setcategoryList(response?.message?.data?.docs);
    }
  };

  const addCategory = async () => {
    const response = await ApiCall("post", CategoryUrl, { name: categoryName });
    if (response?.status) {
      setcategoryName("");
      getCategoryList();
      showToast("Category added successfully", "success");
    }
  };

  const deleteCategory = async () => {
    if (deleteModal?.id) {
      const response = await ApiCall(
        "delete",
        `${CategoryUrl}/${deleteModal?.id}`
      );
      if (response?.status) {
        getCategoryList();
        showToast("Category deleted successfully", "success");
        setdeleteModal({ show: false, id: null });
      }
    }
  };
  return (
    <div>
      {/* list data request money */}

      <div className="form-group form-floating mb-3">
        <input
          type="text"
          className="form-control "
          id="search"
          value={query}
          onChange={(e) => setquery(e.target.value)}
          placeholder="Search"
        />
        <label className="form-control-label" htmlFor="search">
          Search category
        </label>
        {query != "" ? (
          <button
            type="button"
            className="text-color-theme tooltip-btn"
            style={{ marginTop: "-15px" }}
            onClick={() => setquery("")}
          >
            <i className="bi bi-x-lg" />
          </button>
        ) : (
          ""
        )}
      </div>

      <div className="row mb-3">
        <div className="col">
          <h6 className="title">Category List</h6>
        </div>
        <div className="col-auto align-self-center">
          <a href="#" onClick={() => setaddNew(!addNew)} className="small">
            {addNew ? "close" : "Add New category"}
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
                value={categoryName}
                onChange={(e) => setcategoryName(e.target.value)}
                placeholder="Coupon Code"
              />

              <div className="tooltip-btn col-auto">
                {categoryName && categoryName?.trim() != "" ? (
                  <button
                    onClick={addCategory}
                    className="btn btn-44 btn-light text-danger shadow-sm"
                  >
                    <i className="bi-save-fill" />
                  </button>
                ) : (
                  <button
                    disabled
                    className="btn btn-44 btn-light text-danger shadow-sm"
                  >
                    <i className="bi-save-fill" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col">
          {categoryList?.length ? (
            <>
              {categoryList?.map((value, key) => (
                <div className="card mb-3" key={key}>
                  <div className="card-body">
                    <div className="row">
                      {/* <div className="col-auto">
                        <div className="avatar avatar-44 shadow-sm rounded-10">
                          <img src="assets/img/user3.jpg" alt />
                        </div>
                      </div> */}
                      <div
                        className="col align-self-center ps-3"
                        onClick={() => {
                          return navigate(
                            `${IndexPath + CategoryDetailsPath}/${value?._id}`
                          );
                        }}
                      >
                        <p className="small mb-1">
                          <a
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            className="fw-medium"
                          >
                            {capitalizeFirstLetter(value?.name)}
                          </a>{" "}
                          {/* <span className="text-muted">request send</span> */}
                        </p>
                        {/* <p>
                          150 <span className="text-muted">$</span>{" "}
                          <small className="text-muted">1 min ago</small>
                        </p> */}
                      </div>
                      <div className="col-auto">
                        <button
                          // onClick={() => deleteCategory(value?._id)}
                          onClick={() =>
                            setdeleteModal({
                              show: true,
                              id: value?._id,
                            })
                          }
                          className="btn btn-44 btn-light text-danger shadow-sm"
                        >
                          <i className="bi bi-trash" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <NoDataFound />
          )}
        </div>
      </div>
      {deleteModal?.show && (
        <DeleteConfirmModal
          show={deleteModal?.show}
          closeFun={() => setdeleteModal({ show: false, id: null })}
          deleteFun={deleteCategory}
        />
      )}
    </div>
  );
}

export default CategoryList;
