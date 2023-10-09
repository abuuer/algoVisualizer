import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <header>
        <img src={require("../Common/logo.png")} alt="Logo" className="logo" />
      </header>
      <div className="container">
        <h1>WELCOME TO ALGOVISUALIZER</h1>
        <div className="options">
          <Link to="/sorting" className="option-button">
            Sorting
          </Link>
          <Link to="/path-finding" className="option-button">
            Path Finding
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
