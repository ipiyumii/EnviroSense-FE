import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts'; 
import moment from 'moment';

const DonutChartComponent = ({ binNo }) => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/bin-data`, {
                    params: { bin_no: binNo }
                });
                const result = response.data;
                console.log('Fetched Data:', result);
                const formattedData = processWeeklyData(result);
                console.log('Formatted Data:', formattedData);
                setData(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [binNo]);

    const processWeeklyData = (data) => {
        const df = data.map(entry => ({
            timestamp: moment(entry.timestamp).toDate(),
            bin_no: entry.bin_no,
        }));

         const startDate = moment().subtract(28, 'days').startOf('day');
         const endDate = moment().startOf('day');
 
         const filteredData = df.filter(entry => {
            const timestamp = moment(entry.timestamp);
            return timestamp.isSameOrAfter(startDate) && timestamp.isBefore(endDate);
        });
        
        const weeklyCounts = filteredData.reduce((acc, entry) => {
            const weekStart = moment(entry.timestamp).startOf('isoWeek').format('YYYY-MM-DD');
            if (!acc[weekStart]) {
                acc[weekStart] = 0;
            }
            acc[weekStart] += 1;
            return acc;
        }, {});

        return Object.keys(weeklyCounts).map(week => ({
            week,
            count: weeklyCounts[week],
        })).filter(item => moment(item.week).isSameOrAfter(startDate));
    };

    const COLORS = ['#8884d8', '#82ca9d', '#c5a4d6', '#d0ed57'];

    return (
        <div>
            <PieChart  width={700} height={400}>
                <Pie
                    data={data}
                    dataKey="count"
                    nameKey="week"
                    innerRadius={80} 
                    outerRadius={150}
                    fill="#8884d8"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default DonutChartComponent;
