import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import Home from "./pages/home";
import Details from "./pages/details";
import Favorites from "./pages/favorites";

function App() {
  return (
    <div>
      {/* npm install react-router-dom */}
      {/*npm install -D tailwindcss*/}
      {/*npx tailwindcss init*/}
      <div className="min-h-screen p-6 bg-white text-gray-600 text-lg">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recipe-item/:id" element={<Details />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
