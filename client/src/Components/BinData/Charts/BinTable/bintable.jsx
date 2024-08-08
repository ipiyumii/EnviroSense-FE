import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './bintable.scss';

const BinTable = ({binData}) => {
    const [bins,setBins] = useState([]);

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
        // Implement the logic for editing
    };

    const handleSave = async (bin) => {
        try {
            await axios.put('http://localhost:5000/update-bin', bin);
            // Optionally refetch data after save
        } catch (error) {
            console.error('Error saving bin:', error);
        }
    };

    const handleChange = (e, bin_no) => {
        const { name, value } = e.target;
        setBins(bins.map(bin =>
            bin.bin_no === bin_no ? { ...bin, [name]: value } : bin
        ));
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
                            <td>{bin.bin_no}</td>
                            <td>
                                <input
                                    type="text"
                                    name="bin_name"
                                    value={bin.bin_name}
                                    onChange={(e) => handleChange(e, bin.bin_no)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="location"
                                    value={bin.location}
                                    onChange={(e) => handleChange(e, bin.bin_no)}
                                />
                            </td>
                            <td>{bin.level >= 85 ? "Full" : bin.level >= 50 ? "Half Full" : "Not Full"}</td>
                            <td>
                                <button onClick={() => handleEdit(bin.bin_no)}>Edit</button>
                                <button onClick={() => handleSave(bin)}>Save</button>
                            </td>
                        </tr>
                    ))}               
                </tbody>
            </table>
        </div>
    ); 
}
export default BinTable;