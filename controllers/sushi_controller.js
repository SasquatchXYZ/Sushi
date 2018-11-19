// Import Express to configure the routes.
const express = require('express');
const router = express.Router();

//Import the Model (sushi.js) to use its functions.
const sushi = require('../models/sushi');

// ---------------------------------------------------------------------------------------------------------------------
// Routes

// Get route to render all of the sushi from the database into the index.handlebars on page load.
router.get('/', function (req, res) {
    sushi.selectAll(function (data) {
        const hbsObject = {
            sushi: data
        };
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

// POST route to add a new sushi to the database and page.
router.post('/api/sushi', function (req, res) {
    console.log(req.body);
    /*sushi.insertOne([],[], function(result) {
        res.json({id: result.insertId});
    });*/
});

// PUT route to update the status from not eaten to eaten and vice versa.
router.put('/api/sushi/:id', function (req, res) {
    const id = `id = ${req.params.id}`;
    console.log(id);
    console.log(req.body);

    sushi.updateOne({mindfully_eaten: req.body.mindfully_eaten}, id, function (result) {
        if (result.changedRows === 0) {
            return res.status(404).end()
        } else {
            res.status(200).end()
        }
    });
});

// DELETE route to remove a sushi from the database.
router.delete('/api/sushi/:id', function (req, res) {
    console.log(req.params.id);

    sushi.deleteOne(req.params.id, function (result) {
        if (result.affectedRows === 0) {
            return res.status(404).end()
        } else {
            res.status(200).end()
        }
    });
});


// Export routes for server.js to use.
module.exports = router;