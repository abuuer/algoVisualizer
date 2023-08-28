import { useEffect, useState } from "react";
import Node from "../Node/Node";
import Bar from "../Bar/Bar";
import "./PathFinderGrid.css";
import { Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  dijkstra,
  getNodesInShortestPathOrder,
} from "../../algorithms/dijkstra";

function PathFinderGrid() {
  const nodes = [];
  const [startNode, setStart] = useState([7, 4]);
  const [finishNode, setFinsih] = useState([7, 33]);
  const [isMouseDown, setIsMouseDown] = useState([false, ""]);

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
    for (let col = 0; col <= 37; col++) {
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
  };

  return (
    <div>
      <div className="grid">
        <Button
          onClick={startAlgorithm}
          variant="outlined"
          color="success"
          endIcon={<PlayArrowIcon />}
        >
          Start
        </Button>
        {nodes.map((row, rowIndex) => (
          <div className="row">
            {row.map((node, nodeIndex) => (
              <div
                className="node"
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
