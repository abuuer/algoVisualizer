export function dijkstra(nodes, startPosition, finishPosition) {
  let unvisitedNodes = getAllNodes(nodes);
  let startNode = nodes[startPosition.row][startPosition.col];
  let finishNode = nodes[finishPosition.row][finishPosition.col];
  startNode.distance = 0;
  let visitedNodes = [];
  while (unvisitedNodes.length) {
    sortUnvisitedNodes(unvisitedNodes);
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

function getUnvisitedNeighbors(closestNode, nodes) {
  const neighbors = [];
  const { col, row } = closestNode;
  if (row > 0) neighbors.push(nodes[row - 1][col]);
  if (row < nodes.length - 1) neighbors.push(nodes[row + 1][col]);
  if (col > 0) neighbors.push(nodes[row][col - 1]);
  if (col < nodes[0].length - 1) neighbors.push(nodes[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

const sortUnvisitedNodes = (unvisitedNodes) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const getAllNodes = (nodes) => {
  const allNodes = [];
  for (const row of nodes) {
    for (const col of row) {
      allNodes.push(col);
    }
  }
  return allNodes;
};

export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
