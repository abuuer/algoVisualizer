import {
  getUnvisitedNeighbors,
  getAllNodes,
  sortUnvisitedNodes,
} from "./algoHelpers";

export function astar(nodes, startPosition, finishPosition) {
    let unvisitedNodes = getAllNodes(nodes);
    let startNode = nodes[startPosition.row][startPosition.col];
    let finishNode = nodes[finishPosition.row][finishPosition.col];
    startNode.distance = 0;
    startNode.sum_h_distance = 0;
    startNode.heuristic = 0;
    let visitedNodes = [];
    while (unvisitedNodes.length) {
      sortUnvisitedNodes(unvisitedNodes, "sum_h_distance");
      const closestNode = unvisitedNodes.shift();
      if (closestNode.wall) continue;
      if (closestNode.sum_h_distance === Infinity) return visitedNodes;
      closestNode.isVisited = true;
      visitedNodes.push(closestNode);
      if (closestNode === finishNode) return visitedNodes;
      updateUnvisitedNeighbors(closestNode, nodes, finishNode);
    }
}


function updateUnvisitedNeighbors(closestNode, nodes, finishNode) {
  const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, nodes);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = closestNode.distance + 1;
    neighbor.heuristic = heuristic(closestNode, finishNode);
    neighbor.sum_h_distance = neighbor.distance + neighbor.heuristic;
    neighbor.previousNode = closestNode;
  }
}

const heuristic = (closestNode, finishNode) => {
    return (
      Math.abs(closestNode.row - finishNode.row) +
      Math.abs(closestNode.col - finishNode.col)
    );
}