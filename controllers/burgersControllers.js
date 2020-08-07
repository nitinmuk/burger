const express = require("express");
const burger = require("../models/burger.js");

const router = express.Router();

router.get("/", (request, response) => {
    response.status(200).json();
});


module.exports = router;
