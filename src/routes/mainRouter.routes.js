import { Router } from "express";
import { getTransactions } from "../controllers/userTransactions.controllers.js";
import { getUserExpenses } from "../controllers/getUserExpenses.controllers.js";
const router = Router();

router.get("/transactions/:address", getTransactions);
router.get("/expenses/:address", getUserExpenses);

export default router;
