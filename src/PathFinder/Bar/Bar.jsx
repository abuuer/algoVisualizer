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
    boxTextFor,
    algorithms,
    sliderParams,
    updateRectangles,
  } = props;

  const [open, setOpen] = useState(true);

  const handleAlgorithmSpeed = (e, value) => {
    if (boxTextFor === "pathFinding"){
      if (speed.hasOwnProperty(value)) {
        setAlgorithmSpeed(speed[value]);
      }
    }
    if (boxTextFor === "sorting") {
        updateRectangles(value);
    }
      
  };
  return (
    <div>
      <div className="bar">
        {boxTextFor === "pathFinding" && (
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
                  <div>
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
                  </div>
                </Alert>
              </ThemeProvider>
            </Collapse>
          </Box>
        )}

        <div className="select-menu">
          <select
            className="select"
            disabled={isVisButnDisabled}
            onChange={(event) => setAlgorithmName(event.target.value)}
          >
            {Object.entries(algorithms).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
          <div className="slider">
            {sliderParams.label}:
            <ThemeProvider theme={btnTheme}>
              <Slider
                aria-label={sliderParams.label}
                // getAriaValueText={valuetext}
                valueLabelDisplay="off"
                step={sliderParams.step}
                min={sliderParams.min}
                max={sliderParams.max}
                defaultValue={sliderParams.max}
                color="primary"
                disabled={isVisButnDisabled}
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
