const db = require("../models");
const MapData = db.mapData;
const Op = db.Sequelize.Op;


 // Retrieve all MapDatas from the database.
 exports.findAll = (req, res) => {
  const { start, target } = req.body;
  const mapDataId = req.query.mapDataId;
  const condition = mapDataId
    ? {
        id: {
          [Op.like]: `%${mapDataId}%`,
        },
      }
    : null;

  MapData.findAll({ where: condition })
    .then((data) => {
      const graph = convertDataToGraph(data); // Call a function to convert the data into a graph
      const shortestPath = dijkstra(graph, start, target); // Call the dijkstra function

      console.log("Shortest path:", shortestPath);
      res.send(shortestPath);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving mapDatas.",
      });
    });
};

function convertDataToGraph(data) {
  const graph = {};

  data.forEach((item) => {
    const address = item.Address;
    const adjacentAddress = item.AdjacentAddress;
    const direction = item.Direction;

    if (!graph[address]) {
      graph[address] = [];
    }
    graph[address].push({ address: adjacentAddress, direction: direction });
  });

  return graph;
}


function dijkstra(graph, start, target) {
  const distances = {};
  const previousNodes = {};
  const visited = new Set();

  // Initialize distances with infinity except for the start node
  for (const node in graph) {
    distances[node] = node === start ? 0 : Infinity;
  }

  let currentNode = start;

  while (currentNode !== target) {
    visited.add(currentNode);

    const neighbors = graph[currentNode];

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor.address)) {
        const distance = distances[currentNode] + 1; // Assuming all edges have weight 1

        if (distance < distances[neighbor.address]) {
          distances[neighbor.address] = distance;
          previousNodes[neighbor.address] = currentNode;
        }
      }
    }

    // Find the unvisited node with the smallest distance
    let smallestDistance = Infinity;
    let smallestNode;

    for (const node in graph) {
      if (!visited.has(node) && distances[node] < smallestDistance) {
        smallestDistance = distances[node];
        smallestNode = node;
      }
    }

    if (!smallestNode) {
      break; // No path found
    }

    currentNode = smallestNode;
  }

  // Build the shortest path
  const shortestPath = [];
  let node = target;

  while (node !== start) {
    const direction = graph[previousNodes[node]].find(
      (neighbor) => neighbor.address === node
    ).direction;
    shortestPath.unshift({ address: node, direction });
    node = previousNodes[node];
  }

  shortestPath.unshift({ address: start, direction: null });

  return shortestPath;
}




