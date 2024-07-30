import SideBar from "../Dashboard/SideBar Section/SideBar";
import NavBar from "../NavBar/navbar";
import './notification.scss';
import NotifyContent from "./NotifyContent/notifyContent";
import React, { useState, useEffect } from 'react';

const Notification = () => {
    const [decisions, setDecisions] = useState(() => {
        const savedDecisions = localStorage.getItem('notifications');
        return savedDecisions ? JSON.parse(savedDecisions) : [];
    });

    const [unreadCount, setUnreadCount] = useState(() => {
        const savedDecisions = localStorage.getItem('notifications');
        const notifications = savedDecisions ? JSON.parse(savedDecisions) : [];
        return notifications.filter(decision => !decision.read).length;
    });


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

                    let newDecisions = [];

                    if (Array.isArray(data.decisions)) {
                        newDecisions = data.decisions;
                    } else if (typeof data.decisions === 'string') {
                        newDecisions = [data.decisions];
                    } else {
                        console.error('Error: Data format is incorrect');
                        return;
                    }
                     const notificationsWithTimestamp = newDecisions.map(decision => {
                        const message = typeof decision === 'object' ? decision.message : decision;
                        return {
                            message: message || 'No message', 
                            timestamp: new Date().toISOString(),
                            read: false
                        };
                    });

                    const combinedDecisions = [...decisions, ...notificationsWithTimestamp];
                    // Sort notifications to ensure newest first
                    combinedDecisions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                    
                    setDecisions(combinedDecisions);
                    localStorage.setItem('notifications', JSON.stringify(combinedDecisions));

                    localStorage.setItem('lastFetchTime', new Date().toISOString());

                }
                else  {
                    console.error('Error fetching bin data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching bin data:', error);
            }
        };
       
        useEffect(() => {
            const lastFetchTime = localStorage.getItem('lastFetchTime');
            const currentTime = new Date().getTime();
    
            if (lastFetchTime) {
                const lastFetchTimeMs = new Date(lastFetchTime).getTime();
                const timeDifference = currentTime - lastFetchTimeMs;
    
                // if (timeDifference >= 12 * 60 * 60 * 1000)
                    if (timeDifference >= 1)
                     {
                    fetchDecision(); 
                }
            } else {
                fetchDecision(); 
            }
        }, []);

        const markAllAsRead = () => {
            const updatedDecisions = decisions.map(decision => ({
                ...decision,
                read: true
            }));
            setDecisions(updatedDecisions);
            setUnreadCount(0);
            localStorage.setItem('notifications', JSON.stringify(updatedDecisions));
        };
    return(
        <div className='maincontainer'> 
            <SideBar/>   
            <div className='adminDiv flex'> <NavBar/> </div>
            <div className="notificationcontainer">
                <header>
                  <div className="notificationheader">
                    <h1>Notification</h1>
                    <span id="num-of-notifi">{unreadCount}</span>
                  </div>
                  <p id="mark-as-read" onClick={markAllAsRead}>Mark as All Read</p>
                </header>
                {decisions.map((decision, index) => (
                    <NotifyContent 
                        key={index} 
                        msg={decision.message} 
                        timestamp={decision.timestamp} 
                        read={decision.read}
                    />
                ))}
            </div>

            </div>
          
    );
};
export default Notification;