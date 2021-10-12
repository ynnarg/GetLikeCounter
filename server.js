
// Express

const express = require("express");
const app = express();
app.use(express.json());

// Express Listeners

app.get("/", (req, res) => {
    let body = req.body;
    
});
