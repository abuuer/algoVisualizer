import {updateNeighborsPrevNode } from "./algoHelpers";

export function dfs(nodes, startPosition, finishPosition) {
  let startNode = nodes[startPosition.row][startPosition.col];
  let finishNode = nodes[finishPosition.row][finishPosition.col];
  let visitedNodes = [];
  let unvisitedNodeStack = [startNode];
  while (unvisitedNodeStack.length > 0) {
    const closestNode = unvisitedNodeStack.pop();
    if (closestNode.wall) continue;
    closestNode.isVisited = true;
    visitedNodes.push(closestNode);
    if (closestNode === finishNode) return visitedNodes;
    const neighbors = updateNeighborsPrevNode(closestNode, nodes, finishNode);
    unvisitedNodeStack.push(
      ...neighbors.filter((neighbor) => !unvisitedNodeStack.includes(neighbor))
    );
  }
}


