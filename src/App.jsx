import React from "react";
import { Route, Routes } from "react-router-dom";
import RouterConnection from "./connection/RouterConnection";
import Dashboard from "./pages/private/Dashboard";
import OrderListing from "./pages/private/OrderListing";
import OrderDetails from "./pages/private/OrderDetails";
import ProductListing from "./pages/private/ProductListing";
import Login from "./pages/public/Login";
import CategoryList from "./pages/private/CategoryList";
import {
  CategoryDetailsPath,
  CategoryPath,
  IndexPath,
  LoginPath,
  OrderDetailsPath,
  OrderPath,
  privacyPolicyPath,
  ProductManagementPath,
  ProductsPath,
  SettingsPath,
} from "./services/urlPaths";
import CategoryDetails from "./pages/private/DetailsPage/CategoryDetails";
import ProductManagement from "./pages/private/ProductManagement";
import SettingsPage from "./pages/private/SettingsPage";
import PrivateRoute from "./utils/PrivateRoute";
import PrivacyPolicyPage from "./pages/public/PrivacyPolicyPage";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path={IndexPath + privacyPolicyPath}
          element={<PrivacyPolicyPage />}
        />
        <Route path={IndexPath + LoginPath} element={<Login />} />
        <Route
          path={IndexPath}
          element={
            <PrivateRoute>
              <RouterConnection />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path={IndexPath + OrderPath} element={<OrderListing />} />
          <Route
            path={`${IndexPath + OrderDetailsPath}/:id`}
            element={<OrderDetails />}
          />
          <Route path={IndexPath + ProductsPath} element={<ProductListing />} />
          <Route path={IndexPath + SettingsPath} element={<SettingsPage />} />
          <Route path={IndexPath + CategoryPath} element={<CategoryList />} />
          <Route
            path={`${IndexPath + CategoryDetailsPath}/:id`}
            element={<CategoryDetails />}
          />
          <Route
            path={`${IndexPath + ProductManagementPath}/:id?`}
            element={<ProductManagement />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
