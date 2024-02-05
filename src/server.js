require("dotenv").config();

const app = require("./app");

app.listen(3333,() => {
    console.log("Server listen in port 4444")
})
