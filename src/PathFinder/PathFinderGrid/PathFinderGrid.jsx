import { useEffect, useState } from "react";
import Node from "../Node/Node";
import Bar from "../Bar/Bar";
import "./PathFinderGrid.css";

function PathFinderGrid() {
  const nodes = [];
  const [startNode, setStart] = useState([10, 4]);
  const [finishNode, setFinsih] = useState([10, 35]);
  const [isMouseDown, setIsMouseDown] = useState([false, ""]);

  const activateMouseState = (node) => {
    const nodeType = node.startNode ? "start" : ""; 
    if (node.startNode || node.finishNode) setIsMouseDown([true, nodeType]);
  };
  const deactivateMouseState = (node) => {
    setIsMouseDown([false, ""]);
  };

  const getCoordinates = (node) => {
    if (isMouseDown[0]) {
      if (isMouseDown[1] === "start") setStart([node.row, node.col]);
      else setFinsih([node.row, node.col]);
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
      };
      nodes[row].push(currentNode);
    }
  }

  return (
    <div className="grid">
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
  );
}

export default PathFinderGrid;
