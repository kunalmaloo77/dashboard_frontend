import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { Field, FieldArray, Form, Formik } from "formik";
import axios from "axios";

export function Notifications() {
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
                  Richard Davis
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
          <div className='mx-20 max-w-[1000px] xl:mx-auto my-10'>
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => {
                addProduct(values);
              }}
            >
              {({ values }) => (
                <Form>
                  <div className="space-y-12">
                    <div>
                      <h2 className="text-base font-semibold leading-7 text-gray-900">Client Profile</h2>

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                          <label htmlFor="clientcode" className="block text-sm font-medium leading-6 text-gray-900">
                            Client Code
                          </label>
                          <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <Field
                                type="text"
                                name="clientcode"
                                id="clientcode"
                                autoComplete="off"
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder=" Write your code here"
                              />
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                    <div className="border-b border-gray-900/10 pb-12">
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label htmlFor="fname" className="block text-sm font-medium leading-6 text-gray-900">
                            First name
                          </label>
                          <div className="mt-2">
                            <Field
                              type="text"
                              name="fname"
                              id="fname"
                              autoComplete="given-name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                            Last name
                          </label>
                          <div className="mt-2">
                            <Field
                              type="text"
                              name="lname"
                              id="last-name"
                              autoComplete="family-name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="mobilenumber" className="block text-sm font-medium leading-6 text-gray-900">
                            Mobile Number
                          </label>
                          <div className="mt-2">
                            <Field
                              id="mobilenumber"
                              name="mobilenumber"
                              type="tel"
                              autoComplete='tel'
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                            />
                          </div>
                        </div>

                        <FieldArray name="skus">
                          {
                            (fieldArrayProps) => {
                              return (
                                <div>
                                  {values.skus.map((sku, index) => (
                                    <div key={index}>
                                      <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor={`skus.${index}.sku`} className="block text-sm font-medium leading-6 text-gray-900">
                                          SKU
                                        </label>
                                        <div className="mt-2">
                                          <Field
                                            type="text"
                                            name={`skus.${index}.sku`}
                                            id={`skus.${index}.sku`}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                          />
                                        </div>
                                      </div>
                                      <div className="sm:col-span-2">
                                        <label htmlFor={`skus.${index}.quantity`} className="block text-sm font-medium leading-6 text-gray-900">
                                          Quantity
                                        </label>
                                        <div className="mt-2">
                                          <Field
                                            type="number"
                                            name={`skus.${index}.quantity`}
                                            id={`skus.${index}.quantity`}

                                            min={0}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                          />
                                        </div>
                                      </div>
                                      <div className="sm:col-span-2">
                                        <label htmlFor={`skus.${index}.amount`} className="block text-sm font-medium leading-6 text-gray-900">
                                          Amount
                                        </label>
                                        <div className="mt-2">
                                          <Field
                                            type="number"
                                            name={`skus.${index}.amount`}
                                            id={`skus.${index}.amount`}
                                            min={0}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                          />
                                        </div>
                                      </div>
                                      <div className="sm:col-span-2">
                                        <div htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                                          Total Amount
                                        </div>
                                        <div className="mt-2">
                                          <div className='block w-full h-9 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6 px-2'>
                                            <p>{sku.amount * sku.quantity}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                  <div className="sm:col-span-2 sm:col-start-1 mt-6">
                                    <button
                                      type="button"
                                      onClick={() => fieldArrayProps.insert(values.skus.length + 1, {})}
                                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                      ADD SKU
                                    </button>
                                  </div>
                                </div>)
                            }
                          }
                        </FieldArray>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Generate Order ID
                    </button>
                  </div>
                </Form>
              )}

            </Formik>
          </div>
        </CardBody>
      </Card>

    </>
  );
}

export default Notifications;
