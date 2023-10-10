import "./App.css";
import Grid from "./AlgoVisualizer/PathFinder/Grid";
import Home from "./AlgoVisualizer/Home/Home";
import Sorting from "./AlgoVisualizer/Sorting/Sorting";
import Lines from "./AlgoVisualizer/Common/Lines";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Lines></Lines>
      <Routes>
        <Route path="/algoVisualizer" element={<Home />} />
        <Route path="/pathVisualizer" element={<Grid />} />
        <Route path="*" element={<Navigate to="/algoVisualizer" />} />
        <Route path="/sortVisualizer" element={<Sorting />} />
      </Routes>
    </Router>
  );
}

export default App;
