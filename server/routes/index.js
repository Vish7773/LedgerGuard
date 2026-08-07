import express from "express";
import { sendResponse } from "../utils/response.js";

const router = express.Router();

router.get("/", (req, res) => {
  sendResponse(res, 200, true, "LedgerGuard API v1 is running 🚀");
});

export default router;