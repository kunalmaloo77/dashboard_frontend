import Pagination from '@/widgets/layout/pagination';
import { axiosPublic } from '@/widgets/utils/axiosInstance';
import Loader from '@/widgets/utils/loader';
import { ChevronUpDownIcon, CloudArrowDownIcon, FolderArrowDownIcon } from '@heroicons/react/24/solid';
import { Button, CardBody, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Spinner, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { CSVLink } from 'react-csv';
import { Bounce, Flip, toast } from 'react-toastify';


const WithoutAwb = () => {
  const [withoutAwbData, setWithoutAwbData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [open, setOpen] = useState(false);
  const [allData, setAllData] = useState([]);
  const [sku, setSku] = useState(null);
  const [file, setFile] = useState(null);
  const currentItems = withoutAwbData;
  const fileInputRef = useRef(null);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const updateProduct = async (product, orderid) => {
    let oid = orderid;
    if (orderid.charAt(0) === '#') {
      oid = '%23' + orderid.slice(1);
    }
    try {
      const res = await axiosPublic.patch(`/clients/awb/${oid}`, product);
      console.log(res,"<-confirmed-to-shipped");
      toast.success("Order Confirmed", {
        position: "top-center",
        autoClose: 1000,
        transition: Bounce,
      })
      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch (error) {
      console.log(error);
    }

    // console.log(res.data);
  }

  const getWithoutAwb = async () => {
    try {
      setLoading(true)
      const res = await axiosPublic.get('/clients/withoutawb', {
        params: {
          page: currentPage,
        }
      });
      const items = res.data.items.map(order => {
        const date = new Date(order.date);
      
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getUTCFullYear();
      
        const formattedDate = `${day}/${month}/${year}`;
      
        return {
          ...order, // Spread other fields
          date: formattedDate // Update the date field
        };
      });
      setWithoutAwbData(items);
      console.log(res.data.items);
      setTotalPages(res.data.totalPages);
      setSku(res.data.Sku);
      setLoading(false);
    } catch (error) {
      console.log("without awb error->", error);
    }

  }
  useEffect(() => {
    getWithoutAwb();
  }, [currentPage]);

  const initialValues = {
    awb: '',
  }

  const headers = [
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
    { label: "CHANNEL NAME", key: "channelname" },
  ];

  const downloadWithoutAwbOrders = async () => {
    try {
      setLoading1(true);
      const res = await axiosPublic.get('/clients/withoutawb', {
        params: {
          limit: totalPages * withoutAwbData.length,
        }
      });
      const combinedData = res.data.items.map((order, index) => ({
        ...order,
        sku: res.data.Sku[index][0]?.mainSKU,
        size: res.data.Sku[index][0]?.size,
      }));
      setAllData(combinedData);
      setTotalPages(res.data.totalPages);
      setLoading1(false);
    } catch (error) {
      setLoading1(false);
      console.log(error, "<-confirmed download error");
    }
  }

  const handleSkuUpload = async () => {
    setOpen(!open)
    if (!file) {
      toast.error("Please select a file to upload", {
        position: "top-center",
        autoClose: 1000,
        transition: Flip
      });
      return;
    }
    const formData = new FormData();
    formData.append('csv', file);
    console.log(file);
    try {
      console.log(import.meta.env.MODE);
      setLoading(true);
      await axiosPublic.post('/upload/skuUpload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setLoading(false);
      toast.success("File Uploaded Successfully", {
        position: "top-center",
        autoClose: 1000,
        transition: Flip
      })
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.response.status === 400) {
        toast.error(error.response.data.error, {
          position: "top-center",
          autoClose: 1000,
          transition: Flip
        })
      } else {
        toast.error("An error occurred while uploading the file", {
          position: "top-center",
          autoClose: 1000,
          transition: Flip
        });
      }
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
    }
  }

  const TABLE_HEAD = ["order id", "date", "name", "sku", "size", "amount", "quantity", "total amount", "mobile number", "email", "address", "postalcode", "city", "state", "awb number", "channel name"];

  const handleFileChange = async (e) => {
    setFile(e.target.files[0]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    handleOpen();
  };
  const handleOpen = () => {
    setOpen(!open);
  }

  return (
    <div>
      <div className='flex mt-2 ml-4 items-center'>
        <form onSubmit={handleSkuUpload} encType="multipart/form-data" id='form'>
          <div className='flex'>
            <label htmlFor='file-upload' className='cursor-pointer px-3 py-2 border-2 rounded-md'>
              Upload SKU
            </label>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange} className='hidden'
              id='file-upload'
              ref={fileInputRef}
            />
          </div>
        </form>
        {allData.length > 0 ? (
          <CSVLink data={allData} headers={headers} filename={"confirmed_orders.csv"}>
            <Button className="flex items-center justify-center gap-2 ml-4" color='green'>
              <CloudArrowDownIcon className='h-[1.1rem]' />
              <p>CSV generated</p>
            </Button>
          </CSVLink>
        ) : (
          <Button onClick={downloadWithoutAwbOrders} className=" flex items-center justify-center gap-2 ml-4" color='green' disabled={loading1 ? true : false}>
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
        loading ? <Loader /> : (
          <div>
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
                  {currentItems?.map(
                    ({ orderid, name, amount, quantity, mobilenumber, totalamount, _id, email, date, address, city, state, postalcode, channelname }, key) => {
                      const className = `py-3 px-5 ${key === currentItems.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                        }`;
                      return (
                        <tr key={`${orderid}_${key}`}>
                          <td className={className}>
                            <Typography
                              className="text-xs font-semibold text-blue-gray-600">
                              {orderid}
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
                              {name}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold" style={{ color: sku[key][0]?.mainSKU ? 'rgb(75, 85, 99)' : 'red' }}>
                              {sku[key][0]?.mainSKU ? sku[key][0].mainSKU : "NA"}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              className="text-xs font-semibold" style={{ color: sku[key][0]?.size ? 'rgb(75, 85, 99)' : 'red' }}>
                              {sku[key][0]?.size ? sku[key][0]?.size : "NA"}
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
                              className="text-xs font-semibold text-blue-gray-600">
                              {postalcode}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              className="text-xs font-semibold text-blue-gray-600">
                              {city}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              className="text-xs font-semibold text-blue-gray-600">
                              {state}
                            </Typography>
                          </td>
                          {key > 0 ? (!(currentItems[key - 1]?.orderid === currentItems[key]?.orderid) ?
                            <td className={`px-5 ${key === currentItems.length - 1
                              ? ""
                              : "border-b border-blue-gray-50"
                              }`}>
                              <Typography
                                className="text-xs font-semibold text-blue-gray-600">
                                <Formik
                                  initialValues={initialValues}
                                  onSubmit={(values) => {
                                    updateProduct(values, orderid);
                                  }}
                                >
                                  <Form>
                                    <div className="flex">
                                      <div>
                                        <Field
                                          type="text"
                                          name="awb"
                                          id="awb"
                                          autoComplete="off"
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus: sm:text-sm sm:leading-6 px-2"
                                        />
                                      </div>
                                    </div>
                                  </Form>
                                </Formik>
                              </Typography>
                            </td> : <div></div>) :
                            <td className={`px-5 ${key === currentItems.length - 1
                              ? ""
                              : "border-b border-blue-gray-50"
                              }`}>
                              <Typography
                                className="text-xs font-semibold text-blue-gray-600">
                                <Formik
                                  initialValues={initialValues}
                                  onSubmit={(values) => {
                                    updateProduct(values, orderid);
                                  }}
                                >
                                  <Form>
                                    <div className="flex">
                                      <div>
                                        <Field
                                          type="text"
                                          name="awb"
                                          id="awb"
                                          autoComplete="off"
                                          autoFocus={true}
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus: sm:text-sm sm:leading-6 px-2"
                                        />
                                      </div>
                                    </div>
                                  </Form>
                                </Formik>
                              </Typography>
                            </td>}
                          <td className={className}>
                            <Typography
                              className="text-xs font-semibold text-blue-gray-600">
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
              totalItems={withoutAwbData}
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
            <Dialog open={open} handler={handleOpen}>
              <DialogHeader>Upload SKU's</DialogHeader>
              <DialogBody>
                Are you sure you want to upload {file?.name}
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleOpen}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={handleSkuUpload}>
                  <span>Confirm</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
        )
      }
    </div>
  )
}

export default WithoutAwb