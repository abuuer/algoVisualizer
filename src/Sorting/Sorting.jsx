import "./Sorting.css";
import Bar from "../PathFinder/Bar/Bar";
import { useState, useEffect } from "react";
import bubbleSort from "./algorithms/bubbleSort";
import quickSort from "./algorithms/quickSort";
import mergeSort from "./algorithms/mergeSort";

const algorithms = {
  BS: "Bubble Sort",
  QS: "Quick Sort",
  MS: "Merge Sort",
  HS: "Heap Sort",
  SS: "Selection Sort",
};

function Sorting() {
  const [rectangles, setRectangles] = useState([]);
  const [rectanglesNumber, setRectanglesNumber] = useState(5);
  const [isRestartDisabled, setIsRestartDisabled] = useState(true);
  const [isVisButnDisabled, setIsVisButnDisabled] = useState(false);
  const [algorithmName, setAlgorithmName] = useState("BS");

  const [recWidth, setRecWidth] = useState(
    Math.floor(window.innerWidth / (rectanglesNumber * 3))
  );

  useEffect(() => {
    setRecWidth(getRecWidth());
    setRectangles(generateRectangles(rectanglesNumber));
  }, [rectanglesNumber]);

  const getRecWidth = () => {
    return Math.floor(window.innerWidth / (rectanglesNumber * 2));
  };

  const updateRectangles = (number) => {
    setRectanglesNumber(number);
  };

  const startAlgorithm = async () => {
    if (algorithms.hasOwnProperty(algorithmName)) {
      setIsVisButnDisabled(true);
      switch (algorithmName) {
        case "BS":
          await bubbleSort(rectangles, setRectangles);
          break;
        case "QS":
          await quickSort(rectangles, 0, rectanglesNumber - 1, setRectangles);
          break;
        case "MS":
          await mergeSort(rectangles, 0, rectanglesNumber - 1, setRectangles);
          break;
        default:
          break;
      }
      setIsRestartDisabled(false);
    }
  };

  const restartAlgorithm = () => {
    setIsVisButnDisabled(false);
    setIsRestartDisabled(true);
    // clearAnimation();
    setRectangles(generateRectangles(rectanglesNumber));
  };

  const clearAnimation = () => {
    for (let i = 0; i < rectangles.length; i++) {
      const element = document.getElementById(`${i}`);
      element.className = "rectangle";
    }
  };

  return (
    <div className="container">
      <div className="grid">
        <Bar
          startAlgorithm={startAlgorithm}
          restartAlgorithm={restartAlgorithm}
          setAlgorithmName={setAlgorithmName}
          isVisButnDisabled={isVisButnDisabled}
          isRestartDisabled={isRestartDisabled}
          boxTextFor="sorting"
          algorithms={algorithms}
          sliderParams={{
            label: "Speed / Array size",
            step: 1,
            min: 5,
            max: 600,
            display: "auto",
          }}
          updateRectangles={updateRectangles}
        ></Bar>
        <div className="rectangles">
          {rectangles.map((rectangle, index) => (
            <div
              id={index}
              className="rectangle"
              style={{
                height: `${rectangle}px`,
                width: recWidth,
                margin: `0 0.5px`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sorting;

const generateRectangles = (rectanglesNumber) => {
  const initialRecs = [];
  for (let i = 0; i < rectanglesNumber; i++) {
    const rect = Math.floor(Math.random() * 450 + 50);
    initialRecs.push(rect);
  }
  return initialRecs;
};
