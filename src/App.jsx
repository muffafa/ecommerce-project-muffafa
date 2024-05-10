import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import './App.css'
import Populer from './Components/Populer/Populer'
import Teklifler from './Components/Teklifler/Teklifler'
import Newsletter from './Components/Newsletter/Newsletter'
import YeniUrunler from './Components/YeniUrunler/YeniUrunler'
import Footer from './Components/Footer/Footer'
import LoginSignup from './Pages/LoginSignup'
import SingleProduct from './Components/SingleProduct/SingleProduct'

function App() {

  return (
    <>
    <Navbar></Navbar>
    <Hero></Hero>
    <Populer></Populer>
    <Teklifler></Teklifler>
    <YeniUrunler></YeniUrunler>
    <Newsletter></Newsletter>
    <Footer></Footer>
    </>
  )
}

export default App


/*

    <Hero></Hero>
    <Populer></Populer>
    <Teklifler></Teklifler>
    <YeniUrunler></YeniUrunler>
    <Newsletter></Newsletter>

*/