const { Router } = require("express");
const routes = Router();

const ContollerSession = require("../controllers/ContollerSession");

routes.post("/storage/panel", ContollerSession.storagePanel);


module.exports = routes;
