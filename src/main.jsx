import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import MarketContextProvider from "./Context/MarketContext.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import SingleProduct from "./Components/SingleProduct/SingleProduct";
import Market from "./Pages/Market.jsx";
import Cart from "./Pages/Cart";
import Admin from "./Pages/Admin.jsx";

import ProductManagement from "./Components/ProductManagement/ProductManagement.jsx";
import CategoryManagement from "./Components/CategoryManagement/CategoryManagement.jsx";
import UserManagement from "./Components/UserManagement/UserManagement.jsx";

import Layout from "./Layouts/Layout.jsx";

import { AuthProvider } from "./Context/AuthContext"; // AuthProvider'ı import et

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/product",
        element: <SingleProduct />,
      },
      {
        path: "/market",
        element: <Market />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/admin",
        element: <Admin />,
        children: [
          { path: "products", element: <ProductManagement /> },
          { path: "categories", element: <CategoryManagement /> },
          { path: "users", element: <UserManagement /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <MarketContextProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </MarketContextProvider>
);
