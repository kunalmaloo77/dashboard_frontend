import { Card, CardHeader, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import routes from "@/routes";
import RtoTab from "@/widgets/layout/rtotab";

export function Rto() {
  const nestedRoutes = routes[0].pages[4].nestedRoutes;
  const [selected, setSelected] = useState(() => {
    return localStorage.getItem('selectedRTOTab') || null;
  });
  const handleSelect = (value) => {
    setSelected(value);
  }
  useEffect(() => {
    localStorage.setItem('selectedRTOTab', selected);
  }, [selected]);

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
      <Routes>
        {nestedRoutes.map(({ path, element }) => (
          <Route key={path} exact path={path} element={element} />
        ))}
      </Routes>
    </Card>
  );
}

export default Rto;