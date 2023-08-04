"use client";
import React from "react";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { ProductColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface ProductClientProps {
  data: ProductColumn[]
}

const ProductClient: React.FC<ProductClientProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Productos (${data.length})`}
          description="Administra los productos de tu tienda"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/products/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Agregar nuevo
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={data}
        searchKey="name"
        searchKeyEsp="nombre"
      />
      <Heading
        title="API"
        description="Llamadas al API de productos"
      />
      <Separator />

      <ApiList entityIdName="productId" entityName="products"/>
    </>
  );
};

export default ProductClient;
