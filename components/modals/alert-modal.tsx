"use client"

import React, { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface AlerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}


export const AlertModal: React.FC<AlerModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if(!isMounted) {
    return null;
  }


  return(
    <div>
      <Modal
        title="¿Estás seguro?"
        description="¡Esta acción no puede ser deshecha!"
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <Button disabled={loading} variant={"outline"} onClick={onClose}>
            Cancelar
          </Button>
          <Button disabled={loading} variant={"destructive"} onClick={onConfirm}>
            Continuar
          </Button>
        </div>
      </Modal>
    </div>
  )
}