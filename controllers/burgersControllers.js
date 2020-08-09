const express = require("express");
const burger = require("../models/burger.js");

const router = express.Router();

/**
 * provides a route to get all burger records.
 * it returns an html generated using handlebars.
 */
router.get("/", (request, response) => {
    burger
        .all()
        .then(data => {
            const hbsObject = {
                burgers: data
            };
            response.render("index", hbsObject);
        })
        .catch(error => {
            console.log(error);
            response.status(500).end();
        });
});

/**
 * it exposes a post request to create a new burger entry in database.
 * returns the id of new created burger in database.
 */
router.post("/burgers", (request, response) => {
    burger
        .create(request.body)
        .then(result => response.json({ id: result.insertId }))
        .catch(error => {
            console.log(error);
            response.status(500).end();
        });
});

/**
 * it exposes a put request to update entry for a specific existing burger in database.
 */
router.put("/burgers/:id", (request, response) => {
    burger
        .update({
            burger: request.body,
            where: {
                id: request.params.id
            }
        })
        .then(result => response.status(result.changedRows == 0 ? 404 : 204).end())
        .catch(error => {
            console.log(error);
            response.status(500).end();
        });

});


module.exports = router;
