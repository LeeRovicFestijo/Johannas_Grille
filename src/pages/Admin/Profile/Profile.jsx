import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import "./Profile.css";
import { RxAvatar } from "react-icons/rx";

const Profile = () => {
  return (
    <main className="page-wrapper">
      {/* Left side - Sidebar */}
      <Sidebar />
      {/* Right side - Content of the page */}
      <div className="content-wrapper">
        <div className="profile-part-content">
          <h1>Profile</h1>
          <div className="profile-part-card">
            <div className="profile-part-left">
              <RxAvatar className="avatar" size={100} />
              <h2>Robelyn Macaraig</h2>
              <p className="location">New York, USA</p>
            </div>

            <div className="profile-part-right">
              <div className="profile-part-info-section">
                <h3>Information</h3>
                <div className="profile-part-info-row">
                  <label>Name:</label>
                  <input type="text" value="Sara" />
                </div>
                <div className="profile-part-info-row">
                  <label>Full Name:</label>
                  <input type="text" value="Tancredi" />
                </div>
                <div className="profile-part-info-row">
                  <label>Email Address:</label>
                  <input type="email" value="SaraTancredi@gmail.com" />
                </div>
                <div className="profile-part-info-row">
                  <label>Phone Number:</label>
                  <input type="tel" value="(+98) 9123728167" />
                </div>
                <div className="profile-part-info-row">
                  <label>Location:</label>
                  <input type="text" placeholder="e.g. New York, USA" />
                </div>
                <div className="profile-part-info-row">
                  <label>Postal Code:</label>
                  <input type="text" value="23728167" />
                </div>
              </div>
              <button className="profile-part-save-changes-btn">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;