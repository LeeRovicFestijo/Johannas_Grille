import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AreaLineChart = () => {
  const [data, setData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Default: Current month

  useEffect(() => {
    const generateMockData = () => {
      const mockData = [];
      const hours = Array.from({ length: 24 }, (_, i) => i); // 0 to 23 hours
      const startOfYear = new Date(new Date().getFullYear(), 0, 1);

      for (let i = 0; i < 365; i++) {
        const date = new Date(startOfYear);
        date.setDate(startOfYear.getDate() + i);

        const peakHour = hours[Math.floor(Math.random() * hours.length)];
        mockData.push({ date, peakHour });
      }

      return mockData;
    };

    const allData = generateMockData();

    // Filter for the selected month
    const filteredData = allData.filter(
      (d) => d.date.getMonth() === selectedMonth && d.date.getFullYear() === new Date().getFullYear()
    );

    // Group data by week
    const weeklyData = [];
    filteredData.forEach((entry) => {
      const weekNumber = Math.ceil(entry.date.getDate() / 7);
      if (!weeklyData[weekNumber]) {
        weeklyData[weekNumber] = [];
      }
      weeklyData[weekNumber].push(entry.peakHour);
    });

    // Calculate average peak hour per week
    const weeklyPeakHours = weeklyData.map(
      (hours) => hours.reduce((sum, hour) => sum + hour, 0) / hours.length
    );

    // Prepare data for the chart
    setData({
      labels: weeklyPeakHours.map((_, i) => `Week ${i + 1}`),
      datasets: [
        {
          label: 'Average Peak Hour',
          data: weeklyPeakHours,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
        },
      ],
    });
  }, [selectedMonth]); // Recalculate when selectedMonth changes

  // Handle month selection
  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value, 10));
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h2>Peak Hours Analytics</h2>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="month-select">Select Month: </label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={handleMonthChange}
          style={{ padding: '5px', fontSize: '16px' }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>
      {data.labels ? (
        <Line
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: { display: true, position: 'top' },
              title: {
                display: true,
                text: 'Average Peak Hour per Week',
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: { display: true, text: 'Hour of the Day (0-23)' },
              },
              x: {
                title: { display: true, text: 'Weeks' },
              },
            },
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AreaLineChart;
