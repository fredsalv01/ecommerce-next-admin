import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import { CreditCard, DollarSign, Package, Shirt } from "lucide-react";
import React from "react";
import { formatter } from "@/lib/utils";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import { OverView } from "@/components/overview";
import { getGraphRevenue } from "@/actions/get-graph-revenue";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getStockCount(params.storeId);
  const graphRevenue = await getGraphRevenue(params.storeId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="estadisticas de tu tienda" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          {/* Revenue */}
          <Card>
            <CardHeader className="text-sm font-medium">
              <CardTitle className="flex flex-row items-center justify-between space-y-0 pb-2">
                Ganancia Total
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatter.format(totalRevenue)}</div>
            </CardContent>
          </Card>

          {/* Sales */}
          <Card>
            <CardHeader className="text-sm font-medium">
              <CardTitle className="flex flex-row items-center justify-between space-y-0 pb-2">
                Ventas
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>
          
          {/* Products in stock */}
          <Card>
            <CardHeader className="text-sm font-medium">
              <CardTitle className="flex flex-row items-center justify-between space-y-0 pb-2">
                Productos en Stock
                <Shirt className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>
              Descripcion General
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <OverView data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
