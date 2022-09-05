"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const verifyMailgunEvent = (data) => {
    try {
        const { signingKey, timestamp, token, signature } = data;
        const encodedToken = crypto_1.default.createHmac('sha256', signingKey).update(timestamp.concat(token)).digest('hex');
        return encodedToken === signature;
    }
    catch (error) {
        return false;
    }
};
exports.default = verifyMailgunEvent;
