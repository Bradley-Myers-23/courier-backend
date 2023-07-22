const db = require("../models");
const MapData = db.mapData;
const Op = db.Sequelize.Op;


// Retrieve all MapData from the database.
exports.findAll = (req, res) => {
    const mapDataId = req.query.mapDataId;
    const startAddress = req.body.startAddress;
    const endAddress = req.body.endAddress;
    const condition = mapDataId
      ? {
          id: {
            [Op.like]: `%${mapDataId}%`,
          },
        }
      : null;
  
    MapData.findAll({ where: condition })
      .then((data) => {
        const graph = convertDataToGraph(data);
        calculateShortestPath(graph, startAddress, endAddress, (error, result) => {
          if (error) {
            console.error(error);
            res.status(500).send({
              message: "Error occurred while calculating the shortest path.",
            });
          } else {
            const { path, distance } = result;
            if (path.length === 0) {
              console.log('No path found.');
            } else {
              console.log('Shortest path:', path.join(' -> '));
              console.log('Addresses on the shortest path:', path.join(', '));
              console.log('Shortest distance:', distance);
              const textDirections = generateTextDirections(path, data);

              // Add the textDirections array to the result object
              result.textDirections = textDirections;
             
            }
            res.send(result); 
          }
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving mapDatas.",
        });
      });
  };



class Graph {
  constructor() {
    this.nodes = new Map();
  }

  addNode(address) {
    this.nodes.set(address, []);
  }
  addEdge(fromNode, toNode) {
    this.nodes.get(fromNode).push(toNode);
  }

  getAdjacentNodes(node) {
    return this.nodes.get(node);
  }
}

function convertDataToGraph(results) {   
  const graph = new Graph;
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
 
    return graph;
  }
  
//function to generate the text directions for the path
function generateTextDirections(path, data) {
  console.log("path from text Direction:", path);
  console.log("data from text Direction:", data);

  // Check if there are at least two nodes in the path
  if (path.length < 2) {
    console.log('Insufficient path data to generate text directions.');
    return;
  }

  // Array to store the text directions
  const textDirections = [];

  // Iterate over the path and process each pair of consecutive nodes
  for (let i = 0; i < path.length - 1; i++) {
    const currentNode = path[i];
    const nextNode = path[i + 1];

    // Find the corresponding "data" for the current and next nodes
    const currentData = findDataByAddress(data, currentNode);
    const nextData = findDataByAddress(data, nextNode);

    // If "data" for both nodes is found, extract required information
    if (currentData && nextData) {
      const direction = currentData.Direction;
      const onStreet = currentData.OnStreet;

      // Add the text direction for this pair of nodes to the array
      textDirections.push(`From ${currentNode} Go ${direction} on ${onStreet} To ${nextNode}`);
    }
  }

  // Print the generated text directions
  console.log('Generated Text Directions:');
  console.log(textDirections.join('\n'));

  return textDirections;
}  

// function to find the "data" by its Address or AdjacentAddress
function findDataByAddress(data, address) {
  const foundData = data.find((item) => item.Address === address || item.AdjacentAddress === address);
  return foundData ? foundData.dataValues : null;
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




