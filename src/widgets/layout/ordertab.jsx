import routes from '@/routes';
import { Button, Input, Tab, Tabs, TabsHeader } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Bounce, Flip, toast } from 'react-toastify';
import Uploadbutton from './uploadbutton';

const OrderTab = ({ selected, handleSelect }) => {
  const nestedRoutes = routes[0].pages[2].nestedRoutes;
  const [orderId, setOrderId] = useState('');
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

  const handleShippedAwb = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`https://dashboard-backend-tw3m.onrender.com/clients/awb/single/${awb}`);
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
  };

  const handleShippedOrderID = async (e) => {
    e.preventDefault();
    const oid = orderId.slice(1);
    try {
      const res = await axios.get(`https://dashboard-backend-tw3m.onrender.com/clients/orderid/single/${oid}`);
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
      if (error.response.status === 404) {
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
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  return (
    <>
      <div className='flex justify-between'>
        <div className="flex justify-between gap-4 flex-col">
          <Tabs value={selected} className="w-full md:w-max">
            <TabsHeader>
              {nestedRoutes.map(({ name, value, path }) => (
                <Tab key={value} value={value} onClick={() => handleSelect(value)}>
                  <NavLink to={`/dashboard/orders${path}`}>
                    &nbsp;&nbsp;{name}&nbsp;&nbsp;
                  </NavLink>
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
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
        <div className='mr-2'>
          <Uploadbutton />
        </div>
      </div>
    </>
  )
}

export default OrderTab