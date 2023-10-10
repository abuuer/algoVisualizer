import "./Home.scss";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <header>
        <img src={require("../Common/logo.png")} alt="Logo" className="logo" />
      </header>
      <div className="container">
        <h4 class="wordCarousel">
          <span>WELCOME TO </span>
          <div>
            <ul class="flip3">
              <li style={{ opacity: "0.8" }}>ALGOVISUALIZER</li>
              <li>PATHVISUALIZER</li>
              <li>SORTVISUALIZER</li>
            </ul>
          </div>
        </h4>
        <p>
          Discover the magic of algorithms through mesmerizing visualizations
          and gain valuable insights into their inner workings with
          AlgoVisualizer
        </p>
        <div className="options">
          <Link to="/sortVisualizer" className="option-button">
            SortVisualizer
          </Link>
          <Link to="/pathVisualizer" className="option-button">
            PathVisualizer
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
