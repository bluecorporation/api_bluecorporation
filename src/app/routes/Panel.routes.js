const { Router } = require("express");
const routes = Router();

const ControllerPanel = require("../controllers/ControllerPanel");

routes.post("/storage", ControllerPanel.storage);

module.exports = routes;
