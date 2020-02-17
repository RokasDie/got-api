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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var battle_1 = __importDefault(require("./battle"));
function battleStatistics() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, battle_1.default.aggregate([
                        {
                            $facet: {
                                // Get the most repeated attacker king
                                attackerKing: [
                                    {
                                        $sortByCount: "$attacker_king"
                                    },
                                    {
                                        $sort: {
                                            count: -1
                                        }
                                    },
                                    {
                                        $limit: 1
                                    },
                                    { $project: { attackerKing: "$_id" } }
                                ],
                                // Get the king which participated most defensive battles
                                defenderKing: [
                                    {
                                        $sortByCount: "$defender_king"
                                    },
                                    {
                                        $sort: {
                                            count: -1
                                        }
                                    },
                                    {
                                        $limit: 1
                                    },
                                    { $project: { defenderKing: "$_id" } }
                                ],
                                // Get the region which had the most battles
                                region: [
                                    {
                                        $group: {
                                            _id: "$region",
                                            count: { $sum: 1 }
                                        }
                                    },
                                    {
                                        $sort: {
                                            count: -1
                                        }
                                    },
                                    {
                                        $limit: 1
                                    },
                                    { $project: { region: "$_id" } }
                                ],
                                // Get the number of won soldiers in battles which were won
                                win: [
                                    {
                                        $match: { attacker_outcome: "win" }
                                    },
                                    {
                                        $group: {
                                            _id: null,
                                            attacker_outcome_win: { $sum: "$attacker_size" }
                                        }
                                    }
                                ],
                                // Get the numbers of lost soldiers in batttles which were lost
                                loss: [
                                    { $match: { attacker_outcome: "loss" } },
                                    {
                                        $group: {
                                            _id: null,
                                            attacker_outcome_loss: { $sum: "$attacker_size" }
                                        }
                                    }
                                ],
                                //   Get unique battle types
                                battleTypes: [
                                    { $match: { battle_type: { $nin: [null, ""] } } },
                                    { $group: { _id: "$battle_type" } },
                                    { $project: { name: "$_id" } }
                                ],
                                // Get statistics for defenders
                                defenderSize: [
                                    { $match: { defender_size: { $type: "int" } } },
                                    {
                                        $group: {
                                            _id: null,
                                            average: { $avg: "$defender_size" },
                                            minimum: { $min: "$defender_size" },
                                            maximum: { $max: "$defender_size" }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            //   Put everything to one object
                            $replaceWith: {
                                $mergeObjects: [
                                    {
                                        $arrayElemAt: ["$attackerKing", 0]
                                    },
                                    {
                                        $arrayElemAt: ["$defenderKing", 0]
                                    },
                                    {
                                        $arrayElemAt: ["$region", 0]
                                    },
                                    {
                                        $arrayElemAt: ["$win", 0]
                                    },
                                    {
                                        $arrayElemAt: ["$loss", 0]
                                    },
                                    {
                                        battleTypes: "$battleTypes"
                                    },
                                    { $arrayElemAt: ["$defenderSize", 0] }
                                ]
                            }
                        }
                    ])];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.battleStatistics = battleStatistics;
