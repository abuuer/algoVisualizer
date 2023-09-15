import { useEffect, useState } from "react";
import "./Grid.css";
import { dijkstra } from "../../algorithms/dijkstra";
import { heuristicAlgorithm } from "../../algorithms/heuristicAlgorithm";
import { bfs } from "../../algorithms/bfs";
import { dfs } from "../../algorithms/dfs";
import { getNodesInShortestPathOrder } from "../../algorithms/algoHelpers";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { lightGreen, deepOrange } from "@mui/material/colors";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import Bar from "../Bar/Bar";
import _ from "lodash";

const algorithms = {
  DIJKSTRA: "Dijkstra's Algorithm",
  AS: "A* Search",
  BFS: "Breadth-first search",
  DFS: "Depth-first search",
  GBFS: "Greedy Best-First Search",
};



function Grid() {
  const [nodes, setNodes] = useState([]);
  const [startPosition, setStartPosition] = useState({ row: 10, col: 5 });
  const [finishPosition, setFinishPosition] = useState({
    row: 10,
    col: numColumns - 5,
  });
  const [mouseState, setMouseState] = useState({
    isMouseDown: false,
    nodeType: "",
  });
  const [isRestartDisabled, setIsRestartDisabled] = useState(true);
  const [isVisButnDisabled, setIsVisButnDisabled] = useState(false);
  const [algorithmName, setAlgorithmName] = useState("DIJKSTRA");
  const [algorithmSpeed, setAlgorithmSpeed] = useState(10);


  useEffect(() => {
    

    setNodes(createInitialNodes(numColumns, 20));

    const handleResize = () => {
      const newNumColumns = calculateColumns();
      setFinishPosition({ row: 10, col: newNumColumns - 5 });
      if (newNumColumns !== numColumns) {
        setNodes(createInitialNodes(newNumColumns, 20));
      }
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isRestartDisabled]);

  // Gets the node type on mouse down
  const activateMouseState = async (node) => {
    const { row, col } = node;
    const nodeType = _.isEqual({ row, col }, startPosition)
      ? "start"
      : _.isEqual({ row, col }, finishPosition)
      ? "finish"
      : "wall";

    setMouseState({ isMouseDown: true, nodeType: nodeType });
  };
  // Updates the node's row and column on mouse enter
  const getCoordinates = async (node) => {
    const { row, col } = node;
    if (mouseState.isMouseDown && !isVisButnDisabled) {
      if (
        mouseState.nodeType === "wall" &&
        !_.isEqual({ row, col }, startPosition) &&
        !_.isEqual({ row, col }, finishPosition)
      ) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-wall";
        updateNodeProperty(node.row, node.col, "wall", true);
      } else if (
        mouseState.nodeType === "start" &&
        !node.wall &&
        !_.isEqual({ row, col }, finishPosition)
      ) {
        setStartPosition({ row: node.row, col: node.col });
      } else if (
        mouseState.nodeType === "finish" &&
        !node.wall &&
        !_.isEqual({ row, col }, startPosition)
      ) {
        setFinishPosition({ row: node.row, col: node.col });
      }
    }
  };
  // Stops getCoordinates() when mouse is up
  const deactivateMouseState = () => {
    setMouseState({ isMouseDown: false, nodeType: "" });
  };

  // Updates a given prop of a given node
  const updateNodeProperty = async (row, col, propName, propValue) => {
    setNodes((prevNodes) => {
      return prevNodes.map((nodeRow, rowIndex) => {
        return nodeRow.map((node, colIndex) => {
          if (rowIndex === row && colIndex === col) {
            // Update the property of the target node
            return { ...node, [propName]: propValue };
          }
          return node;
        });
      });
    });
  };

  const startAlgorithm = async () => {
    let visitedNodesInOrder = [];
    if (algorithms.hasOwnProperty(algorithmName)) {
      switch (algorithmName) {
        case "DIJKSTRA":
          visitedNodesInOrder = dijkstra(nodes, startPosition, finishPosition);
          break;
        case "AS":
          visitedNodesInOrder = heuristicAlgorithm(
            nodes,
            startPosition,
            finishPosition,
            "astar"
          );
          break;
        case "BFS":
          visitedNodesInOrder = bfs(nodes, startPosition, finishPosition);
          break;
        case "DFS":
          visitedNodesInOrder = dfs(nodes, startPosition, finishPosition);
          break;
        case "GBFS":
          visitedNodesInOrder = heuristicAlgorithm(
            nodes,
            startPosition,
            finishPosition,
            "gbfs"
          );
          break;
        default:
          break;
      }
    }
    setIsVisButnDisabled(true);
    setMouseState({ isMouseDown: false, nodeType: "" });
    updateIconsAnimation("icons-pointer-event");

    const nodesInShortestPathOrder = getNodesInShortestPathOrder(
      nodes[finishPosition.row][finishPosition.col]
    );
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    setIsRestartDisabled(true);
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, algorithmSpeed * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node current-node";
        setTimeout(() => {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }, algorithmSpeed);
      }, algorithmSpeed * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
    setTimeout(() => {
      setIsRestartDisabled(false);
    }, 50 * nodesInShortestPathOrder.length);
  };

  const restartAlgorithm = () => {
      console.log("HEEEE:::)")
      clearAnimation();
      setIsVisButnDisabled(false);
      updateIconsAnimation("icons-animation");
  };

  const clearAnimation = () => {
    for (const row of nodes) {
      for (const node of row) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node";
      }
    }
  };

  // Update start/finish icons' css
  const updateIconsAnimation = (className) => {
    document
      .getElementById(`node-${startPosition.row}-${startPosition.col}`)
      .querySelector("div").className = `icon ${className}`;
    document
      .getElementById(`node-${finishPosition.row}-${finishPosition.col}`)
      .querySelector("div").className = `icon ${className}`;
  };

  return (
    <div className="container">
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
      <div className="grid">
        <Bar
          startAlgorithm={startAlgorithm}
          restartAlgorithm={restartAlgorithm}
          setAlgorithmName={setAlgorithmName}
          isVisButnDisabled={isVisButnDisabled}
          isRestartDisabled={isRestartDisabled}
          setAlgorithmSpeed={setAlgorithmSpeed}
        ></Bar>
        <div>
          {nodes.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((node, nodeIndex) => (
                <div
                  key={nodeIndex}
                  id={`node-${node.row}-${node.col}`}
                  className="node"
                  onMouseDown={() => activateMouseState(node)}
                  onMouseUp={() => deactivateMouseState()}
                  onMouseEnter={() => getCoordinates(node)}
                >
                  {node.row === startPosition.row &&
                    node.col === startPosition.col && (
                      <div className="icon icons-animation">
                        <PersonPinIcon
                          sx={{ color: lightGreen[700] }}
                          fontSize="medium"
                        />
                      </div>
                    )}
                  {node.row === finishPosition.row &&
                    node.col === finishPosition.col && (
                      <div className="icon icons-animation">
                        <LocationOnIcon
                          sx={{ color: deepOrange[500] }}
                          fontSize="medium"
                        />
                      </div>
                    )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Grid;


const calculateColumns = () => {
  const screenWidth = window.innerWidth;
  const columnWidth = 24.5;
  return Math.floor(screenWidth / columnWidth);
};

const numColumns = calculateColumns();

const createInitialNodes = (numColumns, numRows) => {
  const initialNodes = [];
  for (let row = 0; row < numRows; row++) {
    const rowNodes = [];
    for (let col = 0; col < numColumns; col++) {
      const currentNode = {
        col,
        row,
        distance: Infinity,
        previousNode: null,
        wall: false,
        heuristic: Infinity,
        fScore: Infinity,
      };
      rowNodes.push(currentNode);
    }
    initialNodes.push(rowNodes);
  }
  return initialNodes;
};