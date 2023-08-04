"use client";
import React from "react";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface OrderClientProps {
  data: OrderColumn[]
}

const OrderClient: React.FC<OrderClientProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-start">
        <Heading
          title={`Ordenes (${data.length})`}
          description="Administra las ordenes de tu tienda"
        />
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={data}
        searchKey="email"
        searchKeyEsp="email"
      />
      <Heading
        title="API"
        description="Llamadas del API para las ordenes de tu tienda"
      />
      <Separator />

      <ApiList entityIdName="orderId" entityName="orders"/>
    </>
  );
};

export default OrderClient;
