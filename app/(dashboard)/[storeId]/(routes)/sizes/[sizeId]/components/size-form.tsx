"use client";

import React, { useState } from "react";
import * as z from "zod";
import { Trash } from "lucide-react";
import { Size } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

type SizeFormValues = z.infer<typeof formSchema>;

interface SizeFormProps {
  initialData: Size | null;
}

const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Editar talla o tamaño" : "Crear talla o tamaño";
  const description = initialData ? "Editar talla o tamaño" : "Agregar nueva talla o tamaño";
  const toastMessage = initialData ? "Talla o tamaño actualiado." : "Talla o tamaño creado";
  const action = initialData ? "Guardar cambios" : "Crear";

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: SizeFormValues) => {
    try {
      setLoading(true);
      if(initialData){
        await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data);
      }else{
        await axios.post(`/api/${params.storeId}/sizes`, data);
      }
      console.log('now stop')
      router.refresh();
      toast.success(toastMessage);
      router.push(`/${params.storeId}/sizes`)
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacta al equipo de soporte o intenta nuevamente");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizesId}`);
      router.refresh();
      toast.success("Talla o tamaño eliminada.");
      router.push(`/${params.storeId}/sizes`);
    } catch (error) {
      toast.error("Asegurate de haber eliminado todos los tamaños que usan esta talla antes.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setOpen(true)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nombre de la talla"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Talla</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Talla"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

export default SizeForm;
