"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatSessions_1 = __importDefault(require("./chatSessions"));
const router = express_1.default.Router();
router.get("/health-check", (req, res) => {
    res.status(200).send("Health check passed");
});
router.use(chatSessions_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map