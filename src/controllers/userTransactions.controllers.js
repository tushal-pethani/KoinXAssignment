import axios from "axios";
import Transaction from "../models/Transaction.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getTransactions = asyncHandler(async (req, res) => {
  const { address } = req.params;
  const apiKey = process.env.ETHERSCAN_API_KEY;
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
  if (!address) {
    throw new ApiError(400, "Address is required");
  }
  try {
    const response = await axios.get(url);
    if (!response) {
      throw new ApiError(400, "No transactions for this user address");
    }
    const transactions = response.data.result;
    const existingTransactions = await Transaction.find({
      hash: { $in: transactions.map((tx) => tx.hash) },
    });
    const existingHashes = existingTransactions.map((tx) => tx.hash);
    const newTransactions = transactions.filter(
      (tx) => !existingHashes.includes(tx.hash)
    );

    if (newTransactions.length > 0) {
      await Transaction.insertMany(newTransactions);
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          transactions,
          "All the transactions of the given user fetched successfully"
        )
      );
  } catch (error) {
    throw new ApiError(500, "Error while fetching transactions");
  }
});
