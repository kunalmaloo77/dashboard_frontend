import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Orders, Notifications,Shipped,Rto, Delivered } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

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
        icon: <TableCellsIcon {...icon} />,
        name: "Orders",
        path: "/orders",
        element: <Orders />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Shipped",
        path: "/shipped",
        element: <Shipped />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Delivered",
        path: "/delivered",
        element: <Delivered />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "RTO",
        path: "/rto",
        element: <Rto />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Office",
        path: "/notifications",
        element: <Notifications />,
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
