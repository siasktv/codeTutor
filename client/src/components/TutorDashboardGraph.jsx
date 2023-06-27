import React from "react";
import { Card, Title, AreaChart, Metric, Flex, Text } from "@tremor/react";

const TutorDashboardGraph = () => {
  const colors = {
    increase: "emerald",
    moderateIncrease: "emerald",
    unchanged: "orange",
    moderateDecrease: "rose",
    decrease: "rose",
  };

  const chartdata = [
    {
      day: "1",
      "Mes pasado": 2890,
      "Mes actual": 2338,
    },
    {
      day: "2",
      "Mes pasado": 2756,
      "Mes actual": 2103,
    },
    {
      day: "3",
      "Mes pasado": 3322,
      "Mes actual": 2194,
    },
    {
      day: "4",
      "Mes pasado": 3470,
      "Mes actual": 2108,
    },
    {
      day: "5",
      "Mes pasado": 3475,
      "Mes actual": 1812,
    },
    {
      day: "6",
      "Mes pasado": 3129,
      "Mes actual": 1726,
    },
  ];

  const currentMonth = new Date().getMonth() + 1;

  const totalMetric = chartdata.reduce((total, record) => {
    if (record["Mes actual"]) {
      total += record["Mes actual"];
    }
    return total;
  }, 0);

  const calculateDeltaPercentage = (past, current) => {
    if (past === 0) return 0;
    const difference = current - past;
    return ((difference / past) * 100).toFixed(2);
  };

  const delta = calculateDeltaPercentage(
    chartdata[0]["Mes pasado"],
    chartdata[0]["Mes actual"]
  );

  const dataFormatter = (number) =>
    `${Intl.NumberFormat("us").format(number).toString()}$`;

  return (
    <div className="flex justify-center">
      <Card className="w-4/5 my-16">
        <Title>Ganancias totales (USD)</Title>
        <Metric>{dataFormatter(totalMetric)}</Metric>
        <Flex justifyContent="start" className="space-x-1 truncate">
          <Text color={colors[delta >= 0 ? "increase" : "decrease"]}>
            {delta}%
          </Text>
          <Text className="truncate">to previous month</Text>
        </Flex>
        <AreaChart
          className="h-72 mt-4"
          data={chartdata}
          index="day"
          categories={["Mes pasado", "Mes actual"]}
          colors={["cyan", "violet"]}
          valueFormatter={dataFormatter}
        />
      </Card>
    </div>
  );
};

export default TutorDashboardGraph;
