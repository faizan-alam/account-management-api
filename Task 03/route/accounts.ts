import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Account } from "../types/account";
import { readAccountsData, writeAccountsData } from "../services/account";

const router = express.Router();

// Create a new account
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("phone").notEmpty().withMessage("Phone is required"),
    body("email").isEmail().withMessage("Invalid email"),
  ],
  (req: Request<any, any, Account>, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const account = req.body;

    // Read existing accounts data
    const accountsData = readAccountsData();

    // Generate a unique ID for the new account
    const newAccountId = Date.now().toString();

    // Assign the ID to the account
    account.id = newAccountId;

    // Add the new account to the data
    accountsData.push(account);

    // Write the updated data to the file
    writeAccountsData(accountsData);

    res
      .status(201)
      .json({ message: "Account created successfully", id: newAccountId });
  }
);

// Update an existing account
router.put(
  "/:id",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("phone").notEmpty().withMessage("Phone is required"),
    body("email").isEmail().withMessage("Invalid email"),
  ],
  (req: Request<{ id: string }, any, Account>, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const accountId = req.params.id;
    const updatedAccount = req.body;

    // Read existing accounts data
    const accountsData = readAccountsData();

    // Find the account to be updated
    const accountIndex = accountsData.findIndex(
      (account) => account.id === accountId
    );

    if (accountIndex !== -1) {
      // Update the account
      accountsData[accountIndex] = { ...updatedAccount, id: accountId };

      // Write the updated data to the file
      writeAccountsData(accountsData);

      res.json({ message: "Account updated successfully" });
    } else {
      res.status(404).json({ error: "Account not found" });
    }
  }
);

// Delete an account
router.delete(
  "/:id",
  (req: Request<{ id: string }>, res: Response) => {
    const accountId = req.params.id;

    // Read existing accounts data
    const accountsData = readAccountsData();

    // Find the account to be deleted
    const accountIndex = accountsData.findIndex(
      (account) => account.id === accountId
    );

    if (accountIndex !== -1) {
      // Remove the account from the data
      accountsData.splice(accountIndex, 1);

      // Write the updated data to the file
      writeAccountsData(accountsData);

      res.json({ message: "Account deleted successfully" });
    } else {
      res.status(404).json({ error: "Account not found" });
    }
  }
);

// Get account information
router.get("/:id", (req: Request<{ id: string }>, res: Response) => {
  const accountId = req.params.id;

  // Read existing accounts data
  const accountsData = readAccountsData();

  // Find the account
  const account = accountsData.find((account) => account.id === accountId);

  if (account) {
    res.json(account);
  } else {
    res.status(404).json({ error: "Account not found" });
  }
});

export default router;
