const getNodesInShortestPathOrder = (finishNode) => {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
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

const sortUnvisitedNodes = (unvisitedNodes, property) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA[property] - nodeB[property]);
};

function getUnvisitedNeighbors(closestNode, nodes) {
  const neighbors = [];
  const { col, row } = closestNode;
  if (row > 0) neighbors.push(nodes[row - 1][col]);
  if (row < nodes.length - 1) neighbors.push(nodes[row + 1][col]);
  if (col > 0) neighbors.push(nodes[row][col - 1]);
  if (col < nodes[0].length - 1) neighbors.push(nodes[row][col + 1]);
//   if (col > 0 && row > 0) neighbors.push(nodes[row - 1][col - 1]);
//   if (col < nodes[0].length - 1 && row > 0)
//     neighbors.push(nodes[row - 1][col + 1]);
//   if (col > 0 && row < nodes[0].length - 1)
//     neighbors.push(nodes[row + 1][col - 1]);
//   if (col < nodes[0].length - 1 && row < nodes[0].length - 1)
//     neighbors.push(nodes[row + 1][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

export {
  getNodesInShortestPathOrder,
  getAllNodes,
  sortUnvisitedNodes,
  getUnvisitedNeighbors,
};
