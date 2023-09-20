import "./App.css";
import Grid from "./PathFinder/Grid/Grid";
import Home from "./Home/Home";
import Sorting from "./Sorting/Sorting";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/algoVisualizer" element={<Home />} />
        <Route path="/Grid" element={<Grid />} />
        <Route path="*" element={<Home />} />
        <Route path="/Sorting" element={<Sorting />} />
      </Routes>
    </Router>
  );
}

export default App;
