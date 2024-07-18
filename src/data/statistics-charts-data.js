import { chartsConfig } from "@/configs";

const dates = getFirstAndLastDateOfLastWeek();

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
    colors: [],
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

function getFirstAndLastDateOfLastWeek() {
  const dates = [];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 7);
  const lastFifteenDays = new Date(yesterday);
  lastFifteenDays.setDate(yesterday.getDate() - 15);
  const firstDay = String(lastFifteenDays.getDate()).padStart(2, '0');
  const firstMonth = String(lastFifteenDays.getMonth() + 1).padStart(2, '0');
  const firstYear = lastFifteenDays.getFullYear();

  const lastDay = String(yesterday.getDate()).padStart(2, '0');
  const lastMonth = String(yesterday.getMonth() + 1).padStart(2, '0');
  const lastYear = yesterday.getFullYear();

  dates.push(`${firstDay}-${firstMonth}-${firstYear}`);
  dates.push(`${lastDay}-${lastMonth}-${lastYear}`);

  return dates;
}

export const statisticsChartsData = [
  {
    color: "white",
    title: `Date: ${dates[0]} to ${dates[1]}`,
    description: "Last 15 days Performance",
    footer: "Total Orders",
    chart: websiteViewsChart,
  },
];

export default statisticsChartsData;
