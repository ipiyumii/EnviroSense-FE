import './bincard.scss';

const BinCard = ({imgSrc,title,times,description }) =>  {
    
    return (
        <div className="card mb-3" style={{ width: '540px'}}>
            <div className="row g-0">
                <div className="col-md-4"> 
                    <img src={imgSrc} className="img-fluid rounded-start" alt="Card image"/> 
                </div>
                <div className="col-md-8"> 
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">
                            {times.map((time, index) => (
                                <p key={index}>{time}</p>  
                            ))}
                        </p>
                        <p className="card-text"><small className="text-body-secondary">{description}</small></p>
                    </div>
                </div>
            </div>
        </div>
    );
         
};
export default BinCard
