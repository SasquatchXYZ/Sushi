// Import MySQL Connection
const connection = require('./connection');

// Configured the 'Object-Relational Mapper' for making queries to the database - defining our functions and parameters.
const orm = {

    // Query to retrieve all of the sushi information in the database.
    selectAll: function (cb) {
        const queryAll = 'SELECT * FROM sushi';
        connection.query(queryAll, function (err, results) {
            if (err) throw err;
            cb(results);
        });
    },

    // Query to insert a new sushi into the database, it receives the name of the sushi from the model.
    insertOne: function (cols, values, cb) {
        const insertQuery = `INSERT INTO sushi (${cols.toString()}) VALUES (${questionMarks(values.length)})`;
        connection.query(insertQuery, values, function (err, result) {
            if (err) throw err;
            cb(result)
        });
    },

    // Function to update
    updateOne: function (updateSushiObj, id, cb) {
        const updateQuery = `UPDATE sushi SET ${colToEqual(updateSushiObj)} WHERE ${id}`;
        connection.query(updateQuery, function (err, result) {
            if (err) throw err;
            cb(result)
        });
    },

    // Function to delete a sushi type from the menu.
    deleteOne: function (id, cb) {
        const deleteQuery = `DELETE FROM sushi WHERE ${id}`;
        connection.query(deleteQuery, function (err, result) {
            if (err) throw err;
            cb(result)
        });
    }
};

function questionMarks(num) {
    let marks = [];

    for (let k = 0; k < num; k++) {
        marks.push('?')
    }
}

function colToEqual(obj) {
    let equals = [];

    for (let key in obj) {
        let value = obj[key];
        if (Object.hasOwnProperty.call(obj, key)) {
            if (typeof value === 'string' && value.indexOf(" ") >= 0) {
                value = `'${value}'`
            }
            equals.push(`${key}=${value}`)
        }
    }
    return equals.toString()
}

// Export the orm object for the model. (sushi.js)
module.exports = orm;