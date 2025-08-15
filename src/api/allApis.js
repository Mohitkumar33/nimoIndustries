// src/api/allApis.js
import axiosInstance from "./axiosInstance";

export const getMarketData = async () => {
  try {
    const response = await axiosInstance.get("/coins/markets", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
        sparkline: true,
        price_change_percentage: "1h,24h,7d",
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching market data:", err);
    throw err;
  }
};

export const getSingleCoinData = async (id) => {
  try {
    const response = await axiosInstance.get(`/coins/${id}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: true,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Failed to fetch coin details", err);
    throw err;
  }
};
