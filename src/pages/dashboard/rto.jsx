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
  import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { Link } from "react-router-dom";
  import { Field, Form, Formik } from "formik";
  
  export function Rto() {
    const [orders, setOrders] = useState([]);
    const [selected, setSelected] = useState("orders");
    const initialValues = {
      awb: '',
    }
    const newArray = orders.map(data => {
      if (selected === "orders") {
        return { id: data._id, fname: data.fname, lname: data.lname, clientcode: data.clientcode, skus: data.skus, amount: data.amount, quantity: data.quantity, mobilenumber: data.mobilenumber }
      }
      else if (selected === "confirmed") {
        return { id: data._id, fname: data.fname, lname: data.lname, clientcode: data.clientcode, skus: data.skus, postalcode: data.postalcode, city: data.city, state: data.state, amount: data.amount, quantity: data.quantity, mobilenumber: data.mobilenumber, address: data.address }
      }
      else if (selected === "shipped") {
        return { id: data._id, fname: data.fname, lname: data.lname, clientcode: data.clientcode, skus: data.skus, postalcode: data.postalcode, city: data.city, state: data.state, status: data.status, amount: data.amount, quantity: data.quantity, address: data.address, mobilenumber: data.mobilenumber }
      }
      else if (selected === "delivered") {
        return { id: data._id, fname: data.fname, lname: data.lname, clientcode: data.clientcode, skus: data.skus, postalcode: data.postalcode, city: data.city, state: data.state, status: data.status, amount: data.amount, quantity: data.quantity, address: data.address }
      }
      else if (selected === "rto") {
        return { id: data._id, fname: data.fname, lname: data.lname, clientcode: data.clientcode, skus: data.skus, postalcode: data.postalcode, city: data.city, state: data.state, status: data.status, amount: data.amount, quantity: data.quantity, address: data.address }
      }
    })
    const getClients = async () => {
      const res = await axios.get('http://localhost:8080/clients');
      setOrders(res.data);
    }
    useEffect(() => {
      getClients();
    }, [])
  
    const TABS = [
      {
        label: "Orders",
        value: "orders",
      },
      {
        label: "Confirmed",
        value: "confirmed",
      },
      {
        label: "Shipped",
        value: "shipped",
      },
      {
        label: "Delivered",
        value: "delivered",
      },
      {
        label: "RTO",
        value: "rto"
      }
    ];
  
    const updateProduct = async (product) => {
      const res = await axios.patch(`http://localhost:8080/clients/${id}`, product);
      console.log(res.data);
    }
  
    let TABLE_HEAD = ["client code", "name", "skus", "amount", "quantity", "total amount", "mobile number", "address", "postalcode", "city", "state", "awb number"];
  
    const ORDER_HEAD = ["client code", "name", "skus", "amount", "quantity", "total amount", "mobile number", ""];
  
    const CONFIRMED_HEAD = ["client code", "name", "skus", "amount", "quantity", "total amount", "mobile number", "address", "postalcode", "city", "state", "awb number"];
  
    const SHIPPED_HEAD = ["client code", "name", "skus", "amount", "quantity", "total amount", "mobile number", "address", "postalcode", "city", "state", "awb number", "status"];
  
    const DELIVERED_HEAD = ["client code", "name", "skus", "amount", "quantity", "total amount", "mobile number", "address", "postalcode", "city", "state", "awb number", "status"];
  
    const RTO_HEAD = ["client code", "name", "skus", "amount", "quantity", "total amount", "mobile number", "address", "postalcode", "city", "state", "awb number", "status"];
  
    if (selected === 'orders') {
      TABLE_HEAD = ORDER_HEAD
    }
    else if (selected === 'confirmed') {
      TABLE_HEAD = CONFIRMED_HEAD
    }
    else if (selected === 'shipped') {
      TABLE_HEAD = SHIPPED_HEAD
    }
    else if (selected === 'shipped') {
      TABLE_HEAD = DELIVERED_HEAD
    }
    else if (selected === 'shipped') {
      TABLE_HEAD = RTO_HEAD
    }
  
  
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
                <Button variant="outlined" size="sm">
                  view all
                </Button>
                <Button className="flex items-center gap-3" size="sm">
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <Tabs
                value={selected}
                className="w-full md:w-max"
              >
                <TabsHeader>
                  {TABS.map(({ label, value }) => (
                    <Tab key={value} value={value} onClick={() => setSelected(value)}>
                      &nbsp;&nbsp;{label}&nbsp;&nbsp;
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
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
                {newArray.map(
                  ({ clientcode, fname, lname, skus, mobilenumber, city, address, postalcode, state, id }, key) => {
                    const className = `py-3 px-5 ${key === orders.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                      }`;
                    return skus.map(({ sku, amount, quantity }, skuKey) => (
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
                            {quantity * amount}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {mobilenumber}
                          </Typography>
                        </td>
                        {
                          (selected === 'confirmed' || selected === 'shipped' || selected === 'delivered') &&
                          <td className={className}>
                            <Typography
                              className="text-xs font-semibold text-blue-gray-600">
                              {address}
                            </Typography>
                          </td>
                        }
                        {
                          (selected === 'confirmed' || selected === 'shipped' || selected === 'delivered') &&
                          <td className={className}>
                            <Typography
                              as="a"
                              href="#"
                              className="text-xs font-semibold text-blue-gray-600"
                            >
                              {postalcode}
                            </Typography>
                          </td>
                        }
                        {
                          (selected === 'confirmed' || selected === 'shipped' || selected === 'delivered') &&
                          <td className={className}>
                            <Typography
                              as="a"
                              href="#"
                              className="text-xs font-semibold text-blue-gray-600"
                            >
                              {city}
                            </Typography>
                          </td>
                        }
                        {
                          (selected === 'confirmed' || selected === 'shipped' || selected === 'delivered') &&
                          <td className={className}>
                            <Typography
                              as="a"
                              href="#"
                              className="text-xs font-semibold text-blue-gray-600"
                            >
                              {state}
                            </Typography>
                          </td>
                        }
                        {selected === 'orders' &&
                          <td className={className}>
                            <Typography
                              as="a"
                              href="#"
                              className="text-xs font-semibold text-blue-gray-600"
                            >
                              <Link to={`/clients/${id}`}>
                                Click here
                              </Link>
                            </Typography>
                          </td>
                        }
                        {
                          selected === 'confirmed' &&
                          <td>
                            <Typography
                              className="text-xs font-semibold text-blue-gray-600">
                              <Formik
                                initialValues={initialValues}
                                onSubmit={(values) => {
                                  updateProduct(values);
                                }}
                              >
                                <Form>
                                  <div className="mt-2">
                                    <Field
                                      type="text"
                                      name="awb"
                                      id="awb"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                    />
                                  </div>
                                </Form>
                              </Formik>
                            </Typography>
                          </td>
                        }
                      </tr>
                    ))
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