import React, { useEffect, useState } from 'react';
import './collectortable.scss';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import image from '../avatars/avatar1.webp';

const CollectorTable = () => {
    const [collectors, setCollectors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchCollectors = async() => {
            const token = localStorage.getItem('token');  

            try {
                const response = await fetch('http://localhost:5000/collector', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if(response.ok) {
                    const data = await response.json();
                    console.log("Trash collectors: ",data);

                    setCollectors(data);
                }
                else  {
                    console.error('Error fetching collectors:', response.statusText);
                }

            } catch (error) {
                console.error('Error fetching user data:', error);
            }finally {
                setLoading(false);
            }
        };
        fetchCollectors();
    },[]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return(
        <div>
        <div className="user-list">
            {collectors.length === 0 ? (
                <Typography variant="h6" color="textSecondary">No collectors found.</Typography>
            ) : (
                collectors.map((collector, index) => (
                    <div key={index} className="user-item">
                        <img src={image} alt={collector.name} className="avatar" />
                        <div className="user-info">
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${index}-content`}
                                    id={`panel${index}-header`}
                                >
                                    <Typography variant="h6">{collector.name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography><strong>Phone Number:</strong> {collector.phone_number}</Typography>
                                    <Typography><strong>Email:</strong> {collector.email}</Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                ))
            )}
        </div>
        </div>
    );
};

export default CollectorTable;