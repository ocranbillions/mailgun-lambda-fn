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
exports.handler = void 0;
const crypto_1 = __importDefault(require("crypto"));
const verifyMailgunEvent_1 = __importDefault(require("./utils/verifyMailgunEvent"));
const buildResponse_1 = __importDefault(require("./utils/buildResponse"));
const storage_1 = __importDefault(require("./storage"));
const Message_1 = __importDefault(require("./Message"));
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventBody = JSON.parse(event.body || '{}');
        const isValidMailgunEvent = (0, verifyMailgunEvent_1.default)(Object.assign({ signingKey: 'f07b238c23b6b6a47b58b665645677d1-07e2c238-a948e115' }, eventBody.signature));
        if (!isValidMailgunEvent) {
            return (0, buildResponse_1.default)(400, 'INVALID EVENT: Not from MailGun');
        }
        yield (0, storage_1.default)(Object.assign({ id: crypto_1.default.randomBytes(20).toString('hex') }, eventBody));
        const message = new Message_1.default({
            Provider: 'Mailgun',
            timestamp: eventBody.signature.timestamp,
            type: eventBody['event-data'].event,
        });
        yield message.publish();
        return (0, buildResponse_1.default)(200, 'Event processed successfully!');
    }
    catch (error) {
        return (0, buildResponse_1.default)(500, error.message);
    }
});
exports.handler = handler;
