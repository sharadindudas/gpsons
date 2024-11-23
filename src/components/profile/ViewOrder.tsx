import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IOrder } from "@/types/types";
import { axiosInstance } from "@/utils/axiosInstance";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface ViewOrderProps {
  token: string;
  orderid: string;
}

const ViewOrder = ({ token, orderid }: ViewOrderProps) => {
  const [order, setOrder] = useState<IOrder | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchSpecificOrder = async () => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.get(
        `/api/v2/checkout/order/fetch/specific?orderid=${orderid}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setOrder(response.data.data);
      }
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={fetchSpecificOrder}
          disabled={isSubmitting}
        >
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[60vh] overflow-y-auto font-poppins px-6 py-5">
        <DialogHeader>
          <DialogTitle>
            <DialogDescription className="text-2xl mb-5 font-bold">
              Order Details - {order?.orderid}
            </DialogDescription>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-10">
          <section>
            <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
            <div className="grid grid-cols-2 gap-2 text-base">
              <div>Order Total:</div>
              <div>₹{order?.order_total.toFixed(2)}</div>
              <div>Delivery Charge:</div>
              <div>₹{order?.delivery_charge.toFixed(2)}</div>
              <div>Created At:</div>
              <div>
                {new Date(order?.createdAt as string).toLocaleDateString()}
              </div>
              <div>Updated At:</div>
              <div>
                {new Date(order?.createdAt as string).toLocaleDateString()}
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-5">Ordered Items</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order?.items.map((item) => (
                  <TableRow key={item.productid}>
                    <TableCell className="text-center">
                      {item.productid}
                    </TableCell>
                    <TableCell className="text-center w-52">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-center w-52">
                      ₹{item.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center w-52">
                      ₹{(item.quantity * item.price).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
            <div className="grid grid-cols-2 gap-2 text-base">
              <div>Tracking ID:</div>
              <div>{order?.payment.tracking_id}</div>
              <div>Bank Reference:</div>
              <div>{order?.payment.bank_ref_no}</div>
              <div>Order Status:</div>
              <div>{order?.payment.order_status}</div>
              <div>Payment Mode:</div>
              <div>{order?.payment.payment_mode}</div>
              <div>Status Message:</div>
              <div>{order?.payment.status_message}</div>
              <div>Transaction Date:</div>
              <div>{order?.payment.trans_date}</div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewOrder;
