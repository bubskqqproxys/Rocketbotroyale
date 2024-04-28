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
  https.get(url, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      res.writeHead(resp.statusCode, resp.headers);
      res.write(data);
      res.end();
    });
  }).on('error', (err) => {
    console.error('Error:', err);
    res.status(500).send('Something went wrong!');
  });
}

app.listen(3000, () => {
  console.log('Proxy server is running on port 3000');
});
