"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor(status, statusCode, message = null) {
        this.status = status;
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=api.response.class.js.map