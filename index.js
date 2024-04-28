const express = require("express");
const https = require("https");
const app = express();

app.get("/chess/*", (req, res, next) => {
  const pathSegments = req.path.split('/');
  const discordPath = pathSegments[2];
  const url = "https://chess.com/" + discordPath;
  forwardRequest(url, req, res);
});

app.get("/*", (req, res, next) => {
  const url = "https://rocketbotroyale.winterpixel.io/" + req.path;
  forwardRequest(url, req, res);
});

function forwardRequest(url, req, res) {
  https.request(new URL(url), (resp) => {
    res.contentType(resp.headers["content-type"]);
    resp.pipe(res);
  }).end();
}

app.listen(3000);
