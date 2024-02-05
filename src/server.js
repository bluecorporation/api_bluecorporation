require("dotenv").config();

const app = require("./app");

app.listen(5555,() => {
    console.log("Server listen in port 4444")
})
