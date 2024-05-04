import { Outlet, Link } from "react-router-dom";

const Home = () => {
    return (
        <>
         <div>
        <div className="container mt-5">
          <div className="dashboard-container">
            <div className="dashboard-left">
              <h2 className="mt-4">Kandy City Center</h2>
            </div>

            <div className="dashboard-right">
              <div>
                <Link to="/Analytics" className="card-link">
                  <div className="card-body" style={{ width: "18rem" }}>
                    <div className="card-body">
                      <h5 className="card-title">විශ්ලේෂනයන් බලන්න</h5>
                      <p className="card-text">Click to view waste management analytics.</p>
                    </div>
                  </div>
                </Link>
              </div>

              <div>
                <Link to="/Prediction" className="card-link">
                  <div className="card-body" style={{ width: "18rem" }}>
                    <div className="card-body">
                      <h5 className="card-title">වේලාවන් බලන්න</h5>
                      <p className="card-text">Click to view waste management predictions.</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
        </>
    );   
  };
  
  export default Home;