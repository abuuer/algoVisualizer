import {
  getAllNodes,
  sortUnvisitedNodes,
  getUnvisitedNeighbors,
} from "./algoHelpers";

export function dijkstra(nodes, startPosition, finishPosition) {
  let unvisitedNodes = getAllNodes(nodes);
  let startNode = nodes[startPosition.row][startPosition.col];
  let finishNode = nodes[finishPosition.row][finishPosition.col];
  startNode.distance = 0;
  let visitedNodes = [];
  while (unvisitedNodes.length) {
    sortUnvisitedNodes(unvisitedNodes, "distance");
    const closestNode = unvisitedNodes.shift();
    if (closestNode.wall) continue;
    if (closestNode.distance === Infinity) return visitedNodes;
    closestNode.isVisited = true;
    visitedNodes.push(closestNode);
    if (closestNode === finishNode) return visitedNodes;
    updateUnvisitedNeighbors(closestNode, nodes);
  }
}

function updateUnvisitedNeighbors(closestNode, nodes) {
  const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, nodes);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = closestNode.distance + 1;
    neighbor.previousNode = closestNode;
  }
}





