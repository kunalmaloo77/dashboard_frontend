import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { projectsTableData } from "@/data";
import { useEffect, useState } from "react";
import axios from "axios";

export function Tables() {
  const [clientsTableData, setClientsTableData] = useState([]);
  const getClients = async () =>{
    const res = await axios.get('http://localhost:8080/clients');
    setClientsTableData(res.data);
  }
  useEffect(()=>{
    getClients();
  },[])
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Clients Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 whitespace-nowrap">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["client code", "name", "skus","amount","quantity","total amount", "mobile number", "address", "postalcode", "city", "state", "awb number"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clientsTableData.map(
                ({ clientcode, fname, lname, skus, mobilenumber, city, address, postalcode, state }, key) => {
                  const className = `py-3 px-5 ${
                      key === clientsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;
                  return skus.map(({sku, amount, quantity}, skuKey)=>(
                    <tr key={`${clientcode}_${skuKey}`}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {clientcode}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {fname}
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {lname}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          className="text-xs font-semibold text-blue-gray-600">
                          {sku}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {amount}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {quantity}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {quantity*amount}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {mobilenumber}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          className="text-xs font-semibold text-blue-gray-600">
                          {address}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          {postalcode}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          {city}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          {state}
                        </Typography>
                      </td>
                    </tr>
                  ))
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Card>
      </Card>
    </div>
  );
}

export default Tables;
