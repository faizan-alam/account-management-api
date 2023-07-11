import express from "express";
import bodyParser from "body-parser";
import accounts from "./route/accounts";

const app = express();

app.use(bodyParser.json());

app.use("/accounts", accounts);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
