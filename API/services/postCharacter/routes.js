const express = require("express");
const router = express.Router();

const elastic = require("elasticsearch");

const bodyParser = require("body-parser").json();

const elasticClient = elastic.Client({
  host: "http://elasticsearch:9200",
});

router.use((req, res, next) => {
  elasticClient
    .index({
      index: "logs",
      body: {
        url: req.url,
        method: req.method,
      },
    })
    .then((res) => {
      console.log("Logs indexed");
    })
    .catch((err) => {
      console.log(err);
    });
  next();
});

router.post("/character", bodyParser, async (req, res) => {
  console.log("REQ.BODY: ", req.body);
  for (const character of req.body) {
    await elasticClient.index({
      index: "game-of-thrones",

      body: character,
    });
  }

  await elasticClient.indices.refresh({ index: "game-of-thrones" });

  const body = await elasticClient.search({
    index: "game-of-thrones",

    body: {
      query: {
        match_all: {},
      },
    },
  });

  res.send(body);
});

module.exports = router;
