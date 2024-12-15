import matplotlib.pyplot as plt
import numpy as np

# Data
data = [
    {"month": "Jan", "loss": 70, "profit": 100},
    {"month": "Feb", "loss": 55, "profit": 85},
    {"month": "Mar", "loss": 35, "profit": 90},
    {"month": "April", "loss": 90, "profit": 70},
    {"month": "May", "loss": 55, "profit": 80},
    {"month": "Jun", "loss": 30, "profit": 50},
    {"month": "Jul", "loss": 32, "profit": 75},
    {"month": "Aug", "loss": 62, "profit": 86},
    {"month": "Sep", "loss": 55, "profit": 78},
]

# Extract data for plotting
months = [item["month"] for item in data]
losses = [item["loss"] for item in data]
profits = [item["profit"] for item in data]

# Create the line chart
plt.figure(figsize=(10, 6))

# Plot profit and loss lines
plt.plot(months, profits, label="Profit", color="#740003", linewidth=2, marker="o")
plt.plot(months, losses, label="Loss", color="#003974", linewidth=2, marker="o")

# Customize the chart
plt.title("Total Revenue", fontsize=16)
plt.xlabel("Month", fontsize=12)
plt.ylabel("Value (k)", fontsize=12)
plt.xticks(fontsize=10)
plt.yticks(fontsize=10)
plt.grid(axis="y", linestyle="--", alpha=0.6)
plt.legend(title="Legend", fontsize=10)

# Annotate total revenue
total_revenue = 50.4
plt.text(len(months) - 1.5, profits[-1] + 5, f"Total Revenue: {total_revenue}k", fontsize=10, color="green")

# Show the chart
plt.tight_layout()
plt.show()