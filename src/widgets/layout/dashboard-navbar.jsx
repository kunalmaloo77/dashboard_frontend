import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import { axiosPublic } from "../utils/axiosInstance";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const [orderid, setOrderid] = useState("");
  const [mobileNum, setMobileNum] = useState("");
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchType, setSearchType] = useState(null);

  const handleMobileSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosPublic.get(`/clients/mobilenumber/${mobileNum}`);
      setData(res.data);
      setSearchType("mobile");
      handleOpen();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const encodedOrderid = encodeURIComponent(orderid);
      const res = await axiosPublic.get(`/clients/${encodedOrderid}`);
      setData(res.data);
      setSearchType("order");
      handleOpen();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setOrderid(e.target.value);
  };

  const handleMobileChange = (e) => {
    setMobileNum(e.target.value);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
            <form onSubmit={handleMobileSearch}>
              <div className="relative flex w-full">
                <Input
                  type="text"
                  label="Mobile Number"
                  value={mobileNum}
                  onChange={handleMobileChange}
                  className="pr-20"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="!absolute right-1 top-1 rounded"
                >
                  <MagnifyingGlassIcon className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          <div className="mr-auto md:mr-4 md:w-56">
            <form onSubmit={handleSearch}>
              <div className="relative flex w-full">
                <Input
                  type="text"
                  label="OrderId"
                  value={orderid}
                  onChange={handleChange}
                  className="pr-20"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="!absolute right-1 top-1 rounded"
                >
                  <MagnifyingGlassIcon className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          <Link to="/auth/sign-in">
            <Button
              variant="text"
              color="blue-gray"
              className="hidden items-center gap-1 px-4 normal-case xl:flex"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              Sign In
            </Button>
            <IconButton
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            </IconButton>
          </Link>
          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <BellIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem className="flex items-center gap-3">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New message</strong> from Laur
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New album</strong> by Travis Scott
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 1 day ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                  <CreditCardIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    Payment successfully completed
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 2 days ago
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
        </div>
      </div>
      <Dialog
        open={open}
        size={searchType === "mobile" ? "xl" : "sm"}
        handler={handleOpen}
      >
        <DialogHeader>Client Details</DialogHeader>
        <DialogBody>
          {data ? (
            searchType === "mobile" ? (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse rounded-md border border-gray-200 bg-white shadow-md">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border-b border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Order ID
                      </th>
                      <th className="border-b border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Name
                      </th>
                      <th className="border-b border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Sku
                      </th>
                      <th className="border-b border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Channel Name
                      </th>
                      <th className="border-b border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Quantity
                      </th>
                      <th className="border-b border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Status
                      </th>
                      <th className="border-b border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Amount
                      </th>
                      <th className="border-b border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Total Amount
                      </th>
                      <th className="border-b border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Postal Code
                      </th>
                      <th className="border-b border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                        City
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-gray-100`}
                      >
                        <td className="border-b px-4 py-3 text-sm text-gray-600">
                          {item.orderid}
                        </td>
                        <td className="border-b px-4 py-3 text-sm text-gray-600">
                          {item.name}
                        </td>
                        <td className="border-b px-4 py-3 text-sm text-gray-600">
                          {item.sku}
                        </td>
                        <td className="border-b px-4 py-3 text-sm text-gray-600">
                          {item.channelname}
                        </td>
                        <td className="border-b px-4 py-3 text-sm text-gray-600">
                          {item.quantity}
                        </td>
                        <td className="border-b px-4 py-3 text-sm text-gray-600">
                          {item.status}
                        </td>
                        <td className="border-b px-4 py-3 text-sm text-gray-600">
                          {item.amount}
                        </td>
                        <td className="border-b px-4 py-3 text-sm text-gray-600">
                          {item.totalamount}
                        </td>
                        <td className="border-b px-4 py-3 text-sm text-gray-600">
                          {item.postalcode}
                        </td>
                        <td className="border-b px-4 py-3 text-sm text-gray-600">
                          {item.city}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <>
                <p>Name: {data.name}</p>
                <p>Sku: {data.sku}</p>
                <p>Channel Name: {data.channelname}</p>
                <p>Quantity: {data.quantity}</p>
                <p>Status: {data.status}</p>
                <p>Amount: {data.amount}</p>
                <p>Total Amount: {data.totalamount}</p>
                <p>Postal Code: {data.postalcode}</p>
                <p>City: {data.city}</p>
                {data.email && <p>Email: {data.email}</p>}
                {data.address && <p>Address: {data.address}</p>}
                {data.mobilenumber && <p>Mobile Number: {data.mobilenumber}</p>}
              </>
            )
          ) : (
            <p className="py-4 text-center text-gray-500">No data available.</p>
          )}
        </DialogBody>
        <DialogFooter>
          <Button color="red" onClick={handleOpen}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
