"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = __importDefault(require("./handlers/utils"));
const router = express_1.default.Router();
const userId = "1567";
router.get("/chatSessions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send([]);
}));
router.post("/chatSessions/session/get", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqdata = req.body;
    const { limit } = reqdata;
    res.status(200).send(utils_1.default.getSessions({ limit: parseInt(limit, 10) }));
}));
router.post("/chatSessions/chat_history/get", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqdata = req.body;
    const { session_id } = reqdata;
    res
        .status(200)
        .send(utils_1.default.getChatHistory({ session_id: parseInt(session_id, 10) }));
}));
router.post("/chatSessions/session/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqdata = req.body;
    const { temp, max_tokens, engine, title } = reqdata;
    res.status(200).send(utils_1.default.addSession({ temp, max_tokens, engine, title }));
}));
router.post("/chatSessions/session/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqdata = req.body;
    const { session_id, temp, max_tokens, engine, title } = reqdata;
    res.status(200).send(utils_1.default.updateSession({
        session_id: parseInt(session_id, 10),
        temp,
        max_tokens,
        engine,
        title,
    }));
}));
router.post("/chatSessions/vox/completion", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqdata = req.body;
    const { session_id, temperature, messages, max_tokens, engine } = reqdata;
    res.status(200).send(utils_1.default.voxCompletion({
        session_id: parseInt(session_id, 10),
        temperature,
        messages: JSON.parse(messages),
        max_tokens,
        engine,
    }));
}));
exports.default = router;
//# sourceMappingURL=chatSessions.js.map