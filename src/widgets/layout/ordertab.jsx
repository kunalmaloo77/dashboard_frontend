import routes from '@/routes';
import { Button, Input, Tab, Tabs, TabsHeader } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import Uploadbutton from './uploadbutton';
import { CSVLink } from 'react-csv';
import { ArrowPathIcon, CloudArrowDownIcon } from '@heroicons/react/24/solid';
import { axiosPublic } from '../utils/axiosInstance';

const OrderTab = ({ selected, handleSelect }) => {
  const [Loading, setLoading] = useState(false);
  const nestedRoutes = routes[0].pages[2].nestedRoutes;
  const [orderId, setOrderId] = useState('');
  const [allData, setAllData] = useState([])
  const [awb, setAwb] = useState('');
  const [selectedOption, setSelectedOption] = useState(() => {
    return localStorage.getItem('selectedOption') || null;
  });

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  }

  useEffect(() => {
    localStorage.setItem('selectedOption', selectedOption);
  }, [selectedOption])

  const handleOrderIdChange = (e) => {
    const value = e.target.value;
    setOrderId(value);
  }

  const handleAwbChange = (e) => {
    const value = e.target.value;
    setAwb(value);
  }

  const downloadAllOrders = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axiosPublic.get('/clients');
      const combinedData = res.data.orders.map((order, index) => ({
        ...order,
        sku: res.data.Sku?.[index]?.mainSKU ? res.data.Sku[index].mainSKU : "NA",
        size: res.data.Sku?.[index]?.size ? res.data.Sku[index].size : "NA",
      }));
      setAllData(combinedData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error fethching data ->", error);
    }
  }

  const handleShippedAwb = async (e) => {
    e.preventDefault();
    try {
      await axiosPublic.get(`/clients/awb/single/${awb}`);
      toast.success("Order Shipped", {
        position: "top-center",
        autoClose: 500,
        transition: Bounce,
      });
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log("AWB Shipping Error->", error);
      if (error.response.status === 404) {
        toast.error("AWB not found", {
          position: "top-center",
          autoClose: 1000,
          transition: Bounce,
        })
      }
      else {
        toast.error("Internal Server Error", {
          position: "top-right",
        });
      }
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  const handleShippedOrderID = async (e) => {
    e.preventDefault();
    // const oid = orderId.slice(1);
    let isHashed = 1;
    let oid = orderId;
    if (orderId[0] === '#') {
      oid = orderId.slice(1);
      isHashed = 0;
    }
    console.log(oid);
    try {
      const res = await axiosPublic.get(`/clients/orderid/single/${oid}`, {
        params: { isHashed: isHashed },
      });
      console.log(res);
      toast.success("Order Shipped", {
        position: "top-center",
        autoClose: 500,
        transition: Bounce,
      });
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log("OrderID Shipping Error->", error);
      if (error.response?.status === 404) {
        toast.error("OrderID not found", {
          position: "top-center",
          autoClose: 1000,
          transition: Bounce,
        })
      }
      else {
        toast.error("Internal Server Error", {
          position: "top-right",
        });
      }
    }
  }

  const headers = [
    { label: "UniqueID", key: "unique_id" },
    { label: "Date", key: "date" },
    { label: "ORDER ID", key: "orderid" },
    { label: "NAME", key: "name" },
    { label: "SKU", key: "sku" },
    { label: "SIZE", key: "size" },
    { label: "AMOUNT", key: "amount" },
    { label: "QUANTITY", key: "quantity" },
    { label: "TOTAL AMOUNT", key: "totalamount" },
    { label: "MOBILE NUMBER", key: "mobilenumber" },
    { label: "EMAIL", key: "email" },
    { label: "ADDRESS", key: "address" },
    { label: "POSTAL CODE", key: "postalcode" },
    { label: "CITY", key: "city" },
    { label: "STATE", key: "state" },
    { label: "AWB", key: "awb" },
    { label: "CHANNEL NAME", key: "channelname" },
    { label: "STATUS", key: "status" },
  ];

  return (
    <>
      <div className='flex justify-between'>
        <div className="flex justify-between gap-4 flex-col">
          <Tabs value={selected} className="w-max">
            <TabsHeader>
              {nestedRoutes.map(({ name, value, path }) => (
                <Tab key={value} value={value} className='w-max' onClick={() => handleSelect(value)}>
                  <NavLink to={`/dashboard/orders${path}`}>
                    &nbsp;&nbsp;{name}&nbsp;&nbsp;
                  </NavLink>
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          {
            selected === 'ready-to-ship' &&
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
                              checked={selectedOption === 'awb'}
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
                              checked={selectedOption === 'orderid'}
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
                  <div className="w-[24rem] flex gap-2">
                    <Input label="AWB" value={awb} autoFocus={true} onChange={handleAwbChange} />
                  </div>
                </form>
              }
              {
                selectedOption === 'orderid' &&
                <form onSubmit={handleShippedOrderID}>
                  <div className="w-[24rem] flex gap-2">
                    <Input label="ORDER ID" value={orderId} autoFocus={true} onChange={handleOrderIdChange} />
                  </div>
                </form>
              }
            </div>
          }
        </div>
        <div>
          {allData.length > 0 ? (
            <CSVLink data={allData} headers={headers} filename={"allorders.csv"}>
              <Button className="flex items-center justify-center gap-2 ml-4" variant='outlined'>
                <CloudArrowDownIcon className='h-[1.1rem]' />
                <p>CSV generated</p>
              </Button>
            </CSVLink>
          ) : (
            <Button onClick={downloadAllOrders} className="flex items-center justify-center gap-2 ml-4" variant='outlined' disabled={Loading ? true : false}>
              {Loading ?
                <div role="status">
                  <svg aria-hidden="true" class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div> :
                <CloudArrowDownIcon className='h-[1.1rem]' />}
              <p>{Loading ? "In Progress" : "Download All Orders"}</p>
            </Button>
          )}
        </div>
        <div className='mr-2'>
          <Uploadbutton />
        </div>
      </div>
    </>
  )
}

export default OrderTab