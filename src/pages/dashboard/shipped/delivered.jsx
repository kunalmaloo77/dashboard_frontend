import OrderTab from '@/widgets/layout/ordertab';
import Pagination from '@/widgets/layout/pagination';
import { axiosPublic } from '@/widgets/utils/axiosInstance';
import Loader from '@/widgets/utils/loader';
import { ChevronUpDownIcon, CloudArrowDownIcon, FolderArrowDownIcon } from '@heroicons/react/24/solid';
import { Button, CardBody, Typography } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv';

const Delivered = () => {
  const [deliveredData, setDeliveredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [allData, setAllData] = useState([]);
  const currentItems = deliveredData;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const getDelivered = async () => {
    try {
      setLoading(true);
      const res = await axiosPublic.get('/clients/delivered', {
        params: {
          page: currentPage,
        }
      });
      const delivered = res.data.delivered.map(order => {
          let date = new Date(order.date);
          if(order.delivered_date){
            date = new Date(order.delivered_date);
          }
          const day = String(date.getUTCDate()).padStart(2, '0');
          const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
          const year = date.getUTCFullYear();
          const formattedDate = `${day}/${month}/${year}`;
        return {
          ...order, // Spread other fields
          delivered_date: formattedDate // Update the date field
        };
      });
      setDeliveredData(delivered);
      setTotalPages(res.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.log(error, "<-delivered error");
    }

  }

  const TABLE_HEAD = ["unique_id", "delivered_date", "order id", "mobile number", "name", "skus", "amount", "quantity", "total amount", "email", "address", "postalcode", "city", "state", "awb number", "channel name"];

  useEffect(() => {
    getDelivered();
  }, [currentPage])

  const headers = [
    { label: "UniqueId", key: "unique_id" },
    { label: "Date", key: "date" },
    { label: "ORDER ID", key: "orderid" },
    { label: "NAME", key: "name" },
    { label: "SKUS", key: "sku" },
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
  ];

  const downloadDeliveredOrders = async () => {
    try {
      setLoading1(true);
      const res = await axiosPublic.get('/clients/delivered', {
        params: {
          limit: totalPages * deliveredData.length,
        }
      });
      setAllData(res.data.delivered);
      setTotalPages(res.data.totalPages);
      setLoading1(false);
    } catch (error) {
      setLoading1(false);
      console.log(error, "<-confirmed download error");
    }
  }

  return (
    <div>
      <div className='inline-block'>
        {allData.length > 0 ? (
          <CSVLink data={allData} headers={headers} filename={"delivered.csv"}>
            <Button className="flex items-center justify-center gap-2 ml-4 mt-2" color='green'>
              <CloudArrowDownIcon className='h-[1.1rem]' />
              <p>CSV generated</p>
            </Button>
          </CSVLink>
        ) : (
          <Button onClick={downloadDeliveredOrders} className="mt-2 flex items-center justify-center gap-2 ml-4" color='green' disabled={loading1 ? true : false}>
            {loading1 ?
              <div role="status">
                <svg aria-hidden="true" class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
              </div> :
              <CloudArrowDownIcon className='h-[1.1rem]' />}
            <p>{loading1 ? "In Progress" : "Download CSV"}</p>
          </Button>
        )}
      </div>
      {
        loading ? <Loader /> :
          <div>
            <CardBody className="overflow-scroll px-0">
              <table className="w-full min-w-max table-auto text-left">
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
                  {currentItems?.map(
                    ({ unique_id, orderid, name, sku, amount, quantity, mobilenumber, totalamount, email, date, address, city, state, postalcode, awb, channelname, delivered_date }, key) => {
                      const className = `py-3 px-5 ${key === currentItems.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                        }`;
                      return (
                        <tr key={`${orderid}_${key}`}>
                          <td className={className}>
                            <Typography
                              className="text-xs font-semibold text-blue-gray-600">
                              {unique_id}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              className="text-xs font-semibold text-blue-gray-600">
                              {delivered_date}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              className="text-xs font-semibold text-blue-gray-600">
                              {orderid}
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
                              {name}
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
                              {totalamount}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {email}
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
                          <td className={className}>
                            <Typography
                              as="a"
                              href="#"
                              className="text-xs font-semibold text-blue-gray-600"
                            >
                              {channelname}
                            </Typography>
                          </td>
                        </tr>
                      )
                    }
                  )}
                </tbody>
              </table>
            </CardBody>
            <Pagination
              totalItems={deliveredData}
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
      }
    </div>
  )
}

export default Delivered