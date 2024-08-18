import React, { useEffect, useState } from "react";
import { ApiCall } from "../../services/ApiCall";
import {
  BaseUrl,
  CategoryUrl,
  ProductsUrl,
  SubCategoryUrl,
  UploadUrl,
} from "../../services/BaseUrls";
import { useFormik } from "formik";
import { productValidationSchema } from "../../utils/Validations";
import { useNavigate, useParams } from "react-router-dom";
import { showToast } from "../../utils/Toast";

function ProductManagement() {
  const { id } = useParams();
  let navigate = useNavigate();
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [productData, setproductData] = useState(null);

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    if (id) {
      getSingleProduct();
    }
  }, [id]);

  const getCategory = async () => {
    const response = await ApiCall("get", CategoryUrl);
    if (response?.status) {
      setCategoryData(response?.message?.data?.docs ?? []);
    }
  };

  const getSingleProduct = async () => {
    const response = await ApiCall("get", ProductsUrl, {}, { id: id });
    if (response?.status) {
      setproductData(response?.message?.data ?? null);
    }
  };

  const onCategoryChanged = async (categoryId) => {
    const response = await ApiCall("get", SubCategoryUrl, {}, { categoryId });
    if (response?.status) {
      setSubCategoryData(response?.message?.data?.docs ?? []);
    }
  };

  const formik = useFormik({
    enableReinitialize: true, // Enable reinitialization when initialValues change
    initialValues: {
      productName: productData?.productName ?? "",
      category: productData?.category?._id ?? "",
      subCategory: productData?.subCategory?._id ?? "",
      image: productData?.image ?? "",
      multipleImages: productData?.multipleImages ?? [],
      originalPrice: productData?.originalPrice ?? "",
      discountPrice: productData?.discountPrice ?? "",
      status:
        productData?.status === "stock"
          ? true
          : productData?.status === "out_of_stock"
          ? false
          : true,
      todaysSpecial: productData?.todaysSpecial
        ? productData?.todaysSpecial
        : false,
      description: productData?.description ?? "",
      priceFor: productData?.priceFor ?? "",
      isActive: productData?.isActive ? productData?.isActive : true,
      isDeleted: productData?.isDeleted ?? false,
    },
    validationSchema: productValidationSchema,
    onSubmit: (values) => {
      onProductSubmit(values);
    },
  });

  const onProductSubmit = async (values) => {
    var datas = values;
    if (values?.status) {
      datas.status = "stock";
    } else {
      datas.status = "out_of_stock";
    }
    let response = null;
    if (!productData?._id) {
      response = await ApiCall("post", ProductsUrl, datas);
    } else {
      response = await ApiCall(
        "put",
        `${ProductsUrl}/${productData?._id}`,
        datas
      );
    }
    if (response?.status) {
      showToast(
        `Product ${productData?._id ? "updated" : "added"} successfully`,
        "success"
      );
      return navigate("/products");
    }
  };

  const onImageUpload = async (e, type) => {
    const response = await ApiCall(
      "post",
      UploadUrl,
      {
        files: e.target.files[0],
      },
      {},
      true
    );
    if (response?.status) {
      if (type === "main") {
        formik.setFieldValue("image", BaseUrl + response?.message?.data[0]);
      }
      if (type === "multiple") {
        var datas = formik.values.multipleImages;
        datas.push(BaseUrl + response?.message?.data[0]);
        formik.setFieldValue("multipleImages", datas);
      }
    }
  };

  const handleRemoveImage = (index) => {
    // Create a copy of the current multipleImages array
    const updatedImages = [...formik.values.multipleImages];

    // Remove the image at the specified index
    updatedImages.splice(index, 1);

    // Update the formik values with the new array
    formik.setFieldValue("multipleImages", updatedImages);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <div className="row mb-1">
          <div className="col">
            <h6>Basic Information</h6>
          </div>
        </div>
        <div className="row h-100 mb-4">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="form-group form-floating  mb-1">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                id="productName"
                name="productName"
                value={formik.values.productName}
                onChange={formik.handleChange}
              />
              <label htmlFor="productName">Product Name</label>
              {formik.errors.productName ? (
                <div className="text-danger">{formik.errors.productName}</div>
              ) : null}
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="form-group form-floating  mb-1">
              <input
                type="text"
                className="form-control"
                placeholder="Sales Price"
                id="originalPrice"
                name="originalPrice"
                value={formik.values.originalPrice}
                onChange={formik.handleChange}
              />
              <label htmlFor="originalPrice">Sales Price</label>
              {formik.errors.originalPrice ? (
                <div className="text-danger">{formik.errors.originalPrice}</div>
              ) : null}
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="form-group form-floating  mb-1">
              <input
                type="text"
                className="form-control"
                placeholder="Original Price"
                id="discountPrice"
                name="discountPrice"
                value={formik.values.discountPrice}
                onChange={formik.handleChange}
              />
              <label htmlFor="discountPrice">Original Price</label>
              {formik.errors.discountPrice ? (
                <div className="text-danger">{formik.errors.discountPrice}</div>
              ) : null}
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="form-floating mb-1">
              <select
                className="form-control"
                id="category"
                name="category"
                value={formik.values.category}
                onChange={(e) => {
                  formik.handleChange(e);
                  onCategoryChanged(e.target.value);
                }}
              >
                <option value="">Choose Category</option>
                {categoryData?.length ? (
                  <>
                    {categoryData?.map((value, key) => (
                      <option value={value?._id} key={key}>
                        {value?.name}
                      </option>
                    ))}
                  </>
                ) : (
                  <option value="">No category found</option>
                )}
              </select>
              <label htmlFor="category">Category</label>
              {formik.errors.category ? (
                <div className="text-danger">{formik.errors.category}</div>
              ) : null}
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="form-floating mb-1">
              <select
                className="form-control"
                id="subCategory"
                name="subCategory"
                value={formik.values.subCategory}
                onChange={formik.handleChange}
              >
                <option value="">Choose Sub Category</option>
                {subCategoryData?.length ? (
                  <>
                    {subCategoryData?.map((value, key) => (
                      <option value={value?._id} key={key}>
                        {value?.name}
                      </option>
                    ))}
                  </>
                ) : (
                  <option value="">No subcategory found</option>
                )}
              </select>
              <label htmlFor="subCategory">Sub Category</label>
              {formik.errors.subCategory ? (
                <div className="text-danger">{formik.errors.subCategory}</div>
              ) : null}
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="form-group form-floating  mb-1">
              {/* <input
                type="text"
                className="form-control"
                placeholder="Price For"
                id="priceFor"
                name="priceFor"
                value={formik.values.priceFor}
                onChange={formik.handleChange}
              /> */}
              <select
                className="form-control"
                placeholder="Price For"
                id="priceFor"
                name="priceFor"
                value={formik.values.priceFor}
                onChange={formik.handleChange}
              >
                <option value="" disabled>
                  Choose a value
                </option>
                <option value="Kg">Kg</option>
                <option value="g">g</option>
                <option value="Pieces">Pieces</option>
                <option value="Nos">Nos</option>
              </select>
              <label htmlFor="priceFor">Price For</label>
              {formik.errors.priceFor ? (
                <div className="text-danger">{formik.errors.priceFor}</div>
              ) : null}
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="form-group form-floating  mb-1">
              <textarea
                rows={5}
                type="text"
                className="form-control"
                placeholder="Description"
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              <label htmlFor="description">Description</label>
              {formik.errors.description ? (
                <div className="text-danger">{formik.errors.description}</div>
              ) : null}
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="form-group form-floating">
              <input
                type="file"
                className="form-control"
                id="image"
                onChange={(e) => onImageUpload(e, "main")}
                name="image"
              />
              <label htmlFor="image">Main Image</label>
              {formik.errors.image ? (
                <div className="text-danger">{formik.errors.image}</div>
              ) : null}
            </div>
          </div>
          {formik.values.image && (
            <div className="col-12 col-md-6 col-lg-4 mt-2">
              <img
                src={formik.values.image}
                style={{ height: "100px", width: "100px" }}
              />
            </div>
          )}
        </div>

        <div className="row mb-1">
          <div className="col">
            <h6>Multiple Images</h6>
          </div>
        </div>

        <div className="row h-100 mb-4">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="form-group form-floating">
              <input
                type="file"
                className="form-control"
                id="multipleImages"
                name="multipleImages"
                onChange={(e) => onImageUpload(e, "multiple")}
              />
              <label htmlFor="multipleImages">Multiple Images</label>
              {formik.errors.multipleImages ? (
                <div className="text-danger">
                  {formik.errors.multipleImages}
                </div>
              ) : null}
            </div>
          </div>
          {/* {formik.values.multipleImages?.length ? (
            <>
              <div className="col-12 col-md-6 col-lg-4 mt-2">
                {formik.values.multipleImages.map((value, key) => (
                  <img
                    src={value}
                    style={{
                      height: "100px",
                      width: "100px",
                      marginTop: "5px",
                      marginRight: "5px",
                    }}
                  />
                ))}
              </div>
            </>
          ) : (
            ""
          )} */}
          {formik.values.multipleImages?.length ? (
            <>
              <div className="col-12 col-md-6 col-lg-4 mt-2">
                {formik.values.multipleImages.map((value, key) => (
                  <div
                    key={key}
                    style={{
                      position: "relative",
                      display: "inline-block",
                      marginTop: "5px",
                      marginRight: "5px",
                    }}
                  >
                    <img
                      src={value}
                      alt={`Image ${key}`}
                      style={{
                        height: "100px",
                        width: "100px",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(key)} // Define this function to handle the image removal
                      style={{
                        position: "absolute",
                        top: "0px",
                        right: "0px",
                        background: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            ""
          )}
        </div>

        <div className="row mb-1">
          <div className="col">
            <h6>Additional Infromation</h6>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm mb-4">
              <ul className="list-group list-group-flush bg-none">
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-auto pr-0 align-self-center text-end">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="status"
                          name="status"
                          checked={formik.values.status}
                          onChange={formik.handleChange}
                        />
                        <label className="form-check-label" htmlFor="status" />
                      </div>
                    </div>
                    <div className="col ps-0">
                      <h6 className="mb-1">Stock</h6>
                      <p className="text-muted small">
                        Default status is Stock
                      </p>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-auto pr-0 align-self-center text-end">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="todaysSpecial"
                          name="todaysSpecial"
                          checked={formik.values.todaysSpecial}
                          onChange={formik.handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="todaysSpecial"
                        />
                      </div>
                    </div>
                    <div className="col ps-0">
                      <h6 className="mb-1">Todays special</h6>
                      <p className="text-muted small">
                        Default status is Not special for today
                      </p>
                    </div>
                  </div>
                </li>
                {/* <li className="list-group-item">
                  <div className="row">
                    <div className="col-auto pr-0 align-self-center text-end">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="isActive"
                          name="isActive"
                          checked={formik.values.isActive}
                          onChange={formik.handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="isActive"
                        />
                      </div>
                    </div>
                    <div className="col ps-0">
                      <h6 className="mb-1">Active</h6>
                      <p className="text-muted small">
                        Default status is active
                      </p>
                    </div>
                  </div>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
        <div className="row h-100 ">
          <div className="col-12">
            <button
              type="submit"
              target="_self"
              className="btn btn-default btn-lg w-100"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductManagement;
