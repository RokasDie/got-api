"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var count_1 = __importDefault(require("./count"));
var list_1 = __importDefault(require("./list"));
var stats_1 = __importDefault(require("./stats"));
var search_1 = __importDefault(require("./search"));
exports.default = (function () {
    var app = express_1.Router();
    count_1.default(app);
    list_1.default(app);
    stats_1.default(app);
    search_1.default(app);
    return app;
});
