"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  size: string;
  category: string;
  color: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "isArchived",
    header: "¿Archivar?",
    cell: ({ row }) => (
      <p className={`${row.original.isArchived ? "text-green-500" : "text-red-500"} font-semibold`}>
        {row.original.isArchived ? "Si" : "No"}
      </p>
    ),
  },
  {
    accessorKey: "isFeatured",
    header: "¿Mostrar al inicio?",
    cell: ({row}) => (
      <p className={`${row.original.isFeatured ? "text-green-500" : "text-red-500"} font-semibold`}>
        {row.original.isFeatured ? 'Si' : 'No'}
      </p>
    )
  },
  {
    accessorKey: "price",
    header: "Precio",
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "size",
    header: "Talla",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div
        className="w-6 h-6 rounded-full border border-gray-400"
        style={{ backgroundColor: row.original.color }}
      />
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
