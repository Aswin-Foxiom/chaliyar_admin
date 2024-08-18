import React, { useEffect, useRef, useState } from "react";
import { ApiCall } from "../../services/ApiCall";
import {
  BannersUrl,
  BaseUrl,
  PincodesUrl,
  UploadUrl,
} from "../../services/BaseUrls";
import { showToast } from "../../utils/Toast";
import NoDataFound from "../../components/NoDataFound";
import { capitalizeFirstLetter } from "../../utils/StringFunctions";

function SettingsPage() {
  const fileInputRef = useRef(null);
  const [addNew, setaddNew] = useState(false);
  const [pincode_value, setpincode_value] = useState("");
  const [BannerList, setBannerList] = useState([]);

  const [isBannerShow, setisBannerShow] = useState(false);
  const [pincodes, setpincodes] = useState([]);
  const [editedPincodes, setEditedPincodes] = useState("");

  useEffect(() => {
    getBanners();
    getPincodes();
  }, []);

  const getBanners = async () => {
    const response = await ApiCall("get", BannersUrl);
    if (response?.status) {
      console.log("Banner", response);
      setBannerList(response?.message?.data?.docs);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const getPincodes = async () => {
    const response = await ApiCall("get", PincodesUrl);
    if (response?.status) {
      console.log(response);
      setpincodes(response?.message?.data?.docs);
      var test = [];
      response?.message?.data?.docs.forEach((element) => {
        test.push(element?.pincode);
      }); // Assuming pincodes is an array of strings
      setEditedPincodes(test);
    }
  };

  const handlePincodesChange = (event) => {
    setEditedPincodes(event.target.value);
  };

  // const savePincodes = async () => {
  //   console.log(typeof editedPincodes);
  //   if (typeof editedPincodes != "object") {
  //     const pincodeList = editedPincodes?.split(",").map((pin) => pin.trim());

  //     console.log(pincodeList);
  //     const response = await ApiCall("post", PincodesUrl, {
  //       pincodes: pincodeList,
  //     });
  //     if (response?.status) {
  //       getPincodes();
  //       showToast("Pincodes updated successfully", "success");
  //     }
  //   }
  // };

  const savePincodes = async () => {
    // if (typeof editedPincodes !== "object") {
    //   const pincodeList = editedPincodes
    //     ?.split(",")
    //     .map((pin) => pin.trim())
    //     .filter((pin) => pin.length > 0); // Filter out empty strings

    //   console.log("Pincode List:", pincodeList);

    //   // Check if the new pincode list is different from the existing one
    //   if (pincodeList.length > 0) {
    //     const response = await ApiCall("post", PincodesUrl, {
    //       pincodes: pincodeList,
    //     });
    //     if (response?.status) {
    //       getPincodes();
    //       showToast("Pincodes updated successfully", "success");
    //     }
    //   } else {
    //     showToast("Please enter valid pincodes.", "error");
    //   }
    // }
    const response = await ApiCall("post", PincodesUrl, {
      pincodes: [pincode_value],
    });
    if (response?.status) {
      getPincodes();
      setaddNew(false);
      showToast("Pincodes updated successfully", "success");
      setpincode_value("");
    }
  };

  // const onImageUpload = async (e, type, id) => {
  //   const response = await ApiCall(
  //     "post",
  //     UploadUrl,
  //     {
  //       files: e.target.files[0],
  //     },
  //     {},
  //     true
  //   );

  //   if (response?.status) {
  //     BannerHandler(response?.message?.data[0], type, id);
  //   }
  //   e.target.value = null;
  // };

  const onImageUpload = async (e, type, id) => {
    const file = e.target.files[0];

    // Check if the uploaded file is an image based on MIME type
    if (!file.type.startsWith("image/")) {
      // Handle the error, e.g., show a message to the user
      showToast("Only Allow Image files", "error");
      e.target.value = null; // Reset the file input field
      return; // Exit the function early
    }

    // Proceed with the API call if the file is a valid image
    const response = await ApiCall(
      "post",
      UploadUrl,
      {
        files: file,
      },
      {},
      true
    );

    if (response?.status) {
      BannerHandler(response?.message?.data[0], type, id);
    }

    // Reset the file input field after upload is complete
    e.target.value = null;
  };

  const BannerHandler = async (url, type, id) => {
    var response = null;
    if (type === "post") {
      response = await ApiCall("post", BannersUrl, { url: BaseUrl + url });
    } else {
      response = await ApiCall("put", `${BannersUrl}/${id}`, {
        url: BaseUrl + url,
      });
    }
    if (response?.status) {
      getBanners();
      showToast(`Banner ${id ? "updated" : "added"} successfully`, "success");
    }
  };

  const DeleteBanner = async (id) => {
    const response = await ApiCall("delete", `${BannersUrl}/${id}`);
    if (response?.status) {
      getBanners();
      showToast("Banner deleted successfully", "success");
    }
  };

  const DeletePincode = async (id) => {
    const response = await ApiCall("delete", `${PincodesUrl}/${id}`);
    if (response?.status) {
      showToast("Pincode deleted successfully", "success");
      getPincodes();
    }
  };

  return (
    <div>
      <div className="row mb-3">
        <div className="col">
          <h6 className="title">Banners</h6>
        </div>
        <div className="col-auto align-self-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setisBannerShow(!isBannerShow);
            }}
            className="small"
          >
            {isBannerShow ? "Hide" : "Show"}
          </a>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="form-group form-floating">
            <input
              type="file"
              className="form-control"
              onChange={(e) => onImageUpload(e, "post", null)}
            />
          </div>
        </div>
      </div>

      {isBannerShow && (
        <div className="row mt-2">
          {BannerList?.length ? (
            <>
              {BannerList.map((value, key) => (
                <div className="col-12">
                  <div className="card mb-4 shadow-sm">
                    <div
                      className="card-body text-center position-relative"
                      style={{ padding: "0px" }}
                    >
                      <button
                        className="btn btn-44 position-absolute btn-light text-danger shadow-sm"
                        style={{
                          zIndex: "1000",
                          top: "10px",
                          right: "10px",
                          backgroundColor: "lightgrey",
                        }}
                        onClick={() => DeleteBanner(value?._id)}
                      >
                        <i className="bi bi-trash" />
                      </button>

                      <button
                        className="btn btn-44 position-absolute btn-light text-danger shadow-sm"
                        style={{
                          zIndex: "1000",
                          top: "10px",
                          right: "60px",
                          backgroundColor: "lightgrey",
                        }}
                        onClick={handleClick}
                      >
                        <i className="bi bi-pencil-square" />
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={(e) => onImageUpload(e, "put", value?._id)}
                      />

                      <div className="row align-items-center">
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className="col"
                        >
                          <figure
                            className="avatar avatar-80 mx-auto"
                            style={{
                              borderRadius: "5px",
                              height: "120px",
                              objectFit: "contain",
                              width: "100%",
                            }}
                          >
                            <img src={value?.url} alt="Banner" />
                          </figure>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="col-12" style={{ textAlign: "center" }}>
              <h6> No banners Added </h6>
            </div>
          )}
        </div>
      )}

      <div className="row mb-3 mt-3">
        <div className="col">
          <h6 className="title">Pincodes</h6>
        </div>
        <div className="col-auto align-self-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setaddNew(!addNew);
            }}
            className="small"
          >
            {addNew ? "close" : "Add New Pincode"}
          </a>
        </div>
      </div>
      {/* <div className="row">
        <div className="col-12">
          <textarea
            value={editedPincodes}
            // onChange={handlePincodesChange}
            onChange={handlePincodesChange}
            className="form-control"
            rows={5}
          />
        </div>
      </div> */}
      {addNew && (
        <div className="row">
          <div className="col-12 mb-4">
            <div className="form-group form-floating">
              <input
                type="text"
                className="form-control "
                id="coupon"
                value={pincode_value}
                onChange={(e) => setpincode_value(e.target.value)}
                placeholder="Pincode"
              />

              <div className="tooltip-btn col-auto">
                {pincode_value &&
                pincode_value.trim() !== "" &&
                /^\d{6}$/.test(pincode_value) ? (
                  <button
                    onClick={savePincodes}
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
          {pincodes?.length ? (
            <>
              {pincodes?.map((value, key) => (
                <div className="card mb-3" key={key}>
                  <div className="card-body">
                    <div className="row">
                      {/* <div className="col-auto">
                        <div className="avatar avatar-44 shadow-sm rounded-10">
                          <img src="assets/img/user3.jpg" alt />
                        </div>
                      </div> */}
                      <div className="col align-self-center ps-3">
                        <p className="small mb-1">
                          <a
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            className="fw-medium"
                          >
                            {value?.pincode}
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
                          onClick={() => DeletePincode(value?._id)}
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

      {/* <div className="row mt-3">
        <div className="col">
          <button className="btn btn-primary" onClick={savePincodes}>
            Save Pincodes
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default SettingsPage;
