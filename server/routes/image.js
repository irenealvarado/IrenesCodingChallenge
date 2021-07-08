var express = require("express");
var router = express.Router();
const axios = require("axios");
var logger = require("morgan");

/* POST requests handling */

router.post("/", async (req, res, next) => {
  console.log("make sure we are posting: ", req.body);
  const imageDescription = req.body.imageDescription;
  const imageURL = req.body.imageURL;

  //first check if no url or description is given, throw 400 error
  if (!imageDescription || !imageURL) {
    res.status(400).send("required image or comment missing");
  }

  //try catch to make handle post request
  try {
    return await axios.post("https://imagehasbeenverified.example.endpoint", {
      imageDescription: req.body.imageDescription,
      imageURL: req.body.imageURL,
    });
  } catch (error) {
    //generic "catch-all" error
    res.status(500);
    res.render("error", { error: err });
  }
});

module.exports = router;
