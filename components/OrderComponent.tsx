"use client";
import { TOrders } from "@/app/(client)/Types";
import React, { useState } from "react";
import { TableBody, TableCell, TableRow } from "./ui/table";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { format } from "date-fns";
import PriceFormatter from "./PriceFormatter";
import OrderDetailsDialog from "./OrderDetailDialog";
const OrderComponent = ({ orders }: { orders: TOrders[] }) => {

  const [selectedOrder,setSelectedOrder] = useState<TOrders | null>(null);
  return (
    <>
        <TableBody>
        <TooltipProvider>
          {orders?.map((order) => (
            <Tooltip key={order?.orderNumber}>
              <TooltipTrigger asChild>
                <TableRow
                  className=" cursor-pointer hover:bg-gray-100 h-12"
                  onClick={() => setSelectedOrder(order)}
                >
                  <TableCell className="font-medium">
                    {order.orderNumber?.slice(-10) ?? "N/A"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order?.createdAt &&
                      format(new Date(order.createdAt), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>{order?.customerName}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order?.email}
                  </TableCell>
                  <TableCell>
                    <PriceFormatter
                      amount={order?.totalPrice}
                      className="text-black font-medium"
                    />
                  </TableCell>
                  <TableCell>
                    {order?.status && (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${order?.status === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                      >
                        {order?.status}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order?.invoice && (
                      <p>{order?.invoice ? order?.invoice?.number : "----"}</p>
                    )}
                  </TableCell>
                </TableRow>
              </TooltipTrigger>
              <TooltipContent>Click to see order details</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </TableBody>
      <OrderDetailsDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
};

export default OrderComponent;
