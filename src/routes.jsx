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
import RtoIntransit from "./pages/dashboard/rto/RtoIntransit";
import RtoDelivered from "./pages/dashboard/rto/RtoDelivered";
import RtoRecieved from "./pages/dashboard/rto/RtoRecieved";

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
            name: "Delivery",
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
        nestedRoutes: [
          {
            name: "Return Intransit",
            value: "rtointransit",
            path: "/rtointransit",
            element: <RtoIntransit />,
          },
          {
            name: "Return Delivered",
            value: "rtodelivered",
            path: "/rtodelivered",
            element: <RtoDelivered />,
          },
          {
            name: "Return Recieved",
            value: "rtorecieved",
            path: "/rtorecieved",
            element: <RtoRecieved />,
          }
        ]
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
