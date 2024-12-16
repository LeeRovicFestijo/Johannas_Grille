import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Default to current month

  // Fetch prediction data from backend
  useEffect(() => {
    const fetchPredictionData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/api/predict?month=${month}`);
        const predictions = response.data.predictions;

        // Map the backend data to chart labels and datasets
        const labels = predictions.map((entry) => entry.date);
        const data = predictions.map((entry) => entry.predicted_peak_hour);

        setChartData({
          labels, // X-axis: Hours
          datasets: [
            {
              label: 'Predicted Peak Hour',
              data, 
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.4,
            },
          ],
        });

        setLoading(false);
      } catch (err) {
        console.error('Error fetching prediction data:', err);
        setError('Failed to fetch prediction data');
        setLoading(false);
      }
    };

    fetchPredictionData();
  }, [month]); // Re-fetch data when month changes

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h2>Peak Hours Analytics</h2>
      <label htmlFor="month">Select Month:</label>
      <select
        id="month"
        value={month}
        onChange={(e) => setMonth(Number(e.target.value))}
        style={{ padding: '5px', fontSize: '16px' }}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {new Date(0, i).toLocaleString('default', { month: 'long' })}
          </option>
        ))}
      </select>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true, position: 'top' },
                title: {
                  display: true,
                  text: 'Predicted Peak Hour',
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: { display: true, text: 'Peak Hours (0-23)' },
                },
                x: {
                  title: { display: true, text: 'Days' },
                },
              },
            }}
          />
        </>
      )}
    </div>
  );
};

export default AreaLineChart;