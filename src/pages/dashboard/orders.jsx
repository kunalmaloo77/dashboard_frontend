import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Spinner,
} from "@material-tailwind/react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink, Navigate, Route, Routes } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import WithoutAwb from "./orders/WithoutAwb";
import Confirmed from "./orders/Confirmed";
import Order from "./orders/New";
import routes from "@/routes";
import OrderTab from "@/widgets/layout/ordertab";

export function Orders() {

  const nestedRoutes = routes[0].pages[1].nestedRoutes;
  // const [ordersData, setOrdersData] = useState([]);
  // const [confirmedData, setConfirmedData] = useState([]);
  // const [withoutAwbData, setWithoutAwbData] = useState([]);
  const [selected, setSelected] = useState(() => {
    return localStorage.getItem('selectedTab') || null;
  });
  const handleSelect = (value) => {
    setSelected(value);
  }
  // const [file, setFile] = useState(null);
  // const [orderId, setOrderId] = useState('');
  // const [awb, setAwb] = useState('');
  // const [error, setError] = useState('');
  // const [selectedOption, setSelectedOption] = useState(null);

  // const getConfirmed = async () => {
  //   const res = await axios.get('http://localhost:8080/clients/confirmed');
  //   setConfirmedData(res.data);
  // }
  // const getOrders = async () => {
  //   const res = await axios.get('http://localhost:8080/clients/orders');
  //   setOrdersData(res.data);
  // }

  // const getWithoutAwb = async () => {
  //   const res = await axios.get('http://localhost:8080/clients/withoutawb');
  //   setWithoutAwbData(res.data);
  // }

  // const handleOptionChange = (e) => {
  //   setSelectedOption(e.target.value);
  // }

  // const handleAwbSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('csv', file);
  //   try {
  //     const res = await axios.patch('http://localhost:8080/upload/bulkupload', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       }
  //     });
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log("Error Uploading CSV", error);
  //   }
  // }
  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // const handleSubmitUpload = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('csv', file);
  //   try {
  //     const response = await axios.post('http://localhost:8080/upload', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('Error uploading CSV:', error);
  //   }
  // };

  // const handleOrderIdChange = (e) => {
  //   const value = e.target.value;
  //   setOrderId(value);
  // }
  // const handleAwbChange = (e) => {
  //   const value = e.target.value;
  //   setAwb(value);
  // }

  // const handleShippedAwb = () => {
  //   console.log("handleShippedAwb called");
  // }

  // const handleShippedOrderID = () => {
  //   console.log("handleShippedAwb called");
  // }

  useEffect(() => {
    localStorage.setItem('selectedTab', selected);
  }, [selected]);

  // const TABS = [
  //   {
  //     label: "New",
  //     value: "orders",
  //   },
  //   {
  //     label: "WithoutAwb",
  //     value: "withoutawb",
  //   },
  //   {
  //     label: "Confirmed",
  //     value: "confirmed",
  //   },
  // ];

  // let TABLE_HEAD = [];

  // const ORDER_HEAD = ["date", "order id", "name", "skus", "amount", "quantity", "total amount", "mobile number", "email", ""];

  // const CONFIRMED_HEAD = ["date", "order id", "name", "skus", "amount", "quantity", "total amount", "mobile number", "email", "address", "postalcode", "city", "state", "awb number", "channel name"];

  // if (selected === 'orders') {
  //   TABLE_HEAD = ORDER_HEAD
  // }
  // else {
  //   TABLE_HEAD = CONFIRMED_HEAD
  // }


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
          </div>
          <OrderTab selected={selected} handleSelect={handleSelect} />
          {/* <Tabs
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
            </Tabs> */}
          {/* <div className="flex flex-col gap-6">
              {
                selected === 'withoutawb' ?
                  <div>
                    <form onSubmit={handleAwbSubmit} encType="multipart/form-data">
                      <div className="flex">
                        <input type="file" accept=".csv" onChange={handleFileChange} className="appearance-none border border-gray-300 rounded-md py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-4" />
                        <Button type="submit" color="green" size="sm">Upload AWB CSV</Button>
                      </div>
                    </form>
                  </div> : null
              }
              {
                selected === 'confirmed' &&
                <div>
                  <div className="relative flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mb-4">
                    <nav className="flex min-w-[240px] flex-row gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
                      <div role="button"
                        className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                        <label htmlFor="horizontal-list-react" className="flex items-center w-full px-3 py-2 cursor-pointer">
                          <div className="grid mr-3 place-items-center">
                            <div className="inline-flex items-center">
                              <label className="relative flex items-center p-0 rounded-full cursor-pointer"
                                htmlFor="awb">
                                <input
                                  name="option"
                                  id="awb"
                                  value="awb"
                                  type="radio"
                                  onClick={handleOptionChange}
                                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-0" />
                                <span
                                  className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                  </svg>
                                </span>
                              </label>
                            </div>
                          </div>
                          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-400">
                            AWB
                          </p>
                        </label>
                      </div>
                      <div role="button"
                        className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                        <label htmlFor="horizontal-list-vue" className="flex items-center w-full px-3 py-2 cursor-pointer">
                          <div className="grid mr-3 place-items-center">
                            <div className="inline-flex items-center">
                              <label className="relative flex items-center p-0 rounded-full cursor-pointer" htmlFor="orderid">
                                <input
                                  name="option"
                                  id="orderid"
                                  type="radio"
                                  value="orderid"
                                  onClick={handleOptionChange}
                                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-0" />
                                <span
                                  className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                  </svg>
                                </span>
                              </label>
                            </div>
                          </div>
                          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-400">
                            ORDER-ID
                          </p>
                        </label>
                      </div>
                    </nav>
                  </div>
                  {
                    selectedOption === 'awb' &&
                    <form onSubmit={handleShippedAwb}>
                      <div className="w-72 flex gap-2">
                        <Input label="AWB" value={awb} onChange={handleAwbChange} />
                      </div>
                      {error && <div className="text-red-500">{error}</div>}
                    </form>
                  }
                  {
                    selectedOption === 'orderid' &&
                    <form onSubmit={handleShippedOrderID}>
                      <div className="w-72 flex gap-2">
                        <Input label="ORDER ID" value={orderId} onChange={handleOrderIdChange} />
                      </div>
                      {error && <div className="text-red-500">{error}</div>}
                    </form>
                  }

                </div>
              }

              <form onSubmit={handleSubmitUpload} encType="multipart/form-data">
                <div className="flex">
                  <input type="file" accept=".csv" onChange={handleFileChange} className="appearance-none border border-gray-300 rounded-md py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-4" />
                  <Button type="submit" color="green" size="sm">Upload CSV</Button>
                </div>
              </form>
            </div> */}
        </CardHeader>
        {/* <CardBody className="overflow-scroll px-0">
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
              {selected === 'withoutawb' ? (withoutAwbData.map(
                (order, key) => {
                  return (<WithoutAwb order={order} mykey={key} length={withoutAwbData.length} />)
                })
              ) : null}
              {selected === 'orders' ? (ordersData.map(
                (order, key) => {
                  return (<Order order={order} key={key} length={ordersData.length} />)
                }
              )) : null}
              {selected === 'confirmed' ? (confirmedData.map(
                (order, key) => {
                  return (<Confirmed order={order} key={key} length={confirmedData.length} />)
                })) : null}
            </tbody>
          </table>
        </CardBody> */}
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

export default Orders;