import React from "react";
import { PolarArea } from "react-chartjs-2";
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function Diagramma({ data }) {
    const totalsByCategory = data.reduce((acc, expense) => {
        if (!expense.status) {
            acc[expense.category] =
                (acc[expense.category] || 0) + parseInt(expense.sum);
        }
        return acc;
    }, {});
    const totalExpenses = Object.values(totalsByCategory).reduce(
        (total, categorySum) => total + categorySum,
        0
    );
    const percentages = Object.entries(totalsByCategory).map(
        ([category, sum]) => {
            return {
                category,
                percentage: ((sum / totalExpenses) * 100).toFixed(2),
            };
        }
    );
    console.log(percentages);
    let numbers = percentages.map((i) => i.percentage, []);
    let labels = percentages.map((i) => i.category, []);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: labels,
                data: numbers,
                backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(75, 192, 192)",
                    "rgb(255, 205, 86)",
                    "rgb(201, 203, 207)",
                    "rgb(54, 162, 235)",
                ],
            },
        ],
    };

    const config = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    return <PolarArea data={chartData} options={config} />;
}
