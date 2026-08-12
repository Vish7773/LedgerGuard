import express from "express";
import { sendResponse } from "../utils/response.js";
import organizationRoutes from "./organizationRoutes.js";

const router = express.Router();

router.get("/", (req, res) => {
  sendResponse(
    res,
    200,
    true,
    "LedgerGuard API v1 is running 🚀"
  );
});

router.use("/organizations", organizationRoutes);

export default router;