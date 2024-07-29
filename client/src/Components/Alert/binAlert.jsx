import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const BinAlert = () => {
    const [decision,setDecision] = useState(null);
    useEffect(() => {
        const fetchDecision = async() => {
            const token = localStorage.getItem('token'); 
            try {
                const response = await fetch('http://localhost:5000/decisions', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if(response.ok) {
                    const data = await response.json();
                    console.log("Predicted decisions: ",data);
                    setDecision(data.decisions);
                }
                else  {
                    console.error('Error fetching bin data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching bin data:', error);
            }
        };
        fetchDecision();
     },[]);

    return (
        <div>
            {decision && (
                <Alert
                    variant="outlined"
                    severity="warning"
                    sx={{
                        backgroundColor: '#1e1e1e',
                        color: '#ff9800',
                        borderColor: '#ff9800',
                        fontSize: '1.2rem',
                        padding: '20px',
                        width: '70%',
                        margin: 'auto',
                        '& .MuiAlert-icon': {
                            color: '#ff9800'
                        }
                    }}
                >
                    <AlertTitle>Warning</AlertTitle>
                    {` ${decision}`}
                </Alert>
            )}
        </div>
    );
};
export default BinAlert;
