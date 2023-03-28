import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./LandingPage.css";
import Footer from "../Footer";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import Card from "./Card";


export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <Header />
      <main className="main-ldpage">
        <section className="hero-section-ldpage">
          <div className="hero-container-ldpage">
            <h1>Delivering the latest technology</h1>
            <p>
            Streamline the EV charging experience by providing a user-friendly platform that allows EV drivers to easily locate, reserve and plan their charging stops based on real-time traffic information. 
            </p>
            <form className="form-ldpage">
              <button
                type="submit"
                className="trackbtn-ldpage"
                onClick={() => {
                  navigate("/Signup");
                }}
              >
                Start Exploring Now
              </button>
            </form>
          </div>
        </section>
        <section className="features-section-ldpage" id="features">
          <div className="container-ldpage">
            <h2>Features</h2>
            <div className="row-ldpage">
              <div className="col-ldpage">
                <i className="fas fa-calendar-check"></i>
                <h3>Booking Overview</h3>
                <p>
                  Service providers can view all bookings made at their charging
                  station.
                </p>
              </div>
              <div className="col-ldpage">
                <i className="fas fa-sync-alt"></i>
                <h3>Status Update</h3>
                <p>
                  Service providers can update the status of their charging
                  station to indicate if it's online or offline
                </p>
              </div>
              <div className="col-ldpage">
                <i className="fas fa-chart-line"></i>
                <h3>Update Availability</h3>
                <p>
                  Service providers can update available charging booths and
                  other details.
                </p>
              </div>
            </div>
            <div className="row-ldpage">
              <div className="col-ldpage">
                <i className="fas fa-traffic-light"></i>
                <h3>Real-Time Traffic Monitoring</h3>
                <p>This feature allows users to monitor real-time traffic.</p>
              </div>
              <div className="col-ldpage">
                <i className="fas fa-chart-bar"></i>
                <h3>Usage Monitoring</h3>
                <p>
                  users can view the current usage of EV charging stations
                  as per City name
                </p>
              </div>
              <div className="col-ldpage">
                <i className="fas fa-bolt"></i>
                <h3>EV Charging Reservation</h3>
                <p>
                  Users can reserve EV charging at a specific station for
                  current and next 3 days.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
