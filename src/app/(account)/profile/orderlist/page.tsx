"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useOrder } from "@/services/useOrder";
import { IOrder } from "@/types/types";
import { useMemo } from "react";
import EmptyOrdersPage from "@/components/profile/EmptyOrdersPage";
import ViewOrder from "@/components/profile/ViewOrder";
import { AuthProvider } from "@/providers/AuthProvider";

const OrderListPage = () => {
  const { token } = AuthProvider();
  const { data, isLoading, error } = useOrder(token);
  const orderlist: IOrder[] = useMemo(
    () => data?.data[0]?.orders ?? [],
    [data?.data]
  );

  if (isLoading) return <div>Loading the orderlist...</div>;
  if (error) return <EmptyOrdersPage />;

  return (
    <div>
      <h2 className="text-black/80 text-2xl font-bold">Order List</h2>
      <Table className="mt-5 border">
        <TableHeader className="text-gray-500/80 border-b border-b-black/15">
          <TableRow>
            <TableHead className="py-3 font-semibold">Order ID</TableHead>
            <TableHead className="py-3 font-semibold">Date</TableHead>
            <TableHead className="py-3 font-semibold">Total</TableHead>
            <TableHead className="py-3 font-semibold">Status</TableHead>
            <TableHead className="py-3 font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-center text-black/70 font-semibold">
          {orderlist.map((order) => (
            <TableRow key={order?.orderid}>
              <TableCell>{order?.orderid}</TableCell>
              <TableCell>
                {new Date(order?.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>₹{order?.order_total.toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    order?.payment?.order_status.toLowerCase() === "success"
                      ? "success"
                      : "failed"
                  }
                >
                  {order?.payment?.order_status}
                </Badge>
              </TableCell>
              <TableCell>
                <ViewOrder token={token} orderid={order?.orderid} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderListPage;
