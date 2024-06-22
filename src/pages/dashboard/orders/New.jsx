import Pagination from '@/widgets/layout/pagination';
import { axiosPublic } from '@/widgets/utils/axiosInstance';
import DateRange from '@/widgets/utils/date-range';
import { ChevronUpDownIcon, CloudArrowDownIcon } from '@heroicons/react/20/solid';
import { Button, CardBody, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv';
import { Link } from 'react-router-dom';

const New = () => {
  // const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [sku, setSku] = useState(null);
  const [currentItems, setcurrentItems] = useState([]);
  const [allData, setAllData] = useState([]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getOrders = async () => {
    try {
      setLoading(true);
      const res = await axiosPublic.get('/clients/orders', {
        params: {
          page: currentPage,
        }
      });
      setcurrentItems(res.data.orders);
      setTotalPages(res.data.totalPages);
      setSku(res.data.Sku);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error, "<-new error")
    }
  }

  const TABLE_HEAD = ["date", "order id", "name", "sku", "size", "amount", "quantity", "total amount", "mobile number", "email", ""];

  useEffect(() => {
    getOrders();
  }, [currentPage])

  const headers = [
    { label: "DATE", key: "date" },
    { label: "ORDER ID", key: "orderid" },
    { label: "NAME", key: "name" },
    { label: "SKU", key: "sku" },
    { label: "SIZE", key: "size" },
    { label: "AMOUNT", key: "amount" },
    { label: "QUANTITY", key: "quantity" },
    { label: "TOTAL AMOUNT", key: "totalamount" },
    { label: "MOBILE NUMBER", key: "mobilenumber" },
    { label: "EMAIL", key: "email" },
  ];

  const downloadCustomOrders = async () => {
    try {
      setLoading1(true);
      const res = await axiosPublic.get('/clients/orders', {
        params: {
          limit: totalPages * currentItems.length,
        }
      });

      const combinedData = res.data.orders.map((order, index) => ({
        ...order,
        sku: res.data.Sku[index][0].mainSKU,
        size: res.data.Sku[index][0].size,
      }));

      setAllData(combinedData);
      setLoading1(false);
    } catch (error) {
      setLoading1(false);
      console.log(error, "<-newData download error");
    }
  }
  return (
    <div>
      <div className='flex gap-2 mt-2'>
        <div>
          {allData.length > 0 ? (
            <div>
              <CSVLink data={allData} headers={headers} filename={"custom_orders.csv"}>
                <Button className="flex items-center justify-center gap-2 ml-4" color='green'>
                  <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                  <p>CSV Generated</p>
                </Button>
              </CSVLink>
            </div>
          ) : (
            <Button onClick={downloadCustomOrders} className="flex items-center justify-center gap-2 ml-4" color='green' disabled={loading1 ? true : false}>
              {loading1 ?
                <div role="status">
                  <svg aria-hidden="true" class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div> :
                <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>}
              <p>{loading1 ? "In Progress" : "Download CSV"}</p>
            </Button>
          )}
        </div>
      </div>
      {
        loading ?
          <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
            <div className="flex items-center">
              <span className="text-3xl mr-4">Loading</span>
              <svg className="animate-spin h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
            </div>
          </div> :
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
                    ({ orderid, name, amount, quantity, mobilenumber, totalamount, _id, email, date }, key) => {
                      let oid = orderid;
                      if (orderid.charAt(0) === '#') {
                        oid = '%23' + orderid.slice(1);
                      }
                      const className = `py-3 px-5 ${key === currentItems.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                        }`;
                      return (
                        <tr key={`${orderid}_${key}`}>
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
                              {sku[key][0].mainSKU}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              className="text-xs font-semibold text-blue-gray-600">
                              {sku[key][0].size}
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
                            {mobilenumber &&
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {mobilenumber}
                              </Typography>
                            }
                          </td>
                          <td className={className}>
                            {
                              email &&
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {email}
                              </Typography>
                            }
                          </td>
                          {key > 0 ? (!(currentItems[key - 1]?.orderid === currentItems[key]?.orderid) ?
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                <Link to={`/clients/${oid}`}>
                                  Click here
                                </Link>
                              </Typography>
                            </td> : <div></div>) :
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                <Link to={`/clients/${oid}`}>
                                  Click here
                                </Link>
                              </Typography>
                            </td>
                          }
                        </tr>)
                    }
                  )}
                </tbody>
              </table>
            </CardBody>
            <Pagination
              totalItems={currentItems}
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
      }
    </div>
  )
}

export default New