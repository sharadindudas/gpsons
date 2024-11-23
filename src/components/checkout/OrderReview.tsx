import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCart } from "@/services/useCart";
import { ICart } from "@/types/types";
import Image from "next/image";
import { useMemo } from "react";
import TermsAndConditionsForm from "./TermsAndConditionsForm";
import { AuthProvider } from "@/providers/AuthProvider";
import { CheckoutProvider } from "@/providers/CheckoutProvider";

const OrderReviewSection = () => {
  const { token } = AuthProvider();
  const { deliveryCharges } = CheckoutProvider();

  const { data, error, isLoading } = useCart(token);
  const cartItems: ICart[] = useMemo(() => data?.data ?? [], [data?.data]);
  const totalAmount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.total, 0),
    [cartItems]
  );
  const totalAmountWithDeliveryCharges = useMemo(
    () => totalAmount + deliveryCharges,
    [deliveryCharges, totalAmount]
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load the Cart Items</div>;

  return (
    <>
      <h2 className="text-black/70 text-xl font-bold capitalize">
        3. Order Review
      </h2>
      <div className="overflow-y-scroll h-[420px] pr-1 mt-5">
        <Table className="text-sm">
          <TableHeader className="h-11 border border-black/40 rounded w-full text-base">
            <TableRow className="text-black/60">
              <TableHead>Product</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Net Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems?.map((item) => (
              <TableRow key={item.productid}>
                <TableCell className="w-[200px]">
                  <div className="flex gap-3">
                    <div className="relative w-11">
                      <Image
                        src={item.images[0]}
                        width={244}
                        height={365}
                        alt="product-img"
                      />
                    </div>
                    <div className="capitalize font-semibold">
                      <div>
                        <span className="text-color-3/50">Name:</span>{" "}
                        <span className="text-black/60">{item.code}</span>
                      </div>
                      <div>
                        <span className="text-color-3/50">Color:</span>{" "}
                        <span className="text-black/60">{item.color}</span>
                      </div>
                      <div className="font-semibold">
                        <span className="text-color-3/50">Size:</span>{" "}
                        <span className="text-black/60">{item.size}</span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="text-color-3 font-semibold">
                    ₹{item.price.toFixed(2)}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="bg-color-3/15 text-black/60 w-14 h-6 flex items-center justify-center font-semibold rounded-lg mx-auto">
                    {item.quantity} Pcs
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="text-color-3 font-semibold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="capitalize pt-14">
        <div className="flex justify-between items-center">
          <p className="text-black/70 font-medium">
            Total amount <span className="text-black/40">(including tax)</span>
          </p>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center my-1">
          <div className="flex items-center gap-5">
            <p className="text-black/70 font-medium">Delivery Charges</p>
          </div>
          <span>
            ₹{deliveryCharges ? deliveryCharges.toFixed(2) : (0).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-color-3/60 text-lg font-semibold">SubTotal</p>
          <span>₹{totalAmountWithDeliveryCharges.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mt-5">
          <em className="text-red-500 font-medium text-base italic">
            * We Only Receive Online Payment
          </em>
          <TermsAndConditionsForm />
        </div>
      </div>
    </>
  );
};

export default OrderReviewSection;
