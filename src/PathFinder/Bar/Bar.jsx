import { Slider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Collapse from "@mui/material/Collapse";
import "./Bar.css";
import { useState } from "react";

const btnTheme = createTheme({
  palette: {
    primary: { main: "#63617a" },
  },
});

const alertTheme = createTheme({
  palette: {
    info: { main: "#63617a" },
  },
});

const speed = { 1: 110, 2: 60, 3: 10 };

function Bar(props) {
  const {
    startAlgorithm,
    restartAlgorithm,
    setAlgorithmName,
    isVisButnDisabled,
    isRestartDisabled,
    setAlgorithmSpeed,
  } = props;

  const [open, setOpen] = useState(true);

  const handleAlgorithmSpeed = (e, value) => {
    if (speed.hasOwnProperty(value)) {
      setAlgorithmSpeed(speed[value]);
    }
  };
  return (
    <div>
      <div className="bar">
        <Box
          style={{
            width: "45%",
            position: "fixed",
            "margin-left": 10,
            top: 100,
            opacity: 0.9,
            whiteSpace: "pre-line",
            textAlign: "left",
          }}
        >
          <Collapse in={open}>
            <ThemeProvider theme={alertTheme}>
              <Alert
                severity="info"
                icon={false}
                action={
                  <HighlightOffIcon
                    aria-label="close"
                    fontSize="small"
                    color="inherit"
                    onClick={() => {
                      setOpen(false);
                    }}
                  ></HighlightOffIcon>
                }
                sx={{ mb: 2 }}
              >
                Drag and drop the start and finish icons to different cells.
                {"\n"}
                Place obstacles on the grid by clicking on the cells.{"\n"}
                Choose one of the path-finding algorithms from the dropdown
                menu.{"\n"}
                Use the slider to adjust the speed of the algorithm
                visualization.{"\n"}
                Click the "Visualize" button to start the algorithm.{"\n"}
                To start a new visualization, click the "Restart" button and
                repeat the process.
              </Alert>
            </ThemeProvider>
          </Collapse>
        </Box>

        <div className="select-menu">
          <select
            className="select"
            disabled={isVisButnDisabled}
            onChange={(event) => setAlgorithmName(event.target.value)}
          >
            <option value="DIJKSTRA">Dijkstra's Algorithm</option>
            <option value="AS">A* Search</option>
            <option value="BFS">Breadth-first search</option>
            <option value="DFS">Depth-first search</option>
            <option value="GBFS">Greedy Best-First Search</option>
          </select>
          <div className="slider">
            Speed:
            <ThemeProvider theme={btnTheme}>
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
