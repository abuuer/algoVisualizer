import {
  getUnvisitedNeighbors,
} from "./algoHelpers";

export function bfs(nodes, startPosition, finishPosition) {
  let startNode = nodes[startPosition.row][startPosition.col];
  let finishNode = nodes[finishPosition.row][finishPosition.col];
  let visitedNodes = [];
  let unvisitedNodeQueue = [startNode];
  while (unvisitedNodeQueue.length > 0) {
    const closestNode = unvisitedNodeQueue.shift();
    if (closestNode.wall) continue;
    closestNode.isVisited = true;
    visitedNodes.push(closestNode);
    if (closestNode === finishNode) return visitedNodes;
    const neighbors = updateUnvisitedNeighbors(closestNode, nodes, finishNode);
    unvisitedNodeQueue.push(
      ...neighbors.filter((neighbor) => !unvisitedNodeQueue.includes(neighbor))
    );
  }
}


function updateUnvisitedNeighbors(closestNode, nodes) {
  const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, nodes);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.previousNode = closestNode;
  }
  return unvisitedNeighbors;
}