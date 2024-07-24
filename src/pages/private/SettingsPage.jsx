import React, { useEffect, useRef, useState } from "react";
import { ApiCall } from "../../services/ApiCall";
import {
  BannersUrl,
  BaseUrl,
  PincodesUrl,
  UploadUrl,
} from "../../services/BaseUrls";
import { showToast } from "../../utils/Toast";

function SettingsPage() {
  const fileInputRef = useRef(null);
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

  const savePincodes = async () => {
    console.log(typeof editedPincodes);
    if (typeof editedPincodes != "object") {
      const pincodeList = editedPincodes?.split(",").map((pin) => pin.trim());

      console.log(pincodeList);
      const response = await ApiCall("post", PincodesUrl, {
        pincodes: pincodeList,
      });
      if (response?.status) {
        getPincodes();
        showToast("Pincodes updated successfully", "success");
      }
    }
  };

  const onImageUpload = async (e, type, id) => {
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
      console.log(response);
      fileInputRef.current.value = "";

      BannerHandler(response?.message?.data[0], type, id);
    }
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

      <div className="row mt-3 mb-3">
        <div className="col">
          <h6 className="title">Pincodes</h6>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <textarea
            value={editedPincodes}
            // onChange={handlePincodesChange}
            onChange={handlePincodesChange}
            className="form-control"
            rows={5}
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <button className="btn btn-primary" onClick={savePincodes}>
            Save Pincodes
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
