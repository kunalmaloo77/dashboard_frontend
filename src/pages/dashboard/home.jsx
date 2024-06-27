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

  const getData = async (startDate, endDate) => {
    try {
      const res = await axiosPublic.get('/clients/api/date', {
        params: { startDate: startDate, endDate: endDate }
      });

      const temp = Object.values(res.data.reduce((result, currentValue) => {
        const status = currentValue._id.status;

        if (!result[status]) {
          result[status] = [];
        }

        result[status].push(currentValue);
        return result;
      }, {}));
      setData(temp);
      console.log("temp->", temp);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    const today = new Date();
    const lastFifteenDays = new Date(today);
    lastFifteenDays.setDate(today.getDate() - 15);
    // const currentDayOfWeek = today.getDay();
    // const daysSinceLastMonday = (currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1) + 7;
    // const lastMonday = new Date(today);  
    // const lastSunday = new Date(today);
    // lastMonday.setDate(today.getDate() - daysSinceLastMonday);
    // lastSunday.setDate(today.getDate() - currentDayOfWeek);
    // setDates([lastMonday, lastSunday]);
    setDates([lastFifteenDays, today]);
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
        {statisticsChartsData.map((props) => (
          data.length > 0 && <StatisticsChart
            data={data}
            startDate={dates[0]}
            endDate={dates[1]}
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />

        ))}
      </div>
    </div>
  );
}

export default Home;
