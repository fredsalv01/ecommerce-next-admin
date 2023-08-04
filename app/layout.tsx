import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/providers/modal-provider";
import prismadb from "@/lib/prismadb";
import { ToasterProvider } from "@/providers/toast-provider";
import {esES} from '@clerk/localizations'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Administrador de Tienda",
  description: "Administrador para la tienda MamaCanguro puedes administrar tiendas, categorias, productos y mucho más.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <ClerkProvider localization={esES}>
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider />
          <ModalProvider  />
          {children}</body>
      </html>
    </ClerkProvider>
  );
}
