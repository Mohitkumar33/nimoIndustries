import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.coingecko.com/api/v3", // or free API: https://api.coingecko.com/api/v3
  headers: {
    accept: "application/json",
  },
});

// Add the demo API key globally
axiosInstance.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    x_cg_demo_api_key: "CG-MnjkGcNRr1XjAsTijss9zhWg",
  };
  return config;
});


export default axiosInstance;
