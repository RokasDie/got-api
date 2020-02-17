"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var http_errors_1 = __importDefault(require("http-errors"));
var routes_1 = __importDefault(require("../routes"));
exports.default = (function (_a) {
    var app = _a.app;
    app.use(body_parser_1.default.json());
    // Load API routes
    app.use(routes_1.default());
    /// catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(http_errors_1.default(404));
    });
    /// error handlers
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message
            }
        });
    });
});
