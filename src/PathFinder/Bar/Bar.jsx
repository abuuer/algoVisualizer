import { Slider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Bar.css";

const theme = createTheme({
  palette: {
    primary: { main: "#63617a" },
  },
});

const speed = { '1': 110, '2': 60, '3': 10 };

function Bar(props) {
  const {
    startAlgorithm,
    restartAlgorithm,
    setAlgorithmName,
    isVisButnDisabled,
    isRestartDisabled,
    setAlgorithmSpeed,
  } = props;

  const handleAlgorithmSpeed = (e, value) => {
    if (speed.hasOwnProperty(value)) {
      setAlgorithmSpeed(speed[value]);
    }
  };
  return (
    <div>
      <div className="bar">
        <div className="select">
          <select
            className="select-menu"
            disabled={isVisButnDisabled}
            onChange={(event) => setAlgorithmName(event.target.value)}
          >
            <option value="DIJKSTRA">Dijkstra's Algorithm</option>
            <option value="AS">A* Search</option>
            <option value="BFS">Breadth-first search</option>
            <option value="DFS">Depth-first search</option>
            {/* <option value="GBFS">Greedy Best-First Search</option> */}
          </select>
          <div className="slider">
            Speed:
            <ThemeProvider theme={theme}>
              <Slider
                aria-label="Speed"
                // getAriaValueText={valuetext}
                valueLabelDisplay="off"
                step={1}
                min={1}
                max={3}
                defaultValue={3}
                color="primary"
                disabled={isVisButnDisabled}
                marks
                onChange={handleAlgorithmSpeed}
              />
            </ThemeProvider>
          </div>
        </div>
        <div className="buttons">
          <button
            className="button"
            onClick={startAlgorithm}
            disabled={isVisButnDisabled}
          >
            Visualize
          </button>
          <button
            className="button"
            onClick={restartAlgorithm}
            disabled={isRestartDisabled}
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Bar;
