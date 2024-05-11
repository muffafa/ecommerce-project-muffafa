import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MarketContextProvider from './Context/MarketContext.jsx'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import {Outlet,  RouterProvider, createBrowserRouter } from "react-router-dom"
import LoginSignup from "./Pages/LoginSignup.jsx";
import SingleProduct from './Components/SingleProduct/SingleProduct'
import Market from './Pages/Market.jsx'
import Cart from './Pages/Cart'

const Layout = () => {
  return(
    <div>
      <Navbar></Navbar>
      <Outlet/>
      <Footer></Footer>
    </div>
  )
}

const router = createBrowserRouter([{
  path:'/',
  element: <Layout />,
  children:[
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/login",
      element: <LoginSignup />,
    },
    {
      path: "/product",
      element: <SingleProduct />
    },
    {
      path: "/market",
      element: <Market/>,
    },
    {
      path: "/cart",
      element: <Cart/>,
    }
  ], 

}])

ReactDOM.createRoot(document.getElementById('root')).render(

  <MarketContextProvider>
    <RouterProvider router={router} />
  </MarketContextProvider>

)
