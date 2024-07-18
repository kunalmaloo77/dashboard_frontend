import {
  HomeIcon,
  ServerStackIcon,
  RectangleStackIcon,
  TruckIcon,
  CheckIcon,
  ShoppingBagIcon,
  PlusIcon,
  KeyIcon,
} from "@heroicons/react/24/solid";
import { Home, Orders, Shipped, Rto, Office } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { ArrowUturnLeftIcon, BuildingOffice2Icon } from "@heroicons/react/24/outline";
import Confirmed from "./pages/dashboard/orders/Confirmed";
import WithoutAwb from "./pages/dashboard/orders/WithoutAwb";
import New from "./pages/dashboard/orders/New";
import Intransit from "./pages/dashboard/shipped/intransit";
import Delivered from "./pages/dashboard/shipped/delivered";
import RtoIntransit from "./pages/dashboard/rto/RtoIntransit";
import RtoDelivered from "./pages/dashboard/rto/RtoDelivered";
import RtoRecieved from "./pages/dashboard/rto/RtoRecieved";
import Sku from "./pages/dashboard/sku";
import { Navigate } from "react-router-dom";

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
        icon: <BuildingOffice2Icon {...icon} />,
        name: "Manual Order",
        path: "/office",
        element: <Office />,
      },
      {
        icon: <ShoppingBagIcon {...icon} />,
        name: "Orders",
        path: "/orders/*",
        element: <Orders />,
        nestedRoutes: [
          {
            name: "New",
            value: "new",
            path: "new",
            element: <New />,
          },
          {
            name: "Confirmed",
            value: "confirmed",
            path: "confirmed",
            element: <WithoutAwb />,
          },
          {
            name: "Ready to Ship",
            value: "ready-to-ship",
            path: "ready-to-ship",
            element: <Confirmed />,
          },
          {
            path: "*",
            element: <Navigate to="new" replace />,
          },
        ],
      },
      {
        icon: <TruckIcon {...icon} />,
        name: "Shipped",
        path: "/shipped/*",
        element: <Shipped />,
        nestedRoutes: [
          {
            name: "Intransit",
            value: "intransit",
            path: "intransit",
            element: <Intransit />,
          },
          {
            name: "Delivered",
            value: "delivered",
            path: "delivered",
            element: <Delivered />,
          },
          {
            path: "*",
            element: <Navigate to="intransit" replace />,
          },
        ]
      },
      {
        icon: <ArrowUturnLeftIcon {...icon} />,
        name: "RTO",
        path: "/rto/*",
        element: <Rto />,
        nestedRoutes: [
          {
            name: "Return Intransit",
            value: "rtointransit",
            path: "rtointransit",
            element: <RtoIntransit />,
          },
          {
            name: "Return Delivered",
            value: "rtodelivered",
            path: "rtodelivered",
            element: <RtoDelivered />,
          },
          {
            name: "Return Recieved",
            value: "rtorecieved",
            path: "rtorecieved",
            element: <RtoRecieved />,
          },
          {
            path: "*",
            element: <Navigate to="rtointransit" replace />,
          },
        ]
      },
      {
        icon: <KeyIcon {...icon} />,
        name: "SKU",
        path: "/skumapping",
        element: <Sku />,
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
