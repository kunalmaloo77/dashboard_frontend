import { Card, CardHeader, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import routes from "@/routes";
import RtoTab from "@/widgets/layout/rtotab";

export function Rto() {
  const location = useLocation();
  const parts = location.pathname.split('/');
  const tab = parts[parts.length - 1];
  const [selected, setSelected] = useState(tab);
  const handleSelect = (value) => {
    setSelected(value);
  }

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              RTO List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all returns
            </Typography>
          </div>
        </div>
        <RtoTab selected={selected} handleSelect={handleSelect} />
      </CardHeader>
      <Outlet />
    </Card>
  );
}

export default Rto;