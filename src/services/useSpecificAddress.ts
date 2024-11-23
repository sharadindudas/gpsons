import useSWR from "swr";
import { axiosInstance } from "@/utils/axiosInstance";

export function useSpecificAddress(token: string, id: string) {
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

  return useSWR(`/api/v2/user/address/fetch?addressid=${id}`, fetcher);
}
