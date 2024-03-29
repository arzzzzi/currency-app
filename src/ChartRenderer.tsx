import React from 'react';
import Chart from 'chart.js/auto';
import { ChartRendererProps } from './types';

const ChartRenderer: React.FC<ChartRendererProps> = ({ chartData }) => {
  const ctx = document.getElementById('currencyChart') as HTMLCanvasElement;
  const existingChart = Chart.getChart(ctx);

  if (existingChart) {
    existingChart.destroy();
  }

  new Chart(ctx, {
    type: 'line',
    data: chartData,
  });

  return (
    <div className="chart">
      <canvas id="currencyChart" width="1200" height="500"></canvas>
    </div>
  );
};

export default ChartRenderer;
