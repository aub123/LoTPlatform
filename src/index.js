import { createRoot } from "react-dom/client";
import Login from "./components/Login";
import UserInfo from "./pages/UserView";
// import Bottom from "./components/Bottom";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { ErrorBlock } from "antd-mobile";
import ProductList from "./components/ProductList";
import DeviceList from "./components/DeviceList";
import OrganizationList from "./components/OrganizationList";
import OrganizationCard from "./components/OrganizationCard";
import ProductCard from "./components/ProductCard";
import Model from "./components/Model";
import DeviceCard from "./components/DeviceCard";
import QueryItem from "./components/QueryItem";
import DataQuery from "./components/DataQuery";
import Warning from "./components/Warning";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const router = createBrowserRouter([
  {
    path: "/index",
    element: <App />
  },
  {
    path: "/login",
    element: <Login />
  },
  // {
  //   path: "/index",
  //   element: <IndexList />
  // },
  {
    path: "/personalCenter",
    element: <UserInfo />
  },
  {
    path: "/index/product",
    element: <ProductList />
  },
  {
    path: "/orginfo",
    element: <OrganizationCard />
  },
  {
    path: "/product/info",
    element: <ProductCard />
  },
  {
    path: "/product/model",
    element: <Model />
  },
  {
    path: "/product/device",
    element: <DeviceList />
  },
  {
    path: "/product/device/info",
    element: <DeviceCard />
  },
  {
    path: "/product/query",
    element: <QueryItem />
  },
  {
    path: "/product/data",
    element: <DataQuery />
  },
  {
    path: "/product/warning",
    element: <Warning />
  },
  {
    path: "*",
    element: <ErrorBlock status="empty" />
  }
]);

export const idContext = React.createContext("");
root.render(
  <>
    <RouterProvider router={router} />
  </>
);
