import "./App.css";
import Grid from "./PathFinder/Grid/Grid";
import Home from "./Home/Home";
import Sorting from "./Sorting/Sorting";
import Lines from "./Common/Lines";
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
        <Route path="/path-finding" element={<Grid />} />
        <Route path="*" element={<Navigate to="/algoVisualizer" />} />
        <Route path="/Sorting" element={<Sorting />} />
      </Routes>
    </Router>
  );
}

export default App;
