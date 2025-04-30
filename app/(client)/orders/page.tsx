import Container from "@/components/Container";
import OrderComponent from "@/components/OrderComponent";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { requireUser } from "@/hooks/requiredUser";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { FileX } from "lucide-react";
import Link from "next/link";
import React from "react";
import { TOrders } from "../Types";
import { ScrollBar } from "@/components/ui/scroll-area";

const Orders = async () => {
  const userId = await requireUser();
  const orders = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}api/getOrder?userId=${userId?.id}`,
    {
      method: "get",
      headers: { "Content-type": "application/json" },
    }
  );
  const data:TOrders[] = (await orders.json()).data;
  return (
    <Container className="py-10">
      {data?.length ? (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Order List</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-auto">Order Number</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Email
                    </TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Invoice Number
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <OrderComponent orders={data} />
                <ScrollBar orientation="horizontal" />
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col items-center justify-center py-5 md:py-10 px-4">
          <FileX className="h-24 w-24 text-gray-400 mb-4" />
          <Title>No orders found</Title>
          <p className="mt-2 text-sm text-gray-600 text-center max-w-md">
            It looks like you haven&apos;t placed any orders yet. Start shopping
            to see your orders here!
          </p>
          <Button asChild className="mt-6">
            <Link href={"/"}>Browse Products</Link>
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Orders;
