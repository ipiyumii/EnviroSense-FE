import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DatePicker } from 'antd'; // Make sure antd is installed
import moment from 'moment';
import SideBar from '../../Dashboard/SideBar Section/SideBar';
import './wasteCharts.scss';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../NavBar/navbar';

const WasteChart = () => {
    const [data, setData] = useState([]);
    const [month, setMonth] = useState(moment());
    const [week, setWeek] = useState(null);

    const fetchData = useCallback(() => {
        let start_date, end_date;
        if (week) {
            start_date = week.startOf('week').format('YYYY-MM-DD');
            end_date = week.endOf('week').format('YYYY-MM-DD');
        } else {
            start_date = month.startOf('month').format('YYYY-MM-DD');
            end_date = month.endOf('month').format('YYYY-MM-DD');
        }

        axios.get(`http://localhost:5000/api/waste-data?start_date=${start_date}&end_date=${end_date}`)
            .then(response => {
                const rawData = response.data;
                const formattedData = rawData.reduce((acc, entry) => {
                    const date = new Date(entry.timestamp).toLocaleDateString();
                    const bin_no = entry.bin_no;

                    if (!acc[date]) {
                        acc[date] = { date };
                    }

                    if (!acc[date][bin_no]) {
                        acc[date][bin_no] = 0;
                    }

                    acc[date][bin_no] += 1;

                    return acc;
                }, {});

                const finalData = Object.keys(formattedData).map(date => {
                    const entry = formattedData[date];
                    return {
                        date,
                        ...entry
                    };
                });

                setData(finalData);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, [month, week]);

    useEffect(() => {
        fetchData();
    }, [month, week, fetchData]);

    const handleMonthChange = (value) => {
        setMonth(value);
        setWeek(null); 
    };

    const handleWeekChange = (value) => {
        setWeek(value);
    };

    const getBinNumbers = () => {
        const binNumbers = new Set();
        data.forEach(entry => {
            Object.keys(entry).forEach(key => {
                if (key !== 'date') {
                    binNumbers.add(key);
                }
            });
        });
        return Array.from(binNumbers);
    };

    const getColor = (index) => {
        const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#d0ed57', '#a4de6c', '#c5a4d6'];
        return colors[index % colors.length];
    };

    return (
        <div className='maincontainer' style={{ display: 'flex' }}>
            <SideBar />
            <div className="navbar">
            <NavBar/>
           </div>
            <div className='chart' style={{ flex: 1, backgroundColor: '#333', padding: '20px', borderRadius: '8px', marginTop: '50px' }}>
                {/* <h1 style={{ color: '#fff' }}>Waste Collection Analysis</h1> */}
                <DatePicker
                    picker="month"
                    value={month}
                    onChange={handleMonthChange}
                    format="YYYY-MM"
                    style={{ marginRight: '10px' }}
                />
                {week && (
                    <DatePicker
                        picker="week"
                        value={week}
                        onChange={handleWeekChange}
                        format="YYYY-wo"
                    />
                )}
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        data={data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                        style={{ backgroundColor: '#333' }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                        <XAxis dataKey="date" stroke="#fff" />
                        <YAxis stroke="#fff" />
                        <Tooltip />
                        <Legend />
                        {getBinNumbers().map((bin_no, index) => (
                            <Line
                                key={bin_no}
                                type="monotone"
                                dataKey={bin_no}
                                stroke={getColor(index)}
                                strokeWidth={3} // Make lines thicker
                                dot={false} // Remove dots if not needed
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>

           
        </div>
    );
};

export default WasteChart;
