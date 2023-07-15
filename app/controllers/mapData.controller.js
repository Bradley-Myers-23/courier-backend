const db = require("../models");
const MapData = db.mapData;
const Op = db.Sequelize.Op;
const startNode = 'E6'; 
const endNode = 'A1'; 

// Retrieve all MapData from the database.
exports.findAll = (req, res) => {
    const { startAddress, targetAddress } = req.body;
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
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving mapDatas.",
        });
      });
  };

var mysql = require('mysql2');
var con = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PW,
    database:process.env.DB_NAME
})

class Graph {
  constructor() {
    this.nodes = new Map();
  }

  addNode(address) {
    this.nodes.set(address, []);
  }
f
  addEdge(fromNode, toNode) {
    this.nodes.get(fromNode).push(toNode);
  }

  getAdjacentNodes(node) {
    return this.nodes.get(node);
  }
}

// Function to calculate the shortest path using Dijkstra's algorithm
function calculateShortestPath( graph, startNode, endNode, callback) {

  // Create a priority queue for nodes to visit
  const queue = [];
  queue.push({ node: startNode, distance: 0 });

  // Create a map to store the shortest distances
  const distances = new Map();
  distances.set(startNode, 0);


  // Create a map to store the previous node in the shortest path
  const previous = new Map();

  
  // Process nodes in the priority queue until it's empty
  while (queue.length > 0) {
    // Get the node with the minimum distance
    queue.sort((a, b) => a.distance - b.distance);
    const { node, distance } = queue.shift();

    // Check if we have reached the end node
    if (node === endNode) {
      // Build the shortest path by backtracking from the end node
      const path = [];
      let current = node;
      while (previous.get(current)) {
        path.push(current);
        current = previous.get(current);
      }
      path.push(startNode);
      path.reverse();
      return callback(null, { path, distance });
    }

    // Get the adjacent nodes from the graph
    const adjacentNodes = graph.getAdjacentNodes(node);
    

    // Process each adjacent node
    adjacentNodes.forEach((adjacentNode) => {
      const newDistance = distance + 1;

      // Update the distance if it's shorter
      if (!distances.has(adjacentNode) || newDistance < distances.get(adjacentNode)) {
        distances.set(adjacentNode, newDistance);
        previous.set(adjacentNode, node);
        queue.push({ node: adjacentNode, distance: newDistance });
      }
    });
  }

  // No path found
  callback(new Error('No path found.'));
}


// Create the graph and populate it with data from the MySQL table
const graph = new Graph();
con.query('SELECT * FROM mapdata ORDER BY address, AdjacentAddress', (error, results) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log('Query results:', results);


  const addresses = new Set(); 

  results.forEach((result) => {
    const address = result.Address;
    const adjacentAddress = result.AdjacentAddress;
  
    addresses.add(address);
    addresses.add(adjacentAddress);
  
    graph.addNode(address);
    graph.addNode(adjacentAddress);
  });
  
  results.forEach((result) => {
    const address = result.Address;
    const adjacentAddress = result.AdjacentAddress;
  
    graph.addEdge(address, adjacentAddress);
  });

console.log('Graph:', graph);

  // Calculate the shortest path
  calculateShortestPath(graph, startNode, endNode, (error, result) => {
    if (error) {
        console.error(error);
      } else {
        const { path, distance } = result;
        if (path.length === 0) {
          console.log('No path found.');
        } else {
          console.log('Shortest path:', path.join(' -> '));
          console.log('Addresses on the shortest path:', path.join(', '));
          console.log('Shortest distance:', distance);
        }
      }

    // Close the database connection
    con.end();
  });
});

