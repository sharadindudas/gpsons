"use client";

import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ApiResponse, ICart } from "@/types/types";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import { useCart } from "@/services/useCart";
import EmptyCartPage from "./EmptyCart";
import { useMemo } from "react";
import { AuthProvider } from "@/providers/AuthProvider";
import Link from "next/link";

const CartSection = () => {
  const router = useRouter();
  const { token } = AuthProvider();

  const { data, error, isLoading, mutate } = useCart(token);
  const cartItems: ICart[] = useMemo(() => data?.data ?? [], [data?.data]);

  const totalAmount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.total, 0),
    [cartItems]
  );
  const totalQuantity = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const handleDeleteCartItem = async (productid: string) => {
    try {
      await axiosInstance.delete<ApiResponse>(`/api/v2/user/cart/remove`, {
        params: { productid },
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Deleted the Cart Item Successfully");
      mutate();
    } catch (err) {
      toast.error("Failed to delete cart item. Please try again.");
    }
  };

  const handleUpdateQuantity = async (
    productid: string,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;

    try {
      const availableStock = cartItems.find(
        (item) => item.productid === productid
      )?.inStock as number;

      if (newQuantity > availableStock) {
        toast.error(
          `Sorry, only ${availableStock} items are available in stock.`
        );
        return;
      }

      await axiosInstance.post<ApiResponse>(
        `/api/v2/user/cart/add`,
        { productid, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      mutate();
    } catch (err) {
      toast.error("Failed to update quantity. Please try again.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <EmptyCartPage />;
  if (cartItems.length === 0) return <EmptyCartPage />;

  return (
    <>
      <h2 className="text-2xl font-bold">My Cart Items ({totalQuantity})</h2>

      <div className="py-5 overflow-y-scroll h-[400px] scrollbar-hide flex flex-col items-center gap-5">
        {cartItems.map((item) => (
          <div
            key={item.productid}
            className="rounded-lg border border-black/30 flex items-center gap-10 w-[720px] h-[82px] capitalize"
          >
            <Link href={`/product/${item.code}`} className="block h-20 w-14">
              <Image
                src={item.images[0]}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-full rounded-lg object-cover"
                alt="product-img"
              />
            </Link>
            <div className="flex flex-col gap-1 items-start">
              <h3 className="font-medium">{item.title}</h3>
              <div className="flex justify-center items-center gap-x-5">
                <div className="flex items-center space-x-5">
                  <div className="flex items-center gap-x-1">
                    <p className="text-color-3/70 font-semibold">
                      ₹ {item.price}
                    </p>
                    <div className="text-black/60 text-sm w-7">
                      x {item.quantity}
                    </div>
                  </div>
                  <div>
                    Size:{" "}
                    <span className="text-black/70 font-thin">{item.size}</span>
                  </div>
                  <div className="w-24">
                    Color:{" "}
                    <span className="text-black/70 font-thin">
                      {item.color}
                    </span>
                  </div>
                  <div>
                    Code:{" "}
                    <span className="text-black/70 font-thin">{item.code}</span>
                  </div>
                </div>
                <div className="flex items-center h-8 w-24">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.productid, item.quantity - 1)
                    }
                    className="border border-r-0 border-color-3/50 text-base cursor-pointer text-color-3/50 flex items-center justify-center rounded-lg rounded-r-none bg-transparent p-0 hover:bg-transparent w-full h-full"
                  >
                    <Minus />
                  </button>
                  <div className="text-base border border-color-3/50 border-l-0 border-r-0 flex items-center justify-center pointer-events-none w-full h-full">
                    {item.quantity}
                  </div>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.productid, item.quantity + 1)
                    }
                    className="border border-l-0 border-color-3/50 text-base cursor-pointer text-color-3/50 flex items-center justify-center rounded-lg rounded-l-none bg-transparent p-0 hover:bg-transparent w-full h-full"
                  >
                    <Plus />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={() => handleDeleteCartItem(item.productid)}
                className="w-8 h-8 bg-[#D9D9D9] rounded-full flex items-center justify-center"
              >
                <Image
                  src="/assets/trash.png"
                  width={20}
                  height={38}
                  className="w-auto h-auto"
                  alt="trash"
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full h-0.5 bg-black/15 mt-8 mb-7"></div>

      <div className="px-10">
        <Card className="w-full">
          <CardHeader className="pt-6 pb-4">
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="capitalize flex items-center justify-between">
              <div className="space-y-3">
                <p>
                  Total Amount{" "}
                  <span className="text-black/40">(tax incl.)</span>
                </p>
                <div className="font-medium">₹ {totalAmount.toFixed(2)}</div>
              </div>
              <div className="space-y-3 text-black/60 font-medium">
                <span>₹ {totalAmount.toFixed(2)}</span>
                <div>(Incl. Of All Taxes)</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center items-center">
            <Button
              className="w-full font-semibold capitalize"
              variant="authBtn"
              onClick={() => router.push("/checkout")}
            >
              Move to Checkout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default CartSection;
