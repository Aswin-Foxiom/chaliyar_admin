import React, { useContext, useEffect, useState } from "react";
import { loginValidationSchema } from "../../utils/Validations";
import { useFormik } from "formik";
import { ApiCall } from "../../services/ApiCall";
import { useNavigate } from "react-router-dom";
import { IndexPath } from "../../services/urlPaths";
import { ContextDatas } from "../../services/Context";
import { showToast } from "../../utils/Toast";

function Login() {
  const { setUser, seturlPath } = useContext(ContextDatas);
  const [passShow, setpassShow] = useState(false);
  const [loading, setloading] = useState(false);
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      Login(values);
    },
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      seturlPath("/");
      return navigate(IndexPath);
    }
  }, []);

  const Login = async (values) => {
    setloading(true);
    const response = await ApiCall("post", "auth/login", values);
    setloading(false);
    if (response?.status) {
      console.log(response);
      console.log(response?.message?.data?.token);
      localStorage.setItem("token", response?.message?.data?.token);
      setUser(response?.message?.data?.token);
      seturlPath("/");
      showToast("Login Successfull", "success");
      return navigate(IndexPath);
    }
  };

  return (
    <div>
      <main
        className="container-fluid h-100"
        style={{
          minHeight: "667px",
          paddingTop: "85.7188px",
        }}
      >
        <div className="row h-100 overflow-auto">
          <div className="col-12 text-center mb-auto px-0">
            <header className="header">
              <div className="row">
                <div className="col-auto" />
                <div className="col">
                  <div className="logo-small">
                    {/* <img src="assets/img/logo.png" alt /> */}
                    <h5>Chaliyar Fish Hub</h5>
                  </div>
                </div>
                <div className="col-auto" />
              </div>
            </header>
          </div>
          <div className="col-10 col-md-6 col-lg-5 col-xl-3 mx-auto align-self-center text-center py-4">
            <h1 className="mb-4 text-color-theme">Sign in</h1>
            <form
              className="was-validated needs-validation"
              onSubmit={(e) => {
                formik.handleSubmit();
                e.preventDefault();
              }}
            >
              <div className="form-group form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  value={formik?.values?.email}
                />
                <label className="form-control-label" htmlFor="email">
                  Username
                </label>
                {formik?.touched?.email && formik?.errors?.email ? (
                  <span className="text-danger text-small">
                    {formik?.errors?.email}
                  </span>
                ) : null}
              </div>
              <div className="form-group form-floating  mb-3">
                <input
                  type={passShow ? "text" : "password"}
                  className="form-control "
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik?.values?.password}
                  placeholder="Password"
                />
                <label className="form-control-label" htmlFor="password">
                  Password
                </label>
                {/* <button
                  type="button"
                  className="text-danger tooltip-btn"
                  data-bs-placement="left"
                  id="passworderror"
                  onClick={() => setpassShow(!passShow)}
                >
                  {passShow ? (
                    <i className="bi bi-eye-slash" />
                  ) : (
                    <i className="bi bi-eye" />
                  )}
                </button> */}
                {formik?.touched?.password && formik?.errors?.password ? (
                  <span className="text-danger text-small">
                    {formik?.errors?.password}
                  </span>
                ) : null}
              </div>

              {loading ? (
                <button
                  type="button"
                  className="btn btn-lg btn-default w-100 mb-4 shadow"
                >
                  Loading ...
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-lg btn-default w-100 mb-4 shadow"
                >
                  Sign in
                </button>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
