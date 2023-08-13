const express = require("express");
const controller = require("../Controller/Controller");
const router = express.Router();

// Cards Routes
router.route("/add-card").post(controller.addCard);
router.route("/cards-by-column/:name").get(controller.getCardsByColumn);
router.route("/move-card/:id").patch(controller.moveCardsBetweenColumns);

// Column Routes
router.route("/column").get(controller.getAllColumns);
router.route("/add-column").post(controller.addColumn);

module.exports = router;