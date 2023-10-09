import { Slider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Collapse from "@mui/material/Collapse";
import "./Bar.css";
import { useState } from "react";
import data from "../../Common/data.json";

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
    algorithmCategory,
    algorithms,
    sliderParams,
    updateRectangles,
  } = props;

  const [open, setOpen] = useState(true);

  const handleAlgorithmSpeed = (e, value) => {
    if (algorithmCategory === "pathFinding") {
      if (speed.hasOwnProperty(value)) {
        setAlgorithmSpeed(speed[value]);
      }
    }
    if (algorithmCategory === "sorting") {
      updateRectangles(value);
    }
  };
  return (
    <div>
      <div className="bar">
        <Box
          style={{
            width: "45%",
            position: "fixed",
            top: 105,
            opacity: 0.8,
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
                {algorithmCategory === "pathFinding" && (
                  <div>{data.pathFindingInstructions}</div>
                )}
                {algorithmCategory === "sorting" && (
                  <div>{data.sortingInstructions}</div>
                )}
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
                valueLabelDisplay={sliderParams.display}
                step={sliderParams.step}
                min={sliderParams.min}
                max={sliderParams.max}
                defaultValue={sliderParams.min}
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
