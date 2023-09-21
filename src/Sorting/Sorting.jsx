import "./Sorting.css";
import Bar from "../PathFinder/Bar/Bar";
import { useState, useEffect } from "react";

const algorithms = {
  BS: "Bubble Sort",
  QS: "Quick Sort",
  MS: "Merge Sort",
  HS: "Heap Sort",
  SS: "Selection Sort",
};

function Sorting() {
  const [rectangles, setRectangles] = useState([]);
  const [rectanglesNumber, setRectanglesNumber] = useState(100);
  const [isRestartDisabled, setIsRestartDisabled] = useState(true);
  const [isVisButnDisabled, setIsVisButnDisabled] = useState(false);
  const [recWidth, setRecWidth] = useState(
    Math.floor(window.innerWidth / (rectanglesNumber * 3))
  );

  useEffect(() => {
    setRecWidth(getRecWidth());
    setRectangles(generateRectangles(rectanglesNumber));
  }, [isRestartDisabled, rectanglesNumber]);

  const getRecWidth = () => {
    return Math.floor(window.innerWidth / (rectanglesNumber * 3));
  };

  const updateRectangles = (number) => {
    setRectanglesNumber(number);
  };
  return (
    <div className="container">
      <div className="grid">
        <Bar
          //   startAlgorithm={startAlgorithm}
          //   restartAlgorithm={restartAlgorithm}
          //   setAlgorithmName={setAlgorithmName}
          isVisButnDisabled={isVisButnDisabled}
          isRestartDisabled={isRestartDisabled}
          //   setAlgorithmSpeed={setAlgorithmSpeed}
          boxTextFor="sorting"
          algorithms={algorithms}
          sliderParams={{
            label: "Speed / Array size",
            step: 1,
            min: 5,
            max: 100,
          }}
          updateRectangles={updateRectangles}
        ></Bar>
        <div className="rectangles">
          {rectangles.map((rectangle) => (
            <div
              className="rectangle"
              style={{
                height: `${rectangle.height}px`,
                width: recWidth,
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
    const rect = { height: Math.random() * 450 + 50 };
    initialRecs.push(rect);
  }
  return initialRecs;
};
