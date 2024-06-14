import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ShippedTab from "@/widgets/layout/shippedtab";

export function Shipped() {

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
                Shipped Orders list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all shipped orders
              </Typography>
            </div>
          </div>
          <ShippedTab selected={selected} handleSelect={handleSelect} />
        </CardHeader>
        <Outlet />
      </Card>
    </div>
  );
}

export default Shipped;