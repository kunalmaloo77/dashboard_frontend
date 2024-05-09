import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { FolderArrowDownIcon, PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";

export function Rto() {
  const [orders, setOrders] = useState([]);
  const getClients = async () => {
    const res = await axios.get('https://dashboard-backend-eight.vercel.app//clients/shipped');
    const flattenedData = [];
    (res.data).forEach(item => {
      item.skus.forEach(sku => {
        flattenedData.push({
          clientcode: item.clientcode,
          fname: item.fname,
          lname: item.lname,
          state: item.state,
          city: item.city,
          postalcode: item.postalcode,
          awb: item.awb,
          address: item.address,
          mobilenumber: item.mobilenumber,
          sku: sku.sku,
          quantity: sku.quantity,
          amount: sku.amount,
          totalprice: sku.quantity * sku.amount,
        });
      });
    });
    setOrders(flattenedData);
  }
  useEffect(() => {
    getClients();
  }, [])

  let TABLE_HEAD = ["client code", "name", "skus", "amount", "quantity", "total amount", "mobile number", "address", "postalcode", "city", "state", "awb number"];

  const headers = [
    { label: "Client Code", key: "clientcode" },
    { label: "First Name", key: "fname" },
    { label: "Last Name", key: "lname" },
    { label: "Mobile Number", key: "mobilenumber" },
    { label: "SKU", key: "sku" },
    { label: "Quantity", key: "quantity" },
    { label: "Amount", key: "amount" },
    { label: "Total Price", key: "totalprice" },
    { label: "State", key: "state" },
    { label: "City", key: "city" },
    { label: "Postal Code", key: "postalcode" },
    { label: "Address", key: "address" },
    { label: "AWB NUMBER", key: "awb" },
  ];

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Members list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all members
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button variant="outlined" size="md">
                view all
              </Button>
              <Button className="flex items-center gap-3" size="md" color="green">
                <FolderArrowDownIcon strokeWidth={2} className="h-4 w-4" />
                <CSVLink data={orders} headers={headers} filename={"rto.csv"}>Download CSV</CSVLink>
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map(
                ({ clientcode, fname, lname, sku, quantity, amount, mobilenumber, address, postalcode, city, state, awb, totalprice }, key) => {
                  {/* { console.log(orders, `data${key}`) } */ }
                  const className = `py-3 px-5 ${key === orders.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                    }`;
                  return (
                    <tr key={`${clientcode}_${key}`}>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {clientcode}
                        </Typography>
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
                        <Typography className="text-xs font-semibold text-blue-gray-600">
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
                          {totalprice}
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
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          {awb}
                        </Typography>
                      </td>
                    </tr>)
                }
              )}
            </tbody>
          </table>
        </CardBody>
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

export default Rto;