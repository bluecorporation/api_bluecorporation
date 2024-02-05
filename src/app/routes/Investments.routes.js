const { Router } = require("express");
const routes = Router();

const ControllerInvestment = require("../controllers/ControllerInvestment");

routes.post("/storage", ControllerInvestment.storage);

module.exports = routes;
