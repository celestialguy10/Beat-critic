import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import AlbumDetails from "./pages/AlbumDetails";
import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router";
import Favourites from "./pages/Favourites";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path=":albumId" element={<AlbumDetails />} />
        <Route path="favourites" element={<Favourites />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
