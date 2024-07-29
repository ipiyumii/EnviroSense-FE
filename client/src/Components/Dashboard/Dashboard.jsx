import'./dashboard.scss';
import './SideBar Section/SideBar'
import SideBar from './SideBar Section/SideBar';
import Body from './Body Section/Body';
import BinAlert from '../Alert/binAlert';
const Dashboard = () =>{

      return (
        <div className='container'>
            <SideBar />   
            <Body/>
            <div className="alertmsg">
              <BinAlert />
            </div>
        </div>
       
    
      );
}
export default Dashboard