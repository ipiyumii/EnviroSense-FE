import React from "react";
import image from '../.././../LoginAssests/logo.jpeg';
import { formatDistanceToNow, parseISO } from 'date-fns';
import './notifyContent.scss';

const timeAgo = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
        return "Invalid date";
    }
    return formatDistanceToNow(date, { addSuffix: true });
}

const NotifyContent = ({msg,timestamp, read}) => {
    const formattedTime = timeAgo(timestamp);

    return(
        // <div className="notificationcontent" >
            <div className={`notificationcontent ${read ? 'read' : 'unread'}`}>

                <main>
                    <div className="notificationcard">
                        <img src={image} alt="" />
                        <div className="description">
                            <p>{msg}</p>
                            <p id="notifi-time">{formattedTime}</p>
                        </div>
                    </div>
                </main>
            </div>
    );
};

export default NotifyContent;