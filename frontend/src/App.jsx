import "./App.css";
import Hero from "./Components/Hero";
import Indirim from "./Components/Indirim";
import Teklifler from "./Components/Teklifler";
import Newsletter from "./Components/Newsletter";
import SonGuncellenenUrunler from "./Components/SonGuncellenenUrunler";

function App() {
  return (
    <>
      <Hero />
      <Indirim />
      <Teklifler />
      <SonGuncellenenUrunler />
      <Newsletter />
    </>
  );
}

export default App;
