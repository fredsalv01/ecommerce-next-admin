import { format } from "date-fns";
import React from "react";
import OrderClient from "./components/client";
import prismadb from "@/lib/prismadb";
import { OrderColumn } from "./components/columns";
import { es } from "date-fns/locale";
import { formatter } from "@/lib/utils";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      }
    }
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    email: item.email,
    phone: item.phone,
    address: item.address,
    products: item.orderItems.map((orderItem) => orderItem.product.name).join(", "),
    isPaid: item.isPaid,
    totalPrice: formatter.format(item.orderItems.reduce((total, orderItem) => {
      return total + Number(orderItem.product.price)
    }, 0)),
    createdAt: format(item.createdAt, "MMMM d, yyyy - HH:mm:ss aaaaa'm'", {
      locale: es,
    }),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
