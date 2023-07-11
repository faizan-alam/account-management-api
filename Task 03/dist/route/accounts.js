"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const account_1 = require("../services/account");
const router = express_1.default.Router();
// Create a new account
router.post("/", [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("address").notEmpty().withMessage("Address is required"),
    (0, express_validator_1.body)("phone").notEmpty().withMessage("Phone is required"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email"),
], (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const account = req.body;
    // Read existing accounts data
    const accountsData = (0, account_1.readAccountsData)();
    // Generate a unique ID for the new account
    const newAccountId = Date.now().toString();
    // Assign the ID to the account
    account.id = newAccountId;
    // Add the new account to the data
    accountsData.push(account);
    // Write the updated data to the file
    (0, account_1.writeAccountsData)(accountsData);
    res
        .status(201)
        .json({ message: "Account created successfully", id: newAccountId });
});
// Update an existing account
router.put("/:id", [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("address").notEmpty().withMessage("Address is required"),
    (0, express_validator_1.body)("phone").notEmpty().withMessage("Phone is required"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email"),
], (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const accountId = req.params.id;
    const updatedAccount = req.body;
    // Read existing accounts data
    const accountsData = (0, account_1.readAccountsData)();
    // Find the account to be updated
    const accountIndex = accountsData.findIndex((account) => account.id === accountId);
    if (accountIndex !== -1) {
        // Update the account
        accountsData[accountIndex] = Object.assign(Object.assign({}, updatedAccount), { id: accountId });
        // Write the updated data to the file
        (0, account_1.writeAccountsData)(accountsData);
        res.json({ message: "Account updated successfully" });
    }
    else {
        res.status(404).json({ error: "Account not found" });
    }
});
// Delete an account
router.delete("/:id", (req, res) => {
    const accountId = req.params.id;
    // Read existing accounts data
    const accountsData = (0, account_1.readAccountsData)();
    // Find the account to be deleted
    const accountIndex = accountsData.findIndex((account) => account.id === accountId);
    if (accountIndex !== -1) {
        // Remove the account from the data
        accountsData.splice(accountIndex, 1);
        // Write the updated data to the file
        (0, account_1.writeAccountsData)(accountsData);
        res.json({ message: "Account deleted successfully" });
    }
    else {
        res.status(404).json({ error: "Account not found" });
    }
});
// Get account information
router.get("/:id", (req, res) => {
    const accountId = req.params.id;
    // Read existing accounts data
    const accountsData = (0, account_1.readAccountsData)();
    // Find the account
    const account = accountsData.find((account) => account.id === accountId);
    if (account) {
        res.json(account);
    }
    else {
        res.status(404).json({ error: "Account not found" });
    }
});
exports.default = router;
