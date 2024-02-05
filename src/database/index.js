const sequelize = require("sequelize");

/* USERS PANEL */
const UsersPanel = require("../app/models/UsersPanel")

/* BALANCE */
const Balance = require("../app/models/Balance")

/* INVESTMENTS */
const Investments = require("../app/models/Investments")


/*  CONNECTION DATABASE  */
const connectionDatabase = require("../config/database");

const models = [
  UsersPanel,
  Balance,
  Investments
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new sequelize(connectionDatabase);
    models.map((model) => model.init(this.connection));
  }
}

module.exports = new Database();
