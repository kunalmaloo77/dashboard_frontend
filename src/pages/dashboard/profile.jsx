import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Dialog,
  DialogBody,
  IconButton,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import axios from "axios";
import { useParams } from "react-router-dom";

export function Profile() {
  // const API_KEY = '65b3525fcfda1046190673akpe8307d'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  // const latitudeRef = useRef(null);
  // const longitudeRef = useRef(null);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const currentLatitude = position.coords.latitude;
  //     const currentLongitude = position.coords.longitude;

  //     latitudeRef.current = currentLatitude;
  //     longitudeRef.current = currentLongitude;

  //     console.log(currentLatitude);
  //     console.log(currentLongitude);

  //     let API_ENDPOINT = `https://geocode.maps.co/reverse?lat=${currentLatitude}&lon=${currentLongitude}&api_key=${API_KEY}`;

  //     axios.get(API_ENDPOINT)
  //       .then((response) => {
  //         setCity(response.data.address.state_district);
  //         setState(response.data.address.state);
  //         setPincode(response.data.address.postcode);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   });
  // }, []);

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    const getLocation = async () => {
      try {
        if (pincode.length === 6) {
          const res = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
          const data = res.data[0].PostOffice[0];
          console.log(res.data[0]);
          setCity(data.District);
          setState(data.State);
          console.log('response from postal code api ->', res);
        }
      } catch (error) {
        console.log('error fetching postal code->', error);
      }
    }
    getLocation();
  }, [pincode])

  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
  }

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
    setName(res.data.name);
    setEmail(res.data.email);
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
          <div className='mx-20 max-w-[1000px] xl:mx-auto my-10'>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, actions) => {
                const updatedValues = {
                  ...values,
                  city: city,
                  state: state,
                  postalcode: pincode,
                };
                updateProduct(updatedValues);
                actions.resetForm();
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
                            Name
                          </div>
                          <div className="mt-2">
                            <div className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2">
                              {name}
                            </div>
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <div className="block text-sm font-medium leading-6 text-gray-900">
                            Email
                          </div>
                          <div className="mt-2">
                            <div className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2">
                              {email}
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
                              onChange={handlePincodeChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <div htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                            District
                          </div>
                          <div className="mt-2">
                            <div className="h-[2.25rem] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 px-2">
                              {city}
                            </div>
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <div htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                            State
                          </div>
                          <div className="mt-2">
                            <div className="h-[2.25rem] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 px-2">
                              {state}
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Button
                      color="blue-gray"
                      className="mr-4"
                    >
                      Clear
                    </Button>
                    <Button
                      type="submit"
                      color="green"
                      onClick={handleOpen} variant="gradient"
                    >
                      Place Order
                    </Button>
                  </div>
                </Form>
              )}

            </Formik>
          </div>
          <Dialog open={open} handler={handleOpen}>
            <DialogBody>
              <div className="flex flex-col items-center justify-center m-auto">
                <IconButton className="rounded-full mb-2" color="green">
                  <i className="fa solid fa-check" />
                </IconButton>
                <h1>Order Placed Successfully</h1>
              </div>
            </DialogBody>
          </Dialog>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
