import {
  getUnvisitedNeighbors,
  getAllNodes,
  sortUnvisitedNodes,
} from "./algoHelpers";

export function heuristicAlgorithm(nodes, startPosition, finishPosition, algoName) {
    let unvisitedNodes = getAllNodes(nodes);
    let startNode = nodes[startPosition.row][startPosition.col];
    let finishNode = nodes[finishPosition.row][finishPosition.col];
    startNode.distance = 0;
    startNode.heuristic = heuristic(startNode, finishNode);
    startNode.fScore = startNode.distance + startNode.heuristic;
    let visitedNodes = [];
    while (unvisitedNodes.length) {
      if (algoName === "astar") sortUnvisitedNodes(unvisitedNodes, "fScore");
      if (algoName === "gbfs") sortUnvisitedNodes(unvisitedNodes, "heuristic");
      const closestNode = unvisitedNodes.shift();
      if (closestNode.wall) continue;
      if (closestNode.fScore === Infinity) return visitedNodes;
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
    neighbor.heuristic = heuristic(neighbor, finishNode);
    neighbor.fScore = neighbor.distance + neighbor.heuristic;
    neighbor.previousNode = closestNode;
  }
}

const heuristic = (closestNode, finishNode) => {
    return (
      Math.abs(closestNode.row - finishNode.row) +
      Math.abs(closestNode.col - finishNode.col)
    );
}