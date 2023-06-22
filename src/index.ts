import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 5101;

app.get("/", (_, res) => {
  res.status(200).send();
});

const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const api = require("./api").default;
app.use(api);

app.listen(port, () => console.log(`Running on port ${port}`));
