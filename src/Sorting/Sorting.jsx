import "./Sorting.css"
import Bar from "../PathFinder/Bar/Bar"


const algorithms = {
  BS: "Bubble Sort",
  QS: "Quick Sort",
  MS: "Merge Sort",
  HS: "Heap Sort",
  SS: "Selection Sort",
};


function Sorting() {
    return (
      <div className="container">
        <div className="grid">
          <Bar
            //   startAlgorithm={startAlgorithm}
            //   restartAlgorithm={restartAlgorithm}
            //   setAlgorithmName={setAlgorithmName}
            //   isVisButnDisabled={isVisButnDisabled}
            //   isRestartDisabled={isRestartDisabled}
            //   setAlgorithmSpeed={setAlgorithmSpeed}
            boxTextFor="sorting"
            algorithms={algorithms}
          ></Bar>
          <div className=""></div>
        </div>
      </div>
    );
}

export default Sorting