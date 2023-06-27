import React from "react";
import { Card, Metric, Text, Flex, BadgeDelta, Grid, Icon } from "@tremor/react";
import { CashIcon, TicketIcon, UserGroupIcon } from "@heroicons/react/solid";

const TutorMetric = () => {
  const colors = {
    increase: "emerald",
    moderateIncrease: "emerald",
    unchanged: "orange",
    moderateDecrease: "rose",
    decrease: "rose",
  };

  const categories = [
    {
      title: "Sales",
      icon: TicketIcon,
      metric: "$ 12,699",
      metricPrev: "$ 9,456",
      delta: "34.3%",
      deltaType: "moderateIncrease",
    },
    {
      title: "Profit",
      icon: CashIcon,
      metric: "$ 40,598",
      metricPrev: "$ 45,564",
      delta: "10.9%",
      deltaType: "moderateDecrease",
    },
    {
      title: "Customers",
      icon: UserGroupIcon,
      metric: "1,072",
      metricPrev: "856",
      delta: "25.3%",
      deltaType: "moderateDecrease",
    },
  ];

  const calculateDeltaType = (item) => {
    if (parseFloat(item.metricPrev.replace(/[^0-9.-]+/g, "")) > parseFloat(item.metric.replace(/[^0-9.-]+/g, ""))) {
      return "moderateDecrease";
    } else {
      return "moderateIncrease";
    }
  };

  return (
    <div className="flex justify-center">
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6 mt-12 w-4/5">
        {categories.map((item) => (
          <Card key={item.title}>
            <Icon icon={item.icon} variant="light" size="sm" color="violet" />
            <Text className="mt-3">{item.title}</Text>
            <Flex justifyContent="start" alignItems="baseline" className="truncate space-x-3">
              <Metric>{item.metric}</Metric>
              <Text className="truncate">from {item.metricPrev}</Text>
            </Flex>
            <Flex justifyContent="start" className="space-x-2 mt-4">
              <BadgeDelta deltaType={calculateDeltaType(item)} />
              <Flex justifyContent="start" className="space-x-1 truncate">
                <Text color={colors[calculateDeltaType(item)]}>{item.delta}</Text>
                <Text className="truncate">to previous month</Text>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Grid>
    </div>
  );
};

export default TutorMetric;