import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler.js";
import Transaction from "../models/Transaction.models.js"; // Assuming you have a Transaction model
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getUserExpenses = asyncHandler(async (req, res) => {
  const { address } = req.params;

  if (!address) {
    throw new ApiError(400, "Address is required");
  }

  // Fetch user's transactions from the database
  const transactions = await Transaction.find({ from: address });

  if (!transactions || transactions.length === 0) {
    throw new ApiError(404, "No transactions found for this address");
  }

  // Calculate the total expenses
  let totalExpenses = 0;
  transactions.forEach((tx) => {
    totalExpenses += (tx.gasUsed * tx.gasPrice) / 1e18;
  });

  // Fetch the current price of Ether
  const url =
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr";
  const response = await axios.get(url);
  const ethPrice = response.data.ethereum.inr;

  // Send the response
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { totalExpenses, ethPrice },
        "User expenses and current Ether price fetched successfully"
      )
    );
});
