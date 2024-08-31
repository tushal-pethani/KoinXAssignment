import axios from "axios";
import Price from "../models/Price.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const fetchAndStorePrice = asyncHandler(async (req, res) => {
  const url =
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr";

  try {
    const response = await axios.get(url);
    const ethPrice = response.data.ethereum.inr;

    const price = new Price({ currency: "INR", price: ethPrice });
    await price.save();

    if (res) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            price,
            "Ethereum price fetched and stored successfully"
          )
        );
    } else {
      console.log("Ethereum price fetched and stored successfully");
    }
  } catch (error) {
    if (res) {
      throw new ApiError(500, "Error while fetching Ethereum price");
    } else {
      console.error("Error while fetching Ethereum price", error);
    }
  }
});
