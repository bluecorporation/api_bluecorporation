require("dotenv").config();

const app = require("./app");

app.listen(8888,() => {
    console.log("Server listen in port 8888")
})
