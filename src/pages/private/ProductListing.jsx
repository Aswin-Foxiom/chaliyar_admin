import React, { useEffect, useState } from "react";
import { ApiCall } from "../../services/ApiCall";
import { BaseUrl, CategoryUrl, ProductsUrl } from "../../services/BaseUrls";
import NoDataFound from "../../components/NoDataFound";
import { Link, useNavigate } from "react-router-dom";
import { IndexPath, ProductManagementPath } from "../../services/urlPaths";
import { ShortenedName } from "../../utils/StringFunctions";
import { InputSwitch } from "primereact/inputswitch";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";
import { showToast } from "../../utils/Toast";

function ProductListing() {
  let navigate = useNavigate();
  const [deleteModal, setdeleteModal] = useState({
    show: false,
    id: null,
  });
  const [query, setquery] = useState("");
  const [status, setstatus] = useState(null);
  const [productsList, setproductsList] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [category, setcategory] = useState("");
  const [pages, setpages] = useState({
    page: 1,
    limit: 20,
  });
  const [pagination, setpagination] = useState({
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    getProducts();
  }, [query, status, category, pages]);

  useEffect(() => {
    getCategory();
  }, []);

  const getProducts = async () => {
    const response = await ApiCall("get", ProductsUrl, null, {
      query,
      status,
      category,
      page: pages?.page,
      limit: pages?.limit,
    });
    if (response?.status) {
      console.log(response);
      setproductsList(response?.message?.data?.docs ?? []);
      setpagination({
        hasPreviousPage: response?.message?.data?.hasPreviousPage ?? false,
        hasNextPage: response?.message?.data?.hasNextPage ?? false,
      });
    }
  };
  const getCategory = async () => {
    const response = await ApiCall("get", CategoryUrl);
    if (response?.status) {
      console.log(response);
      setcategoryList(response?.message?.data?.docs ?? []);
    }
  };

  const DeleteProduct = async () => {
    if (deleteModal?.id) {
      const response = await ApiCall(
        "delete",
        `${ProductsUrl}/${deleteModal?.id}`
      );
      if (response?.status) {
        getProducts();
        setdeleteModal({ show: false, id: null });
        showToast(`Product deleted successfully`, "success");
      }
    }
  };

  const onProductClicked = (id) => {
    return navigate(`${IndexPath + ProductManagementPath}/${id}`);
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
              Search product
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
          <div className="form-group form-floating mb-3">
            <select
              className="form-control"
              placeholder="Choose category"
              value={category}
              onChange={(e) => setcategory(e.target.value)}
            >
              <option value=""> All</option>
              {categoryList?.length ? (
                <>
                  {categoryList?.map((value, key) => (
                    <option value={value?._id} key={key}>
                      {value?.name}
                    </option>
                  ))}
                </>
              ) : (
                <option value="" disabled>
                  {" "}
                  No category Found
                </option>
              )}
            </select>
          </div>

          <div class="row mb-2">
            <div class="col-12 px-0">
              <div class="swiper-container tagsswiper">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" onClick={() => setstatus(null)}>
                    <div class={`tag ${!status ? "active" : ""}`}>All</div>
                  </div>
                  <div class="swiper-slide" onClick={() => setstatus("stock")}>
                    <div class={`tag ${status === "stock" ? "active" : ""}`}>
                      In stock
                    </div>
                  </div>
                  <div
                    class="swiper-slide"
                    onClick={() => setstatus("out of stock")}
                  >
                    <div
                      class={`tag ${status === "out of stock" ? "active" : ""}`}
                    >
                      Out of Stock
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

      {/* list data request money */}
      <div className="row mb-3">
        <div className="col">
          <h6 className="title">Products</h6>
        </div>
        <div className="col-auto align-self-center">
          <Link to={IndexPath + ProductManagementPath} className="small">
            New Product
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {productsList?.length ? (
            <>
              {productsList.map((value, key) => (
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="row">
                      <div
                        className="col-auto"
                        onClick={() => onProductClicked(value?._id)}
                      >
                        <div className="avatar avatar-44 shadow-sm rounded-10">
                          <img src={`${value?.image}`} alt />
                        </div>
                      </div>
                      <div
                        className="col align-self-center ps-0"
                        onClick={() => onProductClicked(value?._id)}
                      >
                        <p className="small mb-1">
                          <a
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            className="fw-medium"
                          >
                            {ShortenedName(value?.productName)}
                          </a>{" "}
                          {/* <span className="text-muted">request send</span> */}
                        </p>
                        <p>
                          {value?.originalPrice}
                          <span className="text-muted"> ₹</span>{" "}
                          <small className="text-muted">
                            ( {value?.priceFor} )
                          </small>{" "}
                        </p>
                      </div>
                      <div className="col-auto">
                        <button
                          className="btn btn-44 btn-light text-danger shadow-sm"
                          // onClick={() => DeleteProduct(value?._id)}
                          onClick={() =>
                            setdeleteModal({
                              show: true,
                              id: value?._id,
                            })
                          }
                        >
                          <i className="bi bi-trash" />
                        </button>{" "}
                        <br />
                        <div
                          className={`tag ${
                            value?.status === "stock"
                              ? "bg-success"
                              : "bg-warning"
                          } border-success text-white py-1 px-1`}
                        >
                          {value?.status === "stock"
                            ? "In stock"
                            : "Out of stock"}
                        </div>
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
      {deleteModal?.show && (
        <DeleteConfirmModal
          show={deleteModal?.show}
          closeFun={() => setdeleteModal({ show: false, id: null })}
          deleteFun={DeleteProduct}
        />
      )}
    </div>
  );
}

export default ProductListing;
