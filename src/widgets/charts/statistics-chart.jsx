import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export function StatisticsChart({ color, chart, title, description, footer, data, startDate, endDate }) {
  const [chartData, setChartData] = useState({ ...chart });
  const includedStatuses = ['in-transit', 'delivered'];

  useEffect(() => {
    const updateChart = () => {
      const generateWeeklyOrderArray = (filteredData, startDate, endDate) => {
        const orderMap = {};
        filteredData.forEach(item => {
          item.forEach((ele) => {
            const { date, status } = ele._id;
            if (!status.startsWith('return') && !status.startsWith('cancel')) {
              orderMap[date] = ele.totalOrder;
            } else if (status.startsWith('return') || status.startsWith('cancel')) {
              if (!orderMap[date]) {
                orderMap[date] = 0;
              }
              orderMap[date] += ele.totalOrder;
            }
          });
        });

        const result = [];
        for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
          const dateString = date.toISOString().split('T')[0];
          result.push([dateString, orderMap[dateString] || 0]);
        }
        return result;
      };

      const newSeries = includedStatuses.map(status => {
        if (!status.startsWith('return') && !status.startsWith('cancel')) {
          const filteredData = data.filter(item => item[0]._id.status === status);
          return {
            name: status,
            data: generateWeeklyOrderArray(filteredData, startDate, endDate)
          };
        }
        return null;
      }).filter(series => series !== null);

      ['return', 'cancel'].forEach(status => {
        const filteredData = data.filter(item => item[0]._id.status.startsWith(status));
        newSeries.push({
          name: status === 'return' ? 'RTO' : 'Cancel',
          data: generateWeeklyOrderArray(filteredData, startDate, endDate)
        });
      });

      setChartData(prevChartData => ({
        ...prevChartData,
        series: newSeries,
      }));
    };

    if (data.length > 0) {
      updateChart();
    }
  }, [data]);



  return (
    <Card className="border border-blue-gray-100 shadow-sm">
      <CardHeader variant="gradient" color={color} floated={false} shadow={false}>
        <Chart {...chartData} />
      </CardHeader>
      <CardBody className="px-6 pt-0">
        <Typography variant="h6" color="blue-gray">
          {title}
        </Typography>
        <Typography variant="small" className="font-normal text-blue-gray-600">
          {description}
        </Typography>
      </CardBody>
      {footer && (
        <CardFooter className="border-t border-blue-gray-50 px-6 py-5">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

StatisticsChart.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsChart.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  chart: PropTypes.object.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsChart.displayName = "/src/widgets/charts/statistics-chart.jsx";

export default StatisticsChart;
