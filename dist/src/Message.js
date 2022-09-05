"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const publisher_1 = __importDefault(require("./publisher"));
class Message {
    constructor(body) {
        this.body = body;
        this.body = body;
    }
    publish() {
        return (0, publisher_1.default)(this.body);
    }
}
exports.default = Message;
