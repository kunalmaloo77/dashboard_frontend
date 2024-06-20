import { chartsConfig } from "@/configs";

const dates = getFirstAndLastDateOfLastWeek()

const websiteViewsChart = {
  type: "bar",
  height: 520,
  stacked: "true",
  series: [],
  options: {
    ...chartsConfig,
    chart: {
      type: "bar",
      height: 220,
      stacked: true,
    },
    colors: ["#388e3c", "#fbc02d", "#1976d2", "#32E5BA"],
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["M", "T", "W", "T", "F", "S", "S"],
    },
  },
};

function getFirstAndLastDateOfLastWeek() {
  const dates = [];
  const today = new Date();

  const dayOfWeek = today.getDay();
  const lastMonday = new Date(today);
  const daysToLastMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1) + 7;

  lastMonday.setDate(today.getDate() - daysToLastMonday);

  const lastSunday = new Date(lastMonday);
  lastSunday.setDate(lastMonday.getDate() + 6);

  const firstDay = String(lastMonday.getDate()).padStart(2, '0');
  const firstMonth = String(lastMonday.getMonth() + 1).padStart(2, '0');
  const firstYear = lastMonday.getFullYear();

  const lastDay = String(lastSunday.getDate()).padStart(2, '0');
  const lastMonth = String(lastSunday.getMonth() + 1).padStart(2, '0');
  const lastYear = lastSunday.getFullYear();

  dates.push(`${firstDay}-${firstMonth}-${firstYear}`);
  dates.push(`${lastDay}-${lastMonth}-${lastYear}`);

  return dates;
}

export const statisticsChartsData = [
  {
    color: "white",
    title: `Date: ${dates[0]} to ${dates[1]}`,
    description: "Last Week Performance",
    footer: "Average Order Value",
    chart: websiteViewsChart,
  },
];

export default statisticsChartsData;
