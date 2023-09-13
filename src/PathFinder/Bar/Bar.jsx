import "./Bar.css";

function Bar(props) {
  const {
    startAlgorithm,
    restartAlgorithm,
    setAlgorithmName,
    isVisButnDisabled,
    isRestartDisabled,
  } = props;
  return (
    <div>
      <div className="bar">
        <div className="select">
          <select
            className="select-menu"
            onChange={(event) => setAlgorithmName(event.target.value)}
          >
            <option value="DIJKSTRA">Dijkstra's Algorithm</option>
            <option value="AS">A* Search</option>
            <option value="BFS">Breadth-first search</option>
            <option value="DFS">Depth-first search</option>
            <option value="GBFS">Greedy Best-First Search</option>
          </select>
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
