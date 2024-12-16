from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import psycopg2
from prophet import Prophet
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for React

# Database connection parameters (replace with your actual database details)
DB_HOST = 'localhost'
DB_PORT = '5433'
DB_NAME = 'johannasgrilledb'
DB_USER = 'postgres'
DB_PASSWORD = 'password'

# Function to query the PostgreSQL database
def get_order_data():
    # Connect to the PostgreSQL database
    conn = psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        port=DB_PORT
    )
    
    # Create a cursor to execute SQL queries
    cur = conn.cursor()

    # Define the SQL query to fetch order data
    query = "SELECT orderid, customerid, ordertype, date, totalamount, time FROM orderstbl"

    # Execute the query
    cur.execute(query)

    # Fetch all rows from the query result
    rows = cur.fetchall()

    # Convert the rows into a pandas DataFrame
    order_data = pd.DataFrame(rows, columns=['orderid', 'customerid', 'ordertype', 'date', 'totalamount', 'time'])

    # Close the database connection
    cur.close()
    conn.close()

    return order_data

# Sample endpoint to test the connection
@app.route('/api/predict', methods=['GET'])
def predict():
    # Get the month parameter from the request
    month = request.args.get('month', default=None, type=int)

    # Step 1: Query and Prepare Data
    order_data = get_order_data()
    order_data['date'] = pd.to_datetime(order_data['date'], errors='coerce')
    order_data['time'] = pd.to_datetime(order_data['time'], format='%H:%M:%S', errors='coerce').dt.time

    # Drop invalid rows
    order_data = order_data.dropna(subset=['date', 'time'])

    # Combine 'date' and 'time' into a single datetime column
    order_data['datetime'] = pd.to_datetime(order_data['date'].astype(str) + ' ' + order_data['time'].astype(str))

    # Extract the day, month, and hour
    order_data['day'] = order_data['datetime'].dt.date
    order_data['month'] = order_data['datetime'].dt.month
    order_data['hour'] = order_data['datetime'].dt.hour

    # Filter for the specified month if provided
    if month:
        order_data = order_data[order_data['month'] == month]

    # Filter business hours (9 AM to 9 PM)
    order_data = order_data[(order_data['hour'] >= 9) & (order_data['hour'] <= 20)]

    # Step 2: Group by day and hour to find peak hours
    grouped_data = order_data.groupby(['day', 'hour']).size().reset_index(name='count')
    peak_hours = grouped_data.loc[grouped_data.groupby('day')['count'].idxmax()]
    peak_hours = peak_hours[['day', 'hour']]
    
    # Prepare data for Prophet
    peak_hours = peak_hours.rename(columns={'day': 'ds', 'hour': 'y'})
    peak_hours['ds'] = pd.to_datetime(peak_hours['ds'])

    # Step 3: Train Prophet Model
    model = Prophet()
    model.fit(peak_hours)

    # Step 4: Make Predictions for the Specified Month
    # If month is provided, forecast for the same month in the following year
    if month:
        future = model.make_future_dataframe(periods=365, freq='D')  # Predict for the next 30 days
    else:
        future = model.make_future_dataframe(periods=365)  # Predict for 365 days if no month is specified

    forecast = model.predict(future)

    # Extract forecasted peak hours
    forecasted_peak_hours = forecast[['ds', 'yhat']]
    forecasted_peak_hours.loc[:, 'peak_hour'] = forecasted_peak_hours['yhat'].round().astype(int)  # Round to nearest hour

    # Filter forecasts by the requested month (if month was provided)
    if month:
        current_year = pd.Timestamp.now().year  # Get the current year dynamically
        forecasted_peak_hours = forecasted_peak_hours[
            (forecasted_peak_hours['ds'].dt.month == month) & (forecasted_peak_hours['ds'].dt.year == current_year)
        ]
        
    # if month:
    #     forecasted_peak_hours = forecasted_peak_hours[forecasted_peak_hours['ds'].dt.month == month]

    # Prepare the response
    response_data = []
    for index, row in forecasted_peak_hours.iterrows():
        response_data.append({
            'date': row['ds'].date().isoformat(),
            'predicted_peak_hour': row['peak_hour']
        })

    return jsonify({
        'message': 'Predicted peak hours for the specified month are ready.',
        'predictions': response_data
    })


if __name__ == '__main__':
    app.run(debug=True, port=3000)  # Runs on http://127.0.0.1:5000
