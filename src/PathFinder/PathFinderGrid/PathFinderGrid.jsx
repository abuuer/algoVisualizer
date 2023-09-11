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
  const [startNode, setStartNode] = useState({ row: 10, col: 5 });
  const [finishNode, setFinsih] = useState({ row: 10, col: 45 });
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
    const nodeType = _.isEqual({ row, col }, startNode)
      ? "start"
      : _.isEqual({ row, col }, finishNode)
      ? "finish"
      : "wall";

    setMouseState({ isMouseDown: true, nodeType: nodeType });
    console.log(mouseState);
  };
  // Updates the node's row and column on mouse enter
  const getCoordinates = async (node) => {
    const { row, col } = node;
    if (mouseState.isMouseDown && !isVisButnDisabled) {
      if (
        mouseState.nodeType === "wall" &&
        !_.isEqual({ row, col }, startNode) &&
        !_.isEqual({ row, col }, finishNode)
      ) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-wall";
        updateNodeProperty(node.row, node.col, "wall", true);
      } else if (
        mouseState.nodeType === "start" &&
        !node.wall &&
        !_.isEqual({ row, col }, finishNode)
      ) {
        setStartNode({ row: node.row, col: node.col });
      } else if (
        mouseState.nodeType === "finish" &&
        !node.wall &&
        !_.isEqual({ row, col }, startNode)
      ) {
        setFinsih({ row: node.row, col: node.col });
      }
    }
  };
  // Stops getCoordinates() when mouse is up
  const deactivateMouseState = () => {
    setMouseState({ ...mouseState, isMouseDown: false, nodeType: "" });
  };

  // Updates a given prop of a given node
  const updateNodeProperty = async (row, col, propName, propValue) => {
    console.log(row);
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
    setMouseState({ ...mouseState, isMouseDown: false, nodeType: "" });
    updateIconsAnimation("icons-pointer-event");
    const visitedNodesInOrder = dijkstra(
      nodes,
      nodes[startNode.row][startNode.col],
      nodes[finishNode.row][finishNode.col]
    );
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(
      nodes[finishNode.row][finishNode.col]
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
      .getElementById(`node-${startNode.row}-${startNode.col}`)
      .querySelector("div").className = `icon ${className}`;
    document
      .getElementById(`node-${finishNode.row}-${finishNode.col}`)
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
                  {node.row === startNode.row && node.col === startNode.col && (
                    <div className="icon icons-animation">
                      <PersonPinIcon
                        sx={{ color: lightGreen[700] }}
                        fontSize="medium"
                      />
                    </div>
                  )}
                  {node.row === finishNode.row &&
                    node.col === finishNode.col && (
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
