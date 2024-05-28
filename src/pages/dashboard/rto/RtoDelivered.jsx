import Pagination from '@/widgets/layout/pagination';
import { FolderArrowDownIcon } from '@heroicons/react/24/solid';
import { Button, CardBody, Spinner, Typography } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv';

const RtoDelivered = () => {
  const [rtoDeliveredData, setRTODeliveredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rtoDeliveredData.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getRTODelivered = async () => {
    setLoading(true);
    const res = await axios.get('https://dashboard-backend-tw3m.onrender.com/clients/rtodelivered');
    setRTODeliveredData(res.data);
    setLoading(false);
  }

  const TABLE_HEAD = ["unique_id", "date", "order id", "name", "skus", "amount", "quantity", "total amount", "mobile number", "email", "address", "postalcode", "city", "state", "awb number", "channel name"];

  useEffect(() => {
    getRTODelivered();
  }, [])

  const headers = [
    { label: "UniqueID", key: "unique_id" },
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

  return (
    <div>
      <div className='inline-block'>
        <CSVLink data={rtoDeliveredData} headers={headers} filename={"rtodelivered.csv"}>
          <Button className="flex items-center justify-center gap-2 mt-2 ml-4" size="md" color="green">
            <FolderArrowDownIcon strokeWidth={2} className="h-6 w-6" />
            <p>Download File</p>
          </Button>
        </CSVLink>
      </div>
      {
        loading ? <div class="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
          <div class="flex items-center">
            <span class="text-3xl mr-4">Loading</span>
            <svg class="animate-spin h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
          </div>
        </div> : (
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
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentItems?.map(
                    ({ unique_id, orderid, name, sku, amount, quantity, mobilenumber, totalamount, email, date, address, city, state, postalcode, awb, channelname }, key) => {
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
                              {date}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              className="text-xs font-semibold text-blue-gray-600">
                              {orderid}
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
                              {mobilenumber}
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
              totalItems={rtoDeliveredData.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )
      }


    </div >
  )
}

export default RtoDelivered