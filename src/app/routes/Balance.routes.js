const { Router } = require("express");
const routes = Router();

const ControllerBalance = require("../controllers/ControllerBalance");

routes.post("/storage", ControllerBalance.storageDeposit);

module.exports = routes;
