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
  PencilIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import axios from "axios";
import { useParams } from "react-router-dom";

export function Profile() {
  const API_KEY = '65b3525fcfda1046190673akpe8307d'
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const latitudeRef = useRef(null);
  const longitudeRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const currentLatitude = position.coords.latitude;
      const currentLongitude = position.coords.longitude;

      latitudeRef.current = currentLatitude;
      longitudeRef.current = currentLongitude;

      console.log(currentLatitude);
      console.log(currentLongitude);

      let API_ENDPOINT = `https://geocode.maps.co/reverse?lat=${currentLatitude}&lon=${currentLongitude}&api_key=${API_KEY}`;

      axios.get(API_ENDPOINT)
        .then((response) => {
          setCity(response.data.address.state_district);
          setState(response.data.address.state);
          setPincode(response.data.address.postcode);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

  const initialValues = {
    address: '',
    postalcode: '',
    city: '',
    state: '',
  }
  const updateProduct = async (product) => {
    const res = await axios.patch(`http://localhost:8080/clients/${id}`, product);
    console.log(res.data);
  }
  const getClient = async () => {
    const res = await axios.get(`http://localhost:8080/clients/${id}`);
    setFname(res.data.fname);
    setLname(res.data.lname);
  }
  useEffect(() => {
    getClient();
  }, [])
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
                const updatedValues = {
                  ...values,
                  city: city,
                  state: state,
                  postalcode: pincode,
                };
                updateProduct(updatedValues);
              }}
            >
              {({ values }) => (
                <Form>
                  <div className="space-y-12">
                    <div>
                      <h2 className="text-base font-semibold leading-7 text-gray-900">Client Profile</h2>
                    </div>
                    <div className="border-b border-gray-900/10 pb-12">
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <div className="block text-sm font-medium leading-6 text-gray-900">
                            First name
                          </div>
                          <div className="mt-2">
                            <div className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2">
                              {fname}
                            </div>
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <div className="block text-sm font-medium leading-6 text-gray-900">
                            Last name
                          </div>
                          <div className="mt-2">
                            <div className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2">
                              {lname}
                            </div>
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                            Street address
                          </label>
                          <div className="mt-2">
                            <Field
                              type="text"
                              name="address"
                              id="street-address"
                              autoComplete="street-address"

                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                          <label htmlFor="postalcode" className="block text-sm font-medium leading-6 text-gray-900">
                            ZIP / Postal code
                          </label>
                          <div className="mt-2">
                            <Field
                              type="text"
                              name="postalcode"
                              id="postalcode"
                              autoComplete="postal-code"
                              value={pincode}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                            District
                          </label>
                          <div className="mt-2">
                            <Field
                              type="text"
                              name="city"
                              id="city"
                              value={city}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                            State
                          </label>
                          <div className="mt-2">
                            <Field
                              type="text"
                              name="state"
                              id="state"
                              value={state}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                            />
                          </div>
                        </div>

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

export default Profile;
