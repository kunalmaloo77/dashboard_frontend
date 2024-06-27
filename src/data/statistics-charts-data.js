import { chartsConfig } from "@/configs";

const dates = getFirstAndLastDateOfLastWeek();
const lastFifteen = getLastFifteenDays();

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

      type: 'datetime'
    },
  },
};

function getLastFifteenDays() {
  const dates = [];
  const today = new Date();
  for (let i = 0; i <= 15; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    dates.push(`${day}-${month}-${year}`);
  }
  return dates.reverse();
}

function getFirstAndLastDateOfLastWeek() {
  const dates = [];
  const today = new Date();
  const lastFifteenDays = new Date(today);
  lastFifteenDays.setDate(today.getDate() - 15);
  // const dayOfWeek = today.getDay();
  // const lastMonday = new Date(today);
  // const daysToLastMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1) + 7;
  // const lastSunday = new Date(lastMonday);
  // lastSunday.setDate(lastMonday.getDate() + 6);

  const firstDay = String(lastFifteenDays.getDate()).padStart(2, '0');
  const firstMonth = String(lastFifteenDays.getMonth() + 1).padStart(2, '0');
  const firstYear = lastFifteenDays.getFullYear();

  const lastDay = String(today.getDate()).padStart(2, '0');
  const lastMonth = String(today.getMonth() + 1).padStart(2, '0');
  const lastYear = today.getFullYear();

  dates.push(`${firstDay}-${firstMonth}-${firstYear}`);
  dates.push(`${lastDay}-${lastMonth}-${lastYear}`);

  return dates;
}

export const statisticsChartsData = [
  {
    color: "white",
    title: `Date: ${dates[0]} to ${dates[1]}`,
    description: "Last 15 days Performance",
    footer: "Average Order Value",
    chart: websiteViewsChart,
  },
];

export default statisticsChartsData;
