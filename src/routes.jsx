import {
  HomeIcon,
  ServerStackIcon,
  RectangleStackIcon,
  TruckIcon,
  CheckIcon,
  ShoppingBagIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { Home, Orders, Shipped, Rto, Office } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { ArrowUturnLeftIcon, BuildingOffice2Icon } from "@heroicons/react/24/outline";
import Confirmed from "./pages/dashboard/orders/Confirmed";
import WithoutAwb from "./pages/dashboard/orders/WithoutAwb";
import New from "./pages/dashboard/orders/New";
import Intransit from "./pages/dashboard/shipped/intransit";
import Delivered from "./pages/dashboard/shipped/delivered";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <ShoppingBagIcon {...icon} />,
        name: "Orders",
        path: "/orders",
        element: <Orders />,
        nestedRoutes: [
          {
            name: "New",
            value: "new",
            path: "/new",
            element: <New />,
          },
          {
            name: "WithoutAWB",
            value: "withoutawb",
            path: "/withoutawb",
            element: <WithoutAwb />,
          },
          {
            name: "Confirmed",
            value: "confirmed",
            path: "/confirmed",
            element: <Confirmed />,
          },
        ],
      },
      {
        icon: <TruckIcon {...icon} />,
        name: "Shipped",
        path: "/shipped",
        element: <Shipped />,
        nestedRoutes: [
          {
            name: "Intransit",
            value: "intransit",
            path: "/intransit",
            element: <Intransit />,
          },
          {
            name: "Delivered",
            value: "delivered",
            path: "/delivered",
            element: <Delivered />,
          }]
      },
      {
        icon: <ArrowUturnLeftIcon {...icon} />,
        name: "RTO",
        path: "/rto",
        element: <Rto />,
      },
      {
        icon: <BuildingOffice2Icon {...icon} />,
        name: "Office",
        path: "/office",
        element: <Office />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
