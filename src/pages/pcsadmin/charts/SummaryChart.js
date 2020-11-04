import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const SummaryChart = ({ displayInfo }) => {
    const [ labels, setLabels ] = useState([]);
    const [ counts, setCounts ] = useState([]);
    const [ colors, setColors ] = useState([]);

    const dynamicColors = () => {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgba(" + r + "," + g + "," + b + ", 0.5)";
    }
    
    useEffect(() => {
        console.log(displayInfo);
        setCounts(displayInfo.map(info => info.count));
        setLabels(displayInfo.map(info => info.type));
        const displayColors = [];
        for(let i = 0; i < displayInfo.length; i++) {
            displayColors.push(dynamicColors());
        }
        setColors(displayColors);
    }, [displayInfo]);

    const barChart = (
        displayInfo.length > 0 ? <Bar 
                                    data={{
                                        labels: labels,
                                        datasets: [{
                                            label: 'Pets',
                                            backgroundColor: colors,
                                            data: counts
                                        }]
                                    }}
                                    options={{
                                        legend: { display: false },
                                        title: {display: true, text: `Current selected month: ${displayInfo[0].month_year}`},
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    beginAtZero: true
                                                }
                                            }]
                                        }
                                    }}
                                    />
                                : null
    );
    
    return (
        <div>
            {barChart}
        </div>
    );
}

export default SummaryChart;