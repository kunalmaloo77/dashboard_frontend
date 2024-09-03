import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Button,
  DialogBody,
  Dialog,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { Field, FieldArray, Form, Formik } from "formik";
import { useState } from "react";
import { Flip, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { axiosPublic } from "@/widgets/utils/axiosInstance";

export function Office() {
  const [loading, setLoading] = useState(false);

  let today = new Date();

  const initialValues = {
    date: today,
    orderid: '',
    name: '',
    mobilenumber: '',
    email: '',
    skus: [],
  }
  const addProduct = async (product) => {
    setLoading(true);
    const flattenedData = [];
    const item = product;
    console.log(item);
    item.skus.forEach(sku => {
      flattenedData.push({
        date: item.date,
        orderid: item.orderid,
        name: item.name,
        mobilenumber: item.mobilenumber,
        sku: sku.sku,
        email: item.email,
        quantity: sku.quantity,
        amount: sku.amount,
        totalamount: sku.quantity * sku.amount,
      });
    });
    try {
      for (let i = 0; i < flattenedData.length; i++) {
        const res = await axiosPublic.post('/clients', flattenedData[i]);
        console.log(res.data);
      }
      toast.success("Order Placed Successfully", {
        transition: Flip,
        position: "top-center",
        autoClose: 1000
      })
    } catch (error) {
      if (error.response.status === 409) {
        console.log("Client Already exists", error);
        toast.error("Client Already exists", {
          transition: Flip,
          position: "top-center",
          autoClose: 1000
        })
      }
      else {
        console.log("Registration error:", error);
      }
    }
    setLoading(false)
  }

  return (
    <>
      {
        loading ? <div class="absolute bg-white bg-opacity-60 z-10 flex items-center h-[85%] w-[75%] justify-center">
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
        </div> : <div><div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
          <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
        </div>
          <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
            <CardBody className="p-4">
              <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
                <div className="flex items-center gap-6">
                  <Avatar
                    src="/img/bruce-mars.jpeg"
                    alt="bruce-mars"
                    size="xl"
                    variant="rounded"
                    className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                  />
                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                      Saurabh Duggar
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-600"
                    >
                      CEO / Co-Founder
                    </Typography>
                  </div>
                </div>

              </div>
              <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                  addProduct(values);
                  actions.resetForm();
                }}
              >
                {({ values, resetForm }) => (
                  <Form>
                    <div className="container mx-auto mt-10">
                      <div>
                        <h2 className="text-lg font-semibold mb-2">Client Information</h2>
                        <div className="flex flex-col lg:flex-row mb-4 gap-2">
                          <Field
                            type="text"
                            name="orderid"
                            id="orderid"
                            autoComplete="off"
                            placeholder="Order ID"
                            className="mr-2 p-2 border rounded"
                          />
                          <Field
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="name"
                            placeholder="Name"
                            className="mr-2 p-2 border rounded"
                          />
                          <Field
                            id="mobilenumber"
                            name="mobilenumber"
                            type="tel"
                            autoComplete='tel'
                            placeholder="Mobile Number"
                            className="mr-2 p-2 border rounded"
                          />
                          <Field
                            id="email"
                            name="email"
                            type="email"
                            autoComplete='email'
                            placeholder="Email"
                            className="mr-2 p-2 border rounded"
                          />
                        </div>
                      </div>

                      <div className="mt-8">
                        <h2 className="text-lg font-semibold mb-2">Product Information (SKU)</h2>
                        <FieldArray name="skus">
                          {
                            (fieldArrayProps) => {
                              return (
                                <div>
                                  {values.skus.map((sku, index) => (
                                    <div key={index} className="flex flex-col lg:flex-row lg:items-center mb-4 gap-2">
                                      <Field
                                        type="text"
                                        name={`skus.${index}.sku`}
                                        id={`skus.${index}.sku`}
                                        placeholder="Enter SKU"
                                        className="mr-2 p-2 border rounded"
                                      />
                                      <Field
                                        type="number"
                                        name={`skus.${index}.amount`}
                                        id={`skus.${index}.amount`}
                                        min={0}
                                        placeholder="Price"
                                        className="mr-2 p-2 border rounded"
                                      />
                                      <Field
                                        type="number"
                                        name={`skus.${index}.quantity`}
                                        id={`skus.${index}.quantity`}
                                        min={0}
                                        placeholder="Quantity"
                                        className="mr-2 p-2 border rounded"
                                      />
                                      <div className="mr-2 p-2 border rounded min-w-[12.5rem]">
                                        {
                                          sku.amount && sku.quantity ? <p>{sku.amount * sku.quantity}</p> : <p className="text-gray-400">Total Price</p>
                                        }
                                      </div>
                                      <div>
                                        <TrashIcon
                                          className="h-4 w-4 cursor-pointer"
                                          onClick={() => fieldArrayProps.remove(index)} />
                                      </div>
                                    </div>
                                  ))}
                                  <Button
                                    type="button"
                                    className="py-2 px-3 w-36"
                                    onClick={() => fieldArrayProps.insert(values.skus.length + 1, {})}
                                    variant="outlined"
                                  >
                                    <div className="flex items-center">
                                      <PlusIcon className="h-5 w-5" />
                                      <p className="ml-2">Add Product</p>
                                    </div>
                                  </Button>
                                </div>
                              )
                            }
                          }
                        </FieldArray>
                        <div className="mt-6 flex flex-col lg:flex-row gap-2 items-center">
                          <Button
                            className="mr-4 bg-gray-600 w-36"
                            onClick={() => resetForm()}
                          >
                            Reset
                          </Button>
                          <Button
                            type="submit"
                            color="green"
                            className="mr-4 w-36"
                            variant="gradient"
                          >
                            Submit
                          </Button>
                          <Link to="/dashboard/orders">
                            <Button
                              variant="gradient"
                              className="mr-4 w-36"
                            >
                              Go to Orders
                            </Button>
                          </Link>

                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </div>
      }


    </>
  );
}

export default Office;
