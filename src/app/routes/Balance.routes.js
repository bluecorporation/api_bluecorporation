const { Router } = require("express");
const routes = Router();

const ControllerBalance = require("../controllers/ControllerBalance");

routes.post("/get", (req, res) => ControllerBalance.get(req, res));

module.exports = routes;
