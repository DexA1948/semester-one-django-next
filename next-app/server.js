const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

const httpsOptions = {
	key: fs.readFileSync("./certificates/localhost-key.pem"),
	cert: fs.readFileSync("./certificates/localhost.pem"),
};

app.prepare().then(() => {
	try {
		createServer(httpsOptions, (req, res) => {
			const parsedUrl = parse(req.url, true);
			handle(req, res, parsedUrl);
		}).listen(port, (err) => {
			if (err) throw err;
		});
	} catch (e) {
		console.log("error in running server", e);
	}
});
