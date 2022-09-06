"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const main_1 = __importDefault(require("./src/main"));
const handler = (event) => (0, main_1.default)(event);
exports.handler = handler;
