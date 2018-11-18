// Import MySQL Connection
const connection = require('./connection');

const orm = {
    selectAll,
    insertOne,
    updateOne,
};

// Export the orm object for the model. (sushi.js)
module.exports = orm;