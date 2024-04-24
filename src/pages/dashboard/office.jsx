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
  const initialValues = {
    clientcode: '',
    fname: '',
    lname: '',
    mobilenumber: '',
    skus: [],
  }
  const addProduct = async (product) => {
    const res = await axios.post('http://localhost:8080/clients', product);
    console.log(res.data);
  }
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
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
            onSubmit={(values) => {
              addProduct(values);
            }}
          >
            {({ values }) => (
              <Form>
                <div className="container mx-auto mt-10">
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Client Information</h2>
                    <div className="flex mb-4">
                      <Field
                        type="text"
                        name="clientcode"
                        id="clientcode"
                        autoComplete="off"
                        placeholder="Client Code"
                        className="mr-2 p-2 border rounded"
                      />
                      <Field
                        type="text"
                        name="fname"
                        id="fname"
                        autoComplete="given-name"
                        placeholder="First Name"
                        className="mr-2 p-2 border rounded"
                      />
                      <Field
                        type="text"
                        name="lname"
                        id="lname"
                        autoComplete="family-name"
                        placeholder="Last Name"
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
                      >
                        Clear Form
                      </Button>
                      <Button
                        type="submit"
                        color="green"
                        onClick={() => handleOpen("xs")} variant="gradient"
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
              <h1 className="flex m-auto">Order Generated Successfully</h1>
            </DialogBody>
          </Dialog>
        </CardBody>
      </Card>

    </>
  );
}

export default Office;
