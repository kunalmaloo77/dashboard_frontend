import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import routes from "@/routes";
import OrderTab from "@/widgets/layout/ordertab";

export function Orders() {
  const location = useLocation();
  const parts = location.pathname.split('/');
  const tab = parts[parts.length - 1];
  const [selected, setSelected] = useState(tab);
  const handleSelect = (value) => {
    setSelected(value);
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Orders List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all orders
              </Typography>
            </div>
          </div>
          <OrderTab selected={selected} handleSelect={handleSelect} />
        </CardHeader>
        <Outlet />
      </Card>
    </div>
  );
}

export default Orders;