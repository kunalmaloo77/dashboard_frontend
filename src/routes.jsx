import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  TruckIcon,
  CheckIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { Home, Orders, Shipped, Rto, Delivered, Office } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { ArrowUturnLeftIcon, BuildingOffice2Icon } from "@heroicons/react/24/outline";

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
      },
      {
        icon: <TruckIcon {...icon} />,
        name: "Shipped",
        path: "/shipped",
        element: <Shipped />,
      },
      {
        icon: <CheckIcon {...icon} />,
        name: "Delivered",
        path: "/delivered",
        element: <Delivered />,
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
