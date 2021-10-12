
// Axios

const axios = require("axios");

// Express

console.log("doe");
const express = require("express");
console.log("tihs");
const app = express();
app.use(express.json());

// Variables

let voteURL = "https://games.roblox.com/v1/games/votes?universeIds=";
let placeIdToUniverseURL = "https://api.roblox.com/universes/get-universe-containing-place?placeid=";
let idCache = new Map();

// Express Listeners

app.get("/:id", (req, res) => {
    let id = req.params.id;
    
    if (!idCache.get(id.toString())) {
      axios({
        method: "get",
        url: placeIdToUniverseURL + req.params.id
      }).then((response) => {
        let data = response.data.UniverseId;
        idCache.set(id.toString(), data);
        
        axios({
          method: "get",
          url: voteURL + data
        }).then((response) => {
          res.send(response.data.data[0]);
        });
      });
    } else {
        axios({
          method: "get",
          url: voteURL + idCache.get(id.toString())
        }).then((response) => {
          res.send(response.data.data[0]);
        });
    }
  
  return "OK!"
});

app.listen(process.env.PORT, () => {
  console.log("yep");
});
