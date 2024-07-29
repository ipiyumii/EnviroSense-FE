import SideBar from "../Dashboard/SideBar Section/SideBar";
import NavBar from "../NavBar/navbar";

const Notification = () => {
    return(
        <div>
             <div className='maincontainer'> 
                <SideBar/>   
            </div>
            <div className='adminDiv flex'>
            <NavBar/>
          </div>
        </div>
    );
};
export default Notification;