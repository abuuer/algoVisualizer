import { useEffect, useState } from "react";
import "./PathFinderGrid.css";
import {
  dijkstra,
  getNodesInShortestPathOrder,
} from "../../algorithms/dijkstra";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { lightGreen, deepOrange } from "@mui/material/colors";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import _ from "lodash";

function PathFinderGrid() {
  const [nodes, setNodes] = useState([]);
  const [startPosition, setStartPosition] = useState({ row: 10, col: 5 });
  const [finishPosition, setFinsihPosition] = useState({ row: 10, col: 45 });
  const [mouseState, setMouseState] = useState({
    isMouseDown: false,
    nodeType: "",
  });
  const [isRestartDisabled, setIsRestartDisabled] = useState(true);
  const [isVisButnDisabled, setIsVisButnDisabled] = useState(false);

  useEffect(() => {
    const initialNodes = [];

    for (let row = 0; row <= 20; row++) {
      const rowNodes = [];
      for (let col = 0; col <= 52; col++) {
        const currentNode = {
          col,
          row,
          distance: Infinity,
          previousNode: null,
          wall: false,
        };
        rowNodes.push(currentNode);
      }
      initialNodes.push(rowNodes);
    }

    setNodes(initialNodes);
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
        setFinsihPosition({ row: node.row, col: node.col });
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
    setIsVisButnDisabled(true);
    setMouseState({ isMouseDown: false, nodeType: "" });
    updateIconsAnimation("icons-pointer-event");
    const visitedNodesInOrder = dijkstra(nodes, startPosition, finishPosition);
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
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
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
    <div class="container">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div className="grid">
        <div className="buttons">
          <button
            class="button"
            onClick={startAlgorithm}
            disabled={isVisButnDisabled}
          >
            Visualize
          </button>
          <button
            class="button"
            onClick={restartAlgorithm}
            disabled={isRestartDisabled}
          >
            Restart
          </button>
        </div>
        <div>
          {nodes.map((row, rowIndex) => (
            <div className="row">
              {row.map((node, nodeIndex) => (
                <div
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

export default PathFinderGrid;
