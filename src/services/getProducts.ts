import { BASE_URL } from "@/utils/constants";

export const getProducts = async (limit: number) => {
  const res = await fetch(
    `${BASE_URL}/api/v2/product/fetch/all?limit=${limit}&type=unique`,
    {
      next: { revalidate: 5000 },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch the products");
  const json = await res.json();
  return json?.data[0]?.products;
};
