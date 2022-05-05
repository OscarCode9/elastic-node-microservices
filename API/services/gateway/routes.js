const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser").json();

router.get("/character", bodyParser, async (req, res) => {
  console.log("I AM HERE");
  const requestOptions = {
    method: "GET",
  };

  try {
    const results = await fetch(
      "http://get-character:3001/api/v1/character",
      requestOptions
    );
    console.log(results);
    const data = await results.json();

    res.send(data);
  } catch (error) {
    console.log("error", error);
    res.send(error);
  }
});

router.post("/character", bodyParser, async (req, res) => {
  const raw = JSON.stringify(req.body);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: raw,
  };

  try {
    const result = await fetch(
      "http://post-character:3000/api/v1/character",
      requestOptions
    );
    const data = await result.json();

    res.send(data);
  } catch (error) {
    console.log("error", error);
    res.send(error);
  }
});

module.exports = router;
