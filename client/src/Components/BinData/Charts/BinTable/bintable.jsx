import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './bintable.scss';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const BinTable = ({binData}) => {
    const [bins,setBins] = useState([]);
    const [editingBinNo, setEditingBinNo] = useState(null);
    const [newBin, setNewBin] = useState(null);

    useEffect(() => {
        const fetchBinData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/meta/bin');
                const binMetadata = response.data;

                // Combine metadata with real-time data passed as props
                const combinedData = binMetadata.map(meta => {
                    const realtime = binData.find(rt => rt.bin_no === meta.bin_no);
                    return { ...meta, ...realtime };
                });
                setBins(combinedData);

            } catch (error) {
                console.error('Error fetching bins:', error);
            }
        };

        fetchBinData();
    }, [binData]);

    const handleEdit = (bin_no) => {
        setEditingBinNo(bin_no);
    };

    const handleSave = async (bin) => {
        try {
            if (bin.bin_no === newBin?.bin_no) {
                await axios.post('http://localhost:5000/meta/bin/add', bin);
                setNewBin(null); 

                const response = await axios.get('http://localhost:5000/meta/bin');
                setBins(response.data);

            } else {
                await axios.put(`http://localhost:5000/meta/bin/update?bin_no=${bin.bin_no}`, bin);
                setEditingBinNo(null); 

                const response = await axios.get('http://localhost:5000/meta/bin');
                setBins(response.data);
            }
           
        } catch (error) {
            console.error('Error saving bin:', error);
        }
    };

    const handleChange = (e, bin_no) => {
        const { name, value } = e.target;
        if (bin_no === newBin?.bin_no) {
            setNewBin({ ...newBin, [name]: value });
        } else {
            setBins(bins.map(bin =>
                bin.bin_no === bin_no ? { ...bin, [name]: value } : bin
            ));
        }
    };

    const handleKeyDown = async (e, bin) => {
        if (e.key === 'Enter') {
            await handleSave(bin);
        }
    };

    const handleDelete = async (bin_no) => {
        try {
            await axios.delete(`http://localhost:5000/meta/bin/delete?bin_no=${bin_no}`);
            setBins(bins.filter(bin => bin.bin_no !== bin_no));
        } catch (error) {
            console.error('Error deleting bin:', error);
        }
    };

    const handleAdd = () => {
        setNewBin({ bin_no: '', bin_name: '', location: '', level: 0 }); 
    };
    
    return(
        <div className='bintable-content'>
            <table className='table'>
            <thead>
                    <tr>
                        <th>Bin No</th>
                        <th>Bin Name</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                     {bins.map((bin) => (
                        <tr key={bin.bin_no}>
                            <td>
                                {bin.bin_no}
                                <div className="delete-icons">
                                    <Tooltip title="Delete a bin" arrow>
                                        <IconButton onClick={() => handleDelete(bin.bin_no)}>
                                        <   DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                        </div>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="bin_name"
                                    value={bin.bin_name}
                                    onChange={(e) => handleChange(e, bin.bin_no)}
                                    onKeyDown={(e) => handleKeyDown(e, bin)}
                                    disabled={editingBinNo !== bin.bin_no}
                                    className={editingBinNo === bin.bin_no ? 'italic-input' : ''}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="location"
                                    value={bin.location}
                                    onChange={(e) => handleChange(e, bin.bin_no)}
                                    onKeyDown={(e) => handleKeyDown(e, bin)}
                                    disabled={editingBinNo !== bin.bin_no}
                                    className={editingBinNo === bin.bin_no ? 'italic-input' : ''}
                                />
                            </td>
                            <td>{bin.level >= 85 ? "Full" : bin.level >= 50 ? "Half Full" : "Not Full"}</td>
                            <td>
                                <button onClick={() => handleEdit(bin.bin_no)}>Edit</button>
                            </td>
                        </tr>
                    ))}  
                      {newBin && (
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    name="bin_no"
                                    value={newBin.bin_no}
                                    onChange={(e) => handleChange(e, newBin.bin_no)}
                                    placeholder="Bin No"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="bin_name"
                                    value={newBin.bin_name}
                                    onChange={(e) => handleChange(e, newBin.bin_no)}
                                    placeholder="Bin Name"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="location"
                                    value={newBin.location}
                                    onChange={(e) => handleChange(e, newBin.bin_no)}
                                    placeholder="Location"
                                />
                            </td>
                            <td>{newBin.level >= 85 ? "Full" : newBin.level >= 50 ? "Half Full" : "Not Full"}</td>
                            <td>
                                <button onClick={() => handleSave(newBin)}>Save</button>
                            </td>
                        </tr>
                    )}             
                </tbody>
            </table>
            <div className='add-icon'>
            <Tooltip title="Add a new bin" arrow>
                    <IconButton
                        color="primary"
                        aria-label="add"
                        component="span"
                        onClick={handleAdd}
                        style={{ marginLeft: 'auto' }}
                            >
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    ); 
}
export default BinTable;