const http = require("http");
const { parseCode } = require("./parse");

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
      "Access-Control-Max-Age": 2592000,
      "Content-Type": "application/json"
    });

    req.setEncoding("utf8");

    let str = "";

    req.on("data", function (chunk) {
      str += chunk;
    });

    req.on("end", function () {
      try {
        res.write(JSON.stringify(parseCode(str)));
      } catch {
        res.write("[]");
      }

      res.end();
    });
  })
  .listen(8080);
