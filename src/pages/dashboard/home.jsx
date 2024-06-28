import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
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

export function Home() {
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [delivered, setDelivered] = useState(0);
  const [returned, setReturned] = useState(0);

  const getData = async (startDate, endDate) => {
    try {
      let returnedOrder = 0;
      let deliveredOrder = 0;
      setLoading(true);
      const res = await axiosPublic.get('/clients/api/date', {
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

  useEffect(() => {
    const yesterday = new Date();
    const lastFifteenDays = new Date(yesterday);
    yesterday.setDate(yesterday.getDate() - 1);
    lastFifteenDays.setDate(yesterday.getDate() - 15);
    setDates([lastFifteenDays, yesterday]);
  }, []);

  useEffect(() => {
    if (dates.length === 2 && dates[0] instanceof Date && dates[1] instanceof Date) {
      getData(dates[0], dates[1]);
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
        {
          loading ?
            <div className="flex flex-col h-96">
              <div className='grow flex space-x-2 justify-center items-center dark:invert'>
                <span className='sr-only'>Loading...</span>
                <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
              </div>
            </div> :
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
