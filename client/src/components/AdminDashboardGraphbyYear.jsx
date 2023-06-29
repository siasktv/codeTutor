import React, { useEffect, useState } from "react";
import { Card, Title, AreaChart, Metric, Flex, Text } from "@tremor/react";
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAllSessionsByTutor,
  fetchAllSessionsDataByTutor,
  fetchAllSessionsByClient,
  fetchAllSessions,
  fetchAllSessionsData,
  fetchAllSessionsDataByClient,
  fetchSession
} from '../redux/features/sessions/sessionsSlice';

const AdminDashboardGraphbyYear = () => {

  const dispatch = useDispatch();
  const allSessions = useSelector(state => state.sessions.allSessions);

  const [priceData, setPriceData] = useState([]);

  const currentMonth = new Date().getMonth() + 1;
  useEffect(() => {
    const sessionsByMonth = {};
    const currentYear = new Date().getFullYear();

    allSessions.forEach(session => {
      const { date, price } = session;
      const [day, month, year] = date.split('/');

      if (year === currentYear.toString()) {
        const monthKey = `${currentYear}-${month.toString().padStart(2, '0')}`;
        if (!sessionsByMonth[monthKey]) {
          sessionsByMonth[monthKey] = [];
        }
        sessionsByMonth[monthKey].push(price || 0);
      }
    });

    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    const prices = months.map(month => {
      const monthKey = `${currentYear}-${month.toString().padStart(2, '0')}`;
      const monthPrices = sessionsByMonth[monthKey] || [];
      const totalPrices = monthPrices.reduce((total, price) => total + price, 0);
      return totalPrices;
    });

    setPriceData(prices);
  }, [allSessions]);

  const colors = {
    increase: "emerald",
    moderateIncrease: "emerald",
    unchanged: "orange",
    moderateDecrease: "rose",
    decrease: "rose",
  };

  const totalMetric = priceData.reduce((total, record) => total + record, 0);

  const calculateDeltaPercentage = (past, current) => {
    if (past === 0) return 0;
    const difference = current - past;
    return Number.parseFloat((difference / past) * 100).toFixed(2);
  };

  const delta = calculateDeltaPercentage(priceData[currentMonth - 2], priceData[currentMonth - 1]);

  const dataFormatter = (number) => `${Intl.NumberFormat("us").format(number)}$`;

  return (
    <div className="flex justify-center">
      <Card className=" w-full  my-4 h-full ">
        <Title>Transacciones totales este año (USD)</Title>
        <Metric>{dataFormatter(totalMetric)}</Metric>
        <Flex justifyContent="start" className="space-x-1 truncate">
          <Text color={colors[delta >= 0 ? "increase" : "decrease"]}>
            {delta >= 0 ? `+${delta}%` : `${delta}%`}
          </Text>
          <Text className="truncate">con respecto al mes anterior</Text>
        </Flex>
        <AreaChart
          className="h-72 mt-4"
          data={priceData.map((price, index) => ({ month: index + 1, "Total por mes": price }))}
          index="month"
          categories={["Total por mes"]}
          colors={["violet"]}
          valueFormatter={dataFormatter}
        />
      </Card>
    </div>
  );
};

export default AdminDashboardGraphbyYear;
