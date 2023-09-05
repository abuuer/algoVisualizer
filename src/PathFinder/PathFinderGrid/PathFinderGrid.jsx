import { useEffect, useState } from "react";
import Node from "../Node/Node";
import Bar from "../Bar/Bar";
import "./PathFinderGrid.css";
import { Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  dijkstra,
  getNodesInShortestPathOrder,
} from "../../algorithms/dijkstra";

function PathFinderGrid() {
  const nodes = [];
  const [startNode, setStart] = useState([7, 4]);
  const [finishNode, setFinsih] = useState([7, 33]);
  const [isMouseDown, setIsMouseDown] = useState([false, ""]);
  const [visitedNodesInOrder, setVisitedNodesInOrder] = useState([]);
  const [nodesInShortestPathOrder, setNodesInShortestPathOrder] = useState([]);
  const [isRestartDisabled, setIsRestartDisabled] = useState(true);
  const [pointerEvent, setPointerEvent] = useState("");

  useEffect(() => {
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }, [visitedNodesInOrder, nodesInShortestPathOrder]);

  const activateMouseState = (node) => {
    const nodeType = node.startNode ? "start" : node.finishNode ? "finish" : "";
    if (node.startNode || node.finishNode) setIsMouseDown([true, nodeType]);
  };
  const deactivateMouseState = (node) => {
    setIsMouseDown([false, ""]);
  };

  const getCoordinates = (node) => {
    if (isMouseDown[0]) {
      if (
        isMouseDown[1] === "start" &&
        JSON.stringify([node.row, node.col]) !== JSON.stringify(finishNode)
      )
        setStart([node.row, node.col]);
      else if (
        isMouseDown[1] === "finish" &&
        JSON.stringify([node.row, node.col]) !== JSON.stringify(startNode)
      )
        setFinsih([node.row, node.col]);
    }
  };

  for (let row = 0; row <= 15; row++) {
    nodes.push([]);
    for (let col = 0; col <= 50; col++) {
      const currentNode = {
        col,
        row,
        startNode: row === startNode[0] && col === startNode[1],
        finishNode: row === finishNode[0] && col === finishNode[1],
        distance: Infinity,
        previousNode: null,
      };
      nodes[row].push(currentNode);
    }
  }

  const startAlgorithm = () => {
    setPointerEvent("animation-on");
    setVisitedNodesInOrder(
      dijkstra(
        nodes,
        nodes[startNode[0]][startNode[1]],
        nodes[finishNode[0]][finishNode[1]]
      )
    );
    setNodesInShortestPathOrder(
      getNodesInShortestPathOrder(nodes[finishNode[0]][finishNode[1]])
    );
  };
  const restartAlgorithm = () => {
    // setVisitedNodesInOrder([]);
    // setNodesInShortestPathOrder([]);
    clearAnimation();
    setPointerEvent("");
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

  const animateShortestPath = async (nodesInShortestPathOrder) => {
    await nodesInShortestPathOrder.forEach((node) => {
      setTimeout(() => {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50);
    });
    setIsRestartDisabled(false);
  };

  const clearAnimation = () => {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      const node = visitedNodesInOrder[i];
      document.getElementById(`node-${node.row}-${node.col}`).className = "";
    }
  };

  return (
    <div class="lines">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div className="grid">
        <button class="button" onClick={startAlgorithm}>
          Visualize
        </button>
        <button
          class="button"
          onClick={restartAlgorithm}
          disabled={isRestartDisabled}
        >
          Restart
        </button>
        {nodes.map((row, rowIndex) => (
          <div className="row">
            {row.map((node, nodeIndex) => (
              <div
                className={`node ${pointerEvent}`}
                onMouseDown={() => activateMouseState(node)}
                onMouseUp={() => deactivateMouseState(false)}
                onMouseEnter={() => getCoordinates(node)}
              >
                <Node currentNode={node}></Node>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PathFinderGrid;
