"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeAccountsData = exports.readAccountsData = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dataFilePath = path_1.default.join(__dirname, "../", "data/accounts.json");
// Read accounts data from the JSON file
function readAccountsData() {
    try {
        const data = fs_1.default.readFileSync(dataFilePath, "utf8");
        return JSON.parse(data);
    }
    catch (error) {
        return [];
    }
}
exports.readAccountsData = readAccountsData;
// Write accounts data to the JSON file
function writeAccountsData(data) {
    fs_1.default.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
}
exports.writeAccountsData = writeAccountsData;
