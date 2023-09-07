import { useEffect, useState } from "react";
import "./PathFinderGrid.css";
import {
  dijkstra,
  getNodesInShortestPathOrder,
} from "../../algorithms/dijkstra";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { lightGreen, deepOrange } from "@mui/material/colors";
import PersonPinIcon from "@mui/icons-material/PersonPin";

function PathFinderGrid() {
  const [nodes, setNodes] = useState([]);
  const [startNode, setStart] = useState([7, 4]);
  const [finishNode, setFinsih] = useState([7, 33]);
  const [isMouseDown, setIsMouseDown] = useState([false, ""]);
  const [isRestartDisabled, setIsRestartDisabled] = useState(true);
  const [isWallButnDisabled, setIsWallButnDisabled] = useState(false);
  const [isVisButnDisabled, setIsVisButnDisabled] = useState(false);
  const [isAddWall, setIsAddWall] = useState(false);

  useEffect(() => {
    const initialNodes = [];

    for (let row = 0; row <= 15; row++) {
      const rowNodes = [];
      for (let col = 0; col <= 50; col++) {
        const currentNode = {
          col,
          row,
          startNode: row === startNode[0] && col === startNode[1],
          finishNode: row === finishNode[0] && col === finishNode[1],
          distance: Infinity,
          previousNode: null,
          wall: false,
        };
        rowNodes.push(currentNode);
      }
      initialNodes.push(rowNodes);
    }

    setNodes(initialNodes);
  }, [startNode, finishNode, isRestartDisabled]);

  // Gets the node type on mouse down
  const activateMouseState = (node) => {
    const nodeType = node.startNode
      ? "start"
      : node.finishNode
      ? "finish"
      : "wall";
    setIsMouseDown([true, nodeType]);
  };
  // Updates the node's row and column on mouse enter
  const getCoordinates = async (node) => {
    if (isMouseDown[0]) {
      if (
        isMouseDown[1] === "wall" &&
        isAddWall &&
        !node.startNode &&
        !node.finishNode
      ) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-wall";
        await updateNodeProperty(node.row, node.col, "wall", true);
      } else if (
        isMouseDown[1] === "start" &&
        !node.wall &&
        JSON.stringify([node.row, node.col]) !== JSON.stringify(finishNode)
      ) {
        setStart([node.row, node.col]);
      } else if (
        isMouseDown[1] === "finish" &&
        !node.wall &&
        JSON.stringify([node.row, node.col]) !== JSON.stringify(startNode)
      )
        setFinsih([node.row, node.col]);
    }
  };
  // Stops getCoordinates() when mouse is up
  const deactivateMouseState = (node) => {
    setIsMouseDown([false, ""]);
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
    setIsWallButnDisabled(true);
    setIsVisButnDisabled(true);
    setIsMouseDown([false, ""]);
    updateIconsAnimation("icons-pointer-event");
    const visitedNodesInOrder = dijkstra(
      nodes,
      nodes[startNode[0]][startNode[1]],
      nodes[finishNode[0]][finishNode[1]]
    );
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(
      nodes[finishNode[0]][finishNode[1]]
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
    setIsWallButnDisabled(false);
    setIsAddWall(false);
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
      .getElementById(`node-${startNode[0]}-${startNode[1]}`)
      .querySelector("div").className = `icon ${className}`;
    document
      .getElementById(`node-${finishNode[0]}-${finishNode[1]}`)
      .querySelector("div").className = `icon ${className}`;
  };

  const toggleIsAddWall = () => {
    updateIconsAnimation("icons-pointer-event");
    setIsAddWall((prevIsAddWall) => !prevIsAddWall);
  };

  return (
    <div class="lines">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div className="grid">
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
        <button
          class="button"
          onClick={toggleIsAddWall}
          disabled={isWallButnDisabled}
        >
          {!isAddWall && "Add Walls"}
          {isAddWall && "Stop Adding Walls"}
        </button>
        {nodes.map((row, rowIndex) => (
          <div className="row">
            {row.map((node, nodeIndex) => (
              <div
                id={`node-${node.row}-${node.col}`}
                className="node"
                onMouseDown={() => activateMouseState(node)}
                onMouseUp={() => deactivateMouseState(false)}
                onMouseEnter={() => getCoordinates(node)}
              >
                {node.startNode && (
                  <div className="icon icons-animation">
                    <PersonPinIcon
                      sx={{ color: lightGreen[700] }}
                      fontSize="medium"
                    />
                  </div>
                )}
                {node.finishNode && (
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
  );
}

export default PathFinderGrid;
