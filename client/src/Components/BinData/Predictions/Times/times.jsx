import React, { useEffect, useState } from 'react';
import SideBar from '../../../Dashboard/SideBar Section/SideBar';
import './times.scss';
import defaultImage from '../../bindataAssests/bin3.webp';
import NavBar from '../../../NavBar/navbar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import CollectorTable from '../../../Collectors/CollectorTable/collectortable';
// import image2 from './bindataAssests/bin3.webp';
import { useForm } from 'react-hook-form';
import { Dialog, DialogTitle, DialogContent, TextField, Button, IconButton, Tooltip } from '@mui/material';


const formatTime = (timeStr) => {
    const [hour, minute] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
};

const Times = () =>  {
    const [bins, setBins] = useState([]);
    const [open, setOpen] = useState(false);
    const [collectorsUpdated, setCollectorsUpdated] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [locations, setLocations] = useState({});


    useEffect(() => {
        const fetchPredictedTimes = async() => {
            const token = localStorage.getItem('token');  
            
            try {
                const response = await fetch('http://localhost:5000/gettimes', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if(response.ok) {
                    const binData = await response.json();
                    setBins(binData);


                }
                else  {
                    console.error('Error fetching bin data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        const fetchBinsLocation = async () => {
            const storedData = localStorage.getItem('binsData');
            if (storedData) {
                const binsData = JSON.parse(storedData);
                const locationsMap = binsData.reduce((map, bin) => {
                    map[bin.bin_no] = bin.location; // Assuming each bin has a bin_no and location
                    return map;
                }, {});
                setLocations(locationsMap);
            } else {
                console.error('No bins data found in local storage.');
            }
        };


        fetchPredictedTimes();
        fetchBinsLocation();

  }, []); 

  const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        reset(); 
    };

    const onSubmit = async (data) => {
        console.log("New collector data:", data);
        try {
            const response = await fetch('http://localhost:5000//collector/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, 
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                setCollectorsUpdated(true);
            } else {
                console.error('Error adding collector:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
        handleClose();
    };

    return (
        <div className="topmain">
            <SideBar/>

            <div className="navbar"> <NavBar/> </div>

            <div className="content-area">
            <div className="alert">
                            <div class="alert alert-success" role="alert">
                            <strong>Please Note:</strong> The times shown are forecasts based on recent data. They give you an idea of when your 
                            bin might be full, so you can plan ahead. Rest assured, our system will automatically notify waste collectors 
                            by email as soon as the bin is actually full. This means you don’t have to worry about missing a collection!
                            </div>
                     </div>
                <div className="accordion-container">
                <div className="title">
                    <h3>When’s Your Trash Going to Overflow?</h3>
                </div>
                <div className="accordion-cont">
                    {bins.map((bin, index) => (
                            <Accordion key={index}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${index}-content`}
                                    id={`panel${index}-header`}
                                >
                                    <Typography style={{ fontSize: '1.2rem', fontWeight: '700' }}>{`BIN ${bin.bin_no}`}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {/* <img src={defaultImage} alt={bin.location} className="bin-image" /> */}
                                    {/* <Typography variant="h6">{`Bin Number: ${bin.bin_no}`}</Typography> */}
                                    <Typography variant="body1" style={{ fontSize: '1rem', fontWeight: '700' }}>Location:</Typography>
                                    <Typography variant="body2">{locations[bin.bin_no] || 'Location not available'}</Typography>
                                    <Typography variant="body1" style={{ fontSize: '1rem', fontWeight: '700' }}>Predicted Times:</Typography>
                                    <ul>
                                        {bin.predictions.map((time, i) => (
                                            <li key={i}>{formatTime(time)}</li>
                                        ))}
                                    </ul>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                </div>
                </div>

                   
                
                <div className="collector-tablediv">
                    <div className="title">
                        <h3>Collector List</h3>
                        <Tooltip title="Add a collector" arrow>
                            <IconButton
                                color="primary"
                                aria-label="add"
                                component="span"
                                onClick={handleOpen}
                                style={{ marginLeft: 'auto' }}
                            >
                                <AddIcon />
                            </IconButton>
                        </Tooltip>

                    </div>
                    <div className="collector-table">
                        {/* <CollectorTable/> */}
                        <CollectorTable collectorsUpdated={collectorsUpdated} onCollectorsUpdated={() => setCollectorsUpdated(false)} />
                    </div>
                </div>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add New Collector</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <TextField
                                margin="dense"
                                label="Name"
                                type="text"
                                fullWidth
                                {...register('name', { required: true })}
                            />
                            <TextField
                                margin="dense"
                                label="Phone Number"
                                type="text"
                                fullWidth
                                {...register('phone_number', { required: true })}
                            />
                            <TextField
                                margin="dense"
                                label="Email"
                                type="email"
                                fullWidth
                                {...register('email', { required: true })}
                            />
                            {/* <TextField
                                margin="dense"
                                label="Avatar URL"
                                type="text"
                                fullWidth
                                {...register('avatarUrl')}
                            /> */}
                            <Button type="submit" color="primary" variant="contained">
                                Add Collector
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

        </div>
    );
};
export default Times