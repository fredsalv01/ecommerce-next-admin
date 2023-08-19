"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Productos",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    accessorKey: "address",
    header: "Dirección",
  },
  {
    accessorKey: "totalPrice",
    header: "Precio total"
  },
  {
    accessorKey: "isPaid",
    header: "Pagado",
    cell: ({ row }) => (
      <p
        className={`${row.original.isPaid ? "text-green-500" : "text-red-500"}`}
      >
        {row.original.isPaid ? "Sí" : "No"}
      </p>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Fecha de creación",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
