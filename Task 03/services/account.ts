import fs from "fs";
import path from "path";
import { Account } from "../types/account";

const dataFilePath = path.join(__dirname, "../", "data/accounts.json");

// Read accounts data from the JSON file
export function readAccountsData(): Account[] {
  try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Write accounts data to the JSON file
export function writeAccountsData(data: Account[]): void {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
}
