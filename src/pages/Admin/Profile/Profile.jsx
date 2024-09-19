// import OrderAction from "./OrderAction";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import "./Profile.css";
import { RxAvatar } from "react-icons/rx";

const Profile = () => {
  return (
    <main className="page-wrapper">
      {/* left of page */}
      <Sidebar />
      {/* right side/content of the page */}
      <div className="content-wrapper">
        <div className="profile-content">
          <h1>Profile</h1>
          <div className="profile-card">
            <div className="profile-left">
              <RxAvatar className="avatar" size={100} /> {/* Use the avatar icon */}
              <h2>MARQUEZ</h2>
              <p className="title">Paula Kristha</p>
              <button className="email-btn">✉️</button>
            </div>

            <div className="profile-right">
              <div className="info-section">
                <h3>Information</h3>
                <div className="info-row">
                  <span>Email</span>
                  <span>mrbq@gmail.com</span>
                </div>
                <div className="info-row">
                  <span>Phone</span>
                  <span>08037080888</span>
                </div>
              </div>

              <div className="projects-section">
                <h3>Projects</h3>
                <div className="info-row">
                  <span>Recent</span>
                  <span>Sam Disqué</span>
                </div>
                <div className="info-row">
                  <span>Most Viewed</span>
                  <span>Director Husaima</span>
                </div>
              </div>

              <div className="social-section">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;