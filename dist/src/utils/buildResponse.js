"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buildResponse = (statusCode, body) => {
    return {
        statusCode,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };
};
exports.default = buildResponse;
