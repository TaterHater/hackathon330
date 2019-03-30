"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseError {
    constructor() {
        this.createError = (messages, errorNumber) => {
            if (messages.length > 0 && messages != undefined) {
                let res = `{
            "ErrorMessage": ${messages},
            "ErrorNumber": ${errorNumber ? errorNumber : 0}
                }`;
                return JSON.stringify(res);
            }
            return JSON.stringify(`{
        "ErrorMessage": [],
        "ErrorNumber": 0
            }`);
        };
    }
    ResponseError() { }
}
exports.ResponseError = ResponseError;
module.exports = ResponseError;
