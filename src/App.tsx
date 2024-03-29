import React, { useState, useEffect } from 'react';
import CurrencyCheckbox from './CurrencyCheckbox';
import DateInputs from './DateInputs';
import ChartRenderer from './ChartRenderer';
import { getDates, formatDate } from './utils';
import axios from 'axios';
import './App.css';
import { ChartData } from './types';

const App: React.FC = () => {
  const [currencies, setCurrencies] = useState<string[]>(['eur', 'usd', 'cny']);
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000),
  );
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [apiRequests, setApiRequests] = useState<number>(0);
  const [chartData, setChartData] = useState<ChartData>();

  useEffect(() => {
    const fetchDataAndRenderChart = async () => {
      const dates = getDates(startDate, endDate);
      const filteredDates = dates.filter((date, index) => index % 3 === 0 || dates.length <= 21);

      const chartData = {
        labels: filteredDates.map((date) => formatDate(date)),
        datasets: await Promise.all(
          currencies.map(async (currency) => {
            const dataForCurrency: number[] = [];
            for (const date of filteredDates) {
              const formattedDate = formatDate(date);
              try {
                const response = await axios.get(
                  `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${formattedDate}/v1/currencies/${currency}.json`,
                );
                if (response.data[currency] && response.data[currency].rub) {
                  dataForCurrency.push(response.data[currency].rub);
                } else {
                  console.error(`No data found for currency ${currency} on date ${formattedDate}`);
                }
              } catch (error) {
                console.error(
                  `Error fetching data for currency ${currency} on date ${formattedDate}:`,
                  error,
                );
              }
            }
            return {
              label: currency,
              data: dataForCurrency,
              borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
                Math.random() * 256,
              )}, ${Math.floor(Math.random() * 256)}, 1)`,
              borderWidth: 1,
            };
          }),
        ),
      };
      setChartData(chartData);
      setApiRequests(apiRequests + 1);
    };

    fetchDataAndRenderChart();
  }, [currencies, startDate, endDate]);

  const handleCheckboxChange = (currency: string) => {
    if (currencies.includes(currency)) {
      setCurrencies(currencies.filter((curr) => curr !== currency));
    } else {
      setCurrencies([...currencies, currency]);
    }
  };

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(new Date(event.target.value));
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(new Date(event.target.value));
  };

  return (
    <div className="container">
      <div className="options">
        <CurrencyCheckbox currencies={currencies} handleCheckboxChange={handleCheckboxChange} />
        <DateInputs
          startDate={startDate}
          endDate={endDate}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
        />
        <div className="api_counter">Количество запросов в API: {apiRequests}</div>
      </div>
      <ChartRenderer chartData={chartData} />
    </div>
  );
};

export default App;
