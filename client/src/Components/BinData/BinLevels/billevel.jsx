import SideBar from "../../Dashboard/SideBar Section/SideBar";
import './binlevel.scss';
import BinAlert from "../../Alert/binAlert";
import NavBar from "../../NavBar/navbar";

const BinLevel = () => {
    return(
        <div className="binlevel">
            <div className='maincontainer'> 
                <SideBar/>   
            </div>
            <div className="navbar">
            <NavBar/>
           </div>
            <div className="alert">
                <BinAlert/>
            </div>
        </div>
       
    );
}; 
export default BinLevel;