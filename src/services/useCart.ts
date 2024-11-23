import useSWR from "swr";
import { axiosInstance } from "@/utils/axiosInstance";

export function useCart(token: string) {
  const fetcher = async (url: string) => {
    try {
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("An error occurred while fetching the data.");
    }
  };

  return useSWR(token ? `/api/v2/user/cart/fetch` : null, fetcher);
}
