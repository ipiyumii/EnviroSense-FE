import './bincard.scss';

const BinCard = ({imgSrc,title,times,description }) =>  {
    const convertTo12HourFormat = (timeStr) => {
        const [hour, minute] = timeStr.split(':').map(Number);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const adjustedHour = hour % 12 || 12; 
        return `${adjustedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
    };
    
    return (
        // <div className="card bincrd" style={{ width: '18rem'}}>
        //     <img src={imgSrc} className="card-img-top img" alt="Card image" />
        //     <div className="card-body crdbody">
        //         {/* <h5 className="card-title">{title}</h5> */}
        //         <div className="card-text crdtxt">
        //             {times.map((time, index) => (
        //                 <p key={index}>{time}</p>  // Display each time on a new line
        //             ))}
        //         </div>
        //         {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
        //     </div>
        // </div>

        <div class="card mb-3" style={{ width: '540px'}}>
        <div class="row g-0">
        <div class="col-md-4"> 
            <img src={imgSrc} class="img-fluid rounded-start" alt="..."/> 
        </div>
        <div class="col-md-8"> 
        <div class="card-body">
        <h5 class="card-title">{title}</h5>
        <p class="card-text">
                    {times.map((time, index) => (
                        <p key={index}>{time}</p>  // Display each time on a new line
                    ))}
        </p>
        <p class="card-text"><small class="text-body-secondary">{description}</small></p>
        </div>
        </div>
        </div>
        </div>
    );
         
};
export default BinCard
