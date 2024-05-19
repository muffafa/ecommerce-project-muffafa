import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import MarketContextProvider from "./Context/MarketContext.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import SingleProduct from "./Components/SingleProduct";
import Market from "./Pages/Market.jsx";
import Cart from "./Pages/Cart";
import Admin from "./Pages/Admin.jsx";
import NotFound from "./Pages/NotFound"; // NotFound bileşenini ekleyin

import ProductManagement from "./Components/ProductManagement";
import CategoryManagement from "./Components/CategoryManagement";
import UserManagement from "./Components/UserManagement";

import Layout from "./Layouts/Layout.jsx";

import { AuthProvider } from "./Context/AuthContext"; // AuthProvider'ı import et
import ProtectedRoute from "./Components/ProtectedRoute";
// import { element } from "prop-types";
import Payment from "./Pages/Payment.jsx";

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
        path: "/product/:id",
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
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/admin",
        element: <ProtectedRoute />, // ProtectedRoute ile koruma
        children: [
          { path: "", element: <Admin /> },
          { path: "products", element: <ProductManagement /> },
          { path: "categories", element: <CategoryManagement /> },
          { path: "users", element: <UserManagement /> },
        ],
      },
      {
        path: "*", // Bilinmeyen URL'ler için
        element: <NotFound />, // NotFound bileşenini ekleyin
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
