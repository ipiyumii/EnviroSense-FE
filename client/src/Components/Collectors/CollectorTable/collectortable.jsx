import React, { useEffect, useState } from 'react';
import './collectortable.scss';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Tooltip, IconButton, Modal, TextField, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import image1 from '../avatars/avatar1.webp';
import image2 from '../avatars/avatar2.webp';
// import image4 from '../avatars/image4.png';
import image5 from '../avatars/image8.webp';
// import image6 from '../avatars/image9.jpg';
import image7 from '../avatars/image7.webp';
import image8 from '../avatars/image8.png';
// import image3 from '../avatars/image10.png'

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const CollectorTable = ({ collectorsUpdated, onCollectorsUpdated }) => {
    const [collectors, setCollectors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCollector, setSelectedCollector] = useState(null);
    const [originalEmail, setOriginalEmail] = useState('');
    const imageArray = [image1,image2,image5,image7,image8];

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

    useEffect(() => {
        fetchCollectors();
    }, []);


    useEffect(() => {
        if (collectorsUpdated) {
            fetchCollectors();
            onCollectorsUpdated(); 
        }
    }, [collectorsUpdated, onCollectorsUpdated]);

    const handleDelete = async(email) => {
        try {
            const response = await fetch(`http://localhost:5000/collector/delete?email=${email}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setCollectors(prevCollectors => prevCollectors.filter(collector => collector.email !== email));
            } else {
                console.error("Failed to delete collector");
            }
        } catch (error) {
            console.error("Error deleting collector:", error);
        }
    };

    const handleEdit = (collector) => {
        setSelectedCollector(collector);
        setOriginalEmail(collector.email);
        setEditModalOpen(true);
    };

    const handleEditSubmit = async() => {
        const { name, email, phone_number } = selectedCollector;

        try {
            const response = await fetch(`http://localhost:5000/collector/update?original_email=${originalEmail}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, phone_number }),
            });

            if(response.ok) {
                fetchCollectors(); 
                setEditModalOpen(false);
            } else {
                console.error('Failed to update collector');
            }

        } catch (error) {
            console.error('Error updating collector:', error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedCollector((prev) => ({ ...prev, [name]: value }));
    };

    const getRandomImage = () => {
        return imageArray[Math.floor(Math.random() * imageArray.length)];
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return(
        <div>
        <div className="user-list">
            {collectors.length === 0 ? (
                <Typography variant="h6" color="textSecondary">No collectors found.</Typography>
            ) : (
                // collectors.map((collector, index) => (
                    collectors.slice().reverse().map((collector, index) => ( 
                    <div key={index} className="user-item">
                    
                        {/* <img src={image} alt={collector.name} className="avatar" /> */}
                        <img src={getRandomImage()} alt={collector.name} className="avatar" />
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
                        <div className="action-icons">
                            <Tooltip title="Edit collector" arrow>
                                <IconButton onClick={() => handleEdit(collector)}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete collector" arrow>
                                <IconButton onClick={() => handleDelete(collector.email)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>

                        </div>
                    </div>
                ))
            )}
        </div>

         {/* Edit Modal */}
         <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
                <div className="modal-content">
                    <h2>Edit Collector</h2>
                    <TextField
                        label="Name"
                        name="name"
                        value={selectedCollector?.name || ''}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={selectedCollector?.email || ''}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        disabled
                    />
                    <TextField
                        label="Phone Number"
                        name="phone_number"
                        value={selectedCollector?.phone_number || ''}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                        <Button variant="contained" color="primary" onClick={handleEditSubmit}>
                            Save
                        </Button>
                    <Button variant="contained" onClick={() => setEditModalOpen(false)}>
                        Cancel
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default CollectorTable;