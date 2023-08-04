"use client";
import React from "react";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { SizeColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface SizeClientProps {
  data: SizeColumn[]
}

const SizeClient: React.FC<SizeClientProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Tallas/Tamaños (${data.length})`}
          description="Administra las Tallas/Tamaños de tu tienda."
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/sizes/new`)}
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
        description="Llamadas al API de tallas/tamaños"
      />
      <Separator />

      <ApiList entityIdName="sizeId" entityName="sizes"/>
    </>
  );
};

export default SizeClient;
