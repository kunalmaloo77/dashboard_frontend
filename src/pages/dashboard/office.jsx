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
  IconButton,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { Field, FieldArray, Form, Formik } from "formik";
import axios from "axios";
import { useState } from "react";

export function Office() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  let today = new Date();

  let dd = today.getDate();
  let mm = today.getMonth() + 1;

  let yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  today = dd + '/' + mm + '/' + yyyy;

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
        const res = await axios.post('https://dashboard-backend-tw3m.onrender.com/clients', flattenedData[i]);
        console.log(res.data);
      }
      setMessage("Order Placed Successfully");
      handleOpen();
    } catch (error) {
      if (error.response.status === 409) {
        console.log("Client Already exists", error);
        setMessage(error.response.data.error);
      }
      else {
        console.log("Registration error:", error);
      }
    }
    setLoading(false)
  }
  const handleOpen = () => {
    setOpen(!open);
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
                <div className="w-96">
                  <Tabs value="app">
                    <TabsHeader>
                      <Tab value="app">
                        <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                        App
                      </Tab>
                      <Tab value="message">
                        <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                        Message
                      </Tab>
                      <Tab value="settings">
                        <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                        Settings
                      </Tab>
                    </TabsHeader>
                  </Tabs>
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
                        <div className="flex mb-4">
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
                        <h2 className="text-lg font-semibold mb-2">SKU Information</h2>
                        <FieldArray name="skus">
                          {
                            (fieldArrayProps) => {
                              return (
                                <div>
                                  {values.skus.map((sku, index) => (
                                    <div key={index} className="flex mb-4">
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
                                      <div className="mr-2 p-2 border rounded w-48">
                                        {
                                          sku.amount && sku.quantity ? <p>{sku.amount * sku.quantity}</p> : <p className="text-gray-400">Total Price</p>
                                        }
                                      </div>
                                      <Button
                                        onClick={() => fieldArrayProps.remove(index)}
                                        color="red"
                                      >
                                        Delete
                                      </Button>
                                    </div>
                                  ))}
                                  <Button
                                    type="button"
                                    onClick={() => fieldArrayProps.insert(values.skus.length + 1, {})}
                                    color="blue"
                                  >
                                    Add Product
                                  </Button>
                                </div>
                              )
                            }
                          }
                        </FieldArray>
                        <div className="mt-8">
                          <Button
                            color="blue-gray"
                            className="mr-4"
                            onClick={() => resetForm()}
                          >
                            Clear Form
                          </Button>
                          <Button
                            type="submit"
                            color="green"
                            variant="gradient"
                          >
                            Submit
                          </Button>

                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
              <Dialog open={open} handler={handleOpen}>
                <DialogBody>
                  <h1 className="flex m-auto">{message}</h1>
                </DialogBody>
              </Dialog>
            </CardBody>
          </Card></div>
      }


    </>
  );
}

export default Office;
