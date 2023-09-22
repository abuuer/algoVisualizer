import "./Sorting.css";
import Bar from "../PathFinder/Bar/Bar";
import { useState, useEffect } from "react";
import bubbleSort from "./algorithms/bubbleSort";

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
  }, [isRestartDisabled, rectanglesNumber]);

  const getRecWidth = () => {
    return Math.floor(window.innerWidth / (rectanglesNumber * 2));
  };

  const updateRectangles = (number) => {
    setRectanglesNumber(number);
  };

  const startAlgorithm = () => {
    if (algorithms.hasOwnProperty(algorithmName)) {
      let sortedrecs = [];
      switch (algorithmName) {
        case "BS":
          sortedrecs = bubbleSort(rectangles);
          break;
        default:
          break;
      }
      setIsVisButnDisabled(true);
      animateBubbleSort(sortedrecs);
    }
  };

  const animateBubbleSort = (arr) => {
    let i = 0;
    let rectanglesCopy = rectangles;

    const animationInterval = () => {
      if (i < arr.length) {
        const element = arr[i];

        // modifies current rectangle color
        document.getElementById(`${element.currntRecIndx + 1}`).className =
          "rectangle rectangle-current";

        // new array with the swapped elements
        const newArray = [
          ...rectanglesCopy.slice(0, element.currntRecIndx),
          ...element.swappedRecs,
          ...rectanglesCopy.slice(element.currntRecIndx + 2),
        ];
        rectanglesCopy = newArray;

        setRectangles(rectanglesCopy);

        setTimeout(() => {
          // removes the current rectangle color
          document.getElementById(`${element.currntRecIndx + 1}`).className =
            "rectangle";
          i++;
          animationInterval();
        }, 5000 / rectanglesNumber);
      }
    };

    animationInterval();
  };

  return (
    <div className="container">
      <div className="grid">
        <Bar
          startAlgorithm={startAlgorithm}
          //   restartAlgorithm={restartAlgorithm}
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
                height: `${rectangle.height}px`,
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
    const rect = { height: Math.floor(Math.random() * 450 + 50) };
    initialRecs.push(rect);
  }
  return initialRecs;
};
