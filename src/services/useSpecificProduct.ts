import useSWR from "swr";
import { axiosInstance } from "@/utils/axiosInstance";

export function useSpecificProduct(code: string) {
  const fetcher = async (url: string) => {
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw new Error("An error occurred while fetching the data.");
    }
  };

  return useSWR(`/api/v2/product/fetch/all?code=${code}&limit=40`, fetcher);
}
