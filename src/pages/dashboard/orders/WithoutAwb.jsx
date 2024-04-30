import { ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { Button, CardBody, Spinner, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'


const WithoutAwb = ({ order, mykey, length }) => {
  // const { orderid, name, sku, amount, quantity, mobilenumber, totalamount, _id, email, date, address, city, state, postalcode, channelname } = order;
  const [loading, setLoading] = useState(false);
  const [withoutAwbData, setWithoutAwbData] = useState([]);

  const updateProduct = async (product, orderid) => {
    setLoading(true);
    const trunacatedoid = orderid.slice(1);
    const res = await axios.patch(`http://localhost:8080/clients/awb/${trunacatedoid}`, product);
    // console.log(res.data);
    setLoading(false);
  }

  const getWithoutAwb = async () => {
    const res = await axios.get('http://localhost:8080/clients/withoutawb');
    setWithoutAwbData(res.data);
  }
  useEffect(() => {
    getWithoutAwb();
  }, [])

  const initialValues = {
    awb: '',
  }

  const TABLE_HEAD = ["date", "order id", "name", "skus", "amount", "quantity", "total amount", "mobile number", "email", "address", "postalcode", "city", "state", "awb number", "channel name"];

  return (
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
            {withoutAwbData?.map(
              ({ orderid, name, sku, amount, quantity, mobilenumber, totalamount, _id, email, date, address, city, state, postalcode, channelname }, key) => {
                const className = `py-3 px-5 ${key === withoutAwbData.length - 1
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
                    {key > 0 ? (!(withoutAwbData[key - 1]?.orderid === withoutAwbData[key]?.orderid) ?
                      <td>
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
                                <div className="mt-2">
                                  <Field
                                    type="text"
                                    name="awb"
                                    id="awb"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                  />
                                </div>
                                <Button color="green" className="ml-4" type="submit">
                                  {loading ? <Spinner className="h-4 w-4" /> : null}
                                  SUBMIT
                                </Button>
                              </div>
                            </Form>
                          </Formik>
                        </Typography>
                      </td> : <div></div>) : <td>
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
                              <div className="mt-2">
                                <Field
                                  type="text"
                                  name="awb"
                                  id="awb"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                />
                              </div>
                              <Button color="green" className="ml-4" type="submit">
                                {loading ? <Spinner className="h-4 w-4" /> : null}
                                SUBMIT
                              </Button>
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
    </div>
  )
}

export default WithoutAwb