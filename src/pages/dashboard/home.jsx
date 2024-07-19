import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  List,
  ListItem,
  ListItemPrefix,
  Radio,
} from "@material-tailwind/react";
import {
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  ordersOverviewData,
} from "@/data";
import { ClockIcon } from "@heroicons/react/24/solid";
import { axiosPublic } from "@/widgets/utils/axiosInstance";
import Loader from "@/widgets/utils/loader";

export function Home() {
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [delivered, setDelivered] = useState(0);
  const [returned, setReturned] = useState(0);

  const getData = async (startDate, endDate, type) => {
    try {
      let returnedOrder = 0;
      let deliveredOrder = 0;
      setLoading(true);
      const res = await axiosPublic.get(`/clients/api/date/${type}`, {
        params: { startDate: startDate, endDate: endDate }
      });
      const temp = Object.values(res.data.reduce((result, currentValue) => {
        const status = currentValue._id.status;
        if (currentValue._id.status.includes('return')) {
          returnedOrder += currentValue.totalOrder;
        }
        if (currentValue._id.status == 'delivered') {
          deliveredOrder += currentValue.totalOrder;
        }
        if (!result[status]) {
          result[status] = [];
        }

        result[status].push(currentValue);
        return result;
      }, {}));
      setData(temp);
      setReturned(returnedOrder);
      setDelivered(deliveredOrder);
      console.log("temp->", temp);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleSelectionChange = async (e) => {
    const selectedValue = e.target.value
    console.log(`Request triggered for: ${selectedValue}`);
    if (selectedValue === 'shopify') {
      getData(dates[0], dates[1], "shopify");
    } else if (selectedValue === 'dealshunter') {
      getData(dates[0], dates[1], "dealshunter");
    } else if (selectedValue === 'pagazo') {
      getData(dates[0], dates[1], "pagazo");
    } else {
      getData(dates[0], dates[1], "all");
    }
  }

  useEffect(() => {
    const today = new Date();
    const sevenDaysFromToday = new Date(today);
    sevenDaysFromToday.setDate(today.getDate() - 7);

    const fifteenDaysBeforeSevenDaysFromToday = new Date(sevenDaysFromToday);
    fifteenDaysBeforeSevenDaysFromToday.setDate(sevenDaysFromToday.getDate() - 15);

    setDates([fifteenDaysBeforeSevenDaysFromToday, sevenDaysFromToday]);
  }, []);

  useEffect(() => {
    if (dates.length === 2 && dates[0] instanceof Date && dates[1] instanceof Date) {
      getData(dates[0], dates[1], "all");
    }
  }, [dates]);

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-6">
        <Card className="w-full max-w-[40rem] mb-6">
          <List className="flex-row">
            <ListItem className="p-0">
              <label
                htmlFor="horizontal-list-all"
                className="flex w-full cursor-pointer items-center px-3 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Radio
                    value="all"
                    name="horizontal-list"
                    id="horizontal-list-all"
                    ripple={false}
                    className="hover:before:opacity-0"
                    onChange={handleSelectionChange}
                    containerProps={{
                      className: "p-0",
                    }}
                    defaultChecked={true}
                  />
                </ListItemPrefix>
                <Typography
                  color="blue-gray"
                  className="font-medium text-blue-gray-400"
                >
                  All
                </Typography>
              </label>
            </ListItem>
            <ListItem className="p-0">
              <label
                htmlFor="horizontal-list-shopify"
                className="flex w-full cursor-pointer items-center px-3 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Radio
                    name="horizontal-list"
                    value="shopify"
                    id="horizontal-list-shopify"
                    ripple={false}
                    onChange={handleSelectionChange}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography
                  color="blue-gray"
                  className="font-medium text-blue-gray-400"
                >
                  Shopify
                </Typography>
              </label>
            </ListItem>
            <ListItem className="p-0">
              <label
                htmlFor="horizontal-list-dealshunter"
                className="flex w-full cursor-pointer items-center px-3 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Radio
                    name="horizontal-list"
                    id="horizontal-list-dealshunter"
                    ripple={false}
                    value="dealshunter"
                    className="hover:before:opacity-0"
                    onChange={handleSelectionChange}
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography
                  color="blue-gray"
                  className="font-medium text-blue-gray-400"
                >
                  Deals Hunter
                </Typography>
              </label>
            </ListItem>
            <ListItem className="p-0">
              <label
                htmlFor="horizontal-list-pagazo"
                className="flex w-full cursor-pointer items-center px-3 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Radio
                    name="horizontal-list"
                    onChange={handleSelectionChange}
                    id="horizontal-list-pagazo"
                    ripple={false}
                    value="pagazo"
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography
                  color="blue-gray"
                  className="font-medium text-blue-gray-400"
                >
                  Pagazo
                </Typography>
              </label>
            </ListItem>
          </List>
        </Card>

        {
          loading ?
            <Loader />
            :
            statisticsChartsData.map((props) => (
              data.length > 0 && <StatisticsChart
                data={data}
                startDate={dates[0]}
                endDate={dates[1]}
                key={props.title}
                {...props}
                footer={
                  <div className="flex gap-2">
                    <Typography
                      variant="h6"
                      className="flex items-center"
                    >
                      Delivered Percentage = {((delivered / (delivered + returned)) * 100).toFixed(2)} %
                    </Typography>
                    <Typography
                      variant="h6"
                      className="flex items-center"
                    >
                      Return percentage = {((returned / (delivered + returned)) * 100).toFixed(2)} %
                    </Typography>
                  </div>
                }
              />
            ))
        }
      </div>
    </div>
  );
}

export default Home;
