import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import routes from "@/routes";
import OrderTab from "@/widgets/layout/ordertab";
import ShippedTab from "@/widgets/layout/shippedtab";

export function Shipped() {

  const nestedRoutes = routes[0].pages[3].nestedRoutes;

  const [selected, setSelected] = useState(() => {
    return localStorage.getItem('selectedShippedTab') || null;
  });
  const handleSelect = (value) => {
    setSelected(value);
  }

  useEffect(() => {
    localStorage.setItem('selectedShippedTab', selected);
  }, [selected]);

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
        <Routes>
          {nestedRoutes.map(({ path, element }) => (
            <Route key={path} exact path={path} element={element} />
          ))}
        </Routes>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Shipped;