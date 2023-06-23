"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 5101;
app.get("/", (_, res) => {
    res.status(200).send();
});
const cors = require("cors");
app.use(cors());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
const api = require("./api").default;
app.use(api);
app.listen(port, () => console.log(`Running on port ${port}`));
//# sourceMappingURL=index.js.map