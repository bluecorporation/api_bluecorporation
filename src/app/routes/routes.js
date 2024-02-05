const { Router } = require("express");
const routes = Router();

const SessionRoutes = require("./Session.routes")
const panelRoutes = require("./Panel.routes")
const balanceRoutes = require("./Balance.routes")
const investmentRoutes = require("./Investments.routes")


routes.use("/panel", panelRoutes);
routes.use("/balance", balanceRoutes);
routes.use("/session", SessionRoutes);
routes.use("/investment", investmentRoutes);

module.exports = routes
