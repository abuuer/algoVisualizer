import { useEffect, useState } from "react";
import Node from "../Node/Node";
import Bar from "../Bar/Bar";
import "./PathFinderGrid.css"

function PathFinderGrid() {
  const nodes = [];
//   const [start, setStart] = useState();
//   const [finish, setFinsih] = useState();

 

    for (let row = 0; row <= 15; row++) {
      nodes.push([]);
      for (let col = 0; col <= 40; col++) {
        const currentNode ={
          col,
          row,
          startNode: row === 10 && col === 4,
          finishNode: row === 10 && col === 35,
        };
        nodes[row].push(currentNode);
      }
    }
    console.log(nodes);


  return (
    <div className="grid">
      {nodes.map((row, rowIndex) => (
        <div className="row">
          {row.map((node, nodeIndex) => (
            <Node currentNode={node}></Node>
          ))}
        </div>
      ))}
    </div>
  );
}

export default PathFinderGrid;
