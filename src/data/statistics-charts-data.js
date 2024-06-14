import { chartsConfig } from "@/configs";

const websiteViewsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Orders",
      data: [50, 20, 10, 22, 50, 10, 40],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#388e3c",
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

const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#0288d1"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
};

const completedTaskChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#388e3c"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
};
const completedTasksChart = {
  ...completedTaskChart,
  series: [
    {
      name: "Tasks",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
    },
  ],
};

function getFirstAndLastDateOfLastWeek() {
  const dates = [];
  const today = new Date();
  
  // Get the previous Monday
  const dayOfWeek = today.getDay();
  const lastMonday = new Date(today);
  const daysToLastMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1) + 7; // If today is Sunday (0), go back 6 days; otherwise, go back dayOfWeek + 7 days

  lastMonday.setDate(today.getDate() - daysToLastMonday);

  // Get the previous Sunday
  const lastSunday = new Date(lastMonday);
  lastSunday.setDate(lastMonday.getDate() + 6);

  // Format the last Monday (first date of last week)
  const firstDay = String(lastMonday.getDate()).padStart(2, '0');
  const firstMonth = String(lastMonday.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const firstYear = lastMonday.getFullYear();

  // Format the last Sunday (last date of last week)
  const lastDay = String(lastSunday.getDate()).padStart(2, '0');
  const lastMonth = String(lastSunday.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const lastYear = lastSunday.getFullYear();

  // Push the formatted dates
  dates.push(`${firstDay}-${firstMonth}-${firstYear}`);
  dates.push(`${lastDay}-${lastMonth}-${lastYear}`);

  return dates;
}

const dates = getFirstAndLastDateOfLastWeek()
export const statisticsChartsData = [
  {
    color: "white",
    title: `Date: ${dates[0]} to ${dates[1]}`,
    description: "Last Week Performance",
    footer: "Average Order Value",
    chart: websiteViewsChart,
  },
  {
    color: "white",
    title: "Daily Sales",
    description: "15% increase in today sales",
    footer: "updated 4 min ago",
    chart: dailySalesChart,
  },
  {
    color: "white",
    title: "Completed Tasks",
    description: "Last Campaign Performance",
    footer: "just updated",
    chart: completedTasksChart,
  },
];

export default statisticsChartsData;
