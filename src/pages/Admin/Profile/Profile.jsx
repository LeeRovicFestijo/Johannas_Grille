import "./Profile.css"; // Assuming the styles are in ProfileAdmin.css
import { RxAvatar } from "react-icons/rx";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";

const ProfileAdmin = () => {
  return (
    <main>
      {/* Left side - Sidebar */}
      <Sidebar />

      {/* Right side - Content of the page */}
      <div className="admin-profile-wrapper">
        <div className="admin-profile-header">
          <h1>Profile</h1>
        </div>

        <div className="admin-profile-content">
          {/* Left Section: Profile Picture and Info */}
          <div className="admin-profile-info">
            <div className="admin-avatar-box">
              <RxAvatar className="admin-avatar" size={100} />
            </div>
            <h2>Robelyn Macaraig</h2>
            <p className="admin-location">Admin</p>

            {/* Personal Information */}
            <div className="admin-personal-info">
              <p>robelyn.macaraig@gmail.com</p>
              {/* <p>+639032145678</p> */}
            </div>
          </div>

          {/* Right Section: Account Settings Form */}
          <div className="admin-profile-form">
            <h3>Account Settings</h3>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label htmlFor="first-name">First Name</label>
                <input type="text" id="first-name" placeholder="First Name" />
              </div>
              <div className="admin-form-group">
                <label htmlFor="last-name">Last Name</label>
                <input type="text" id="last-name" placeholder="Last Name" />
              </div>
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="username" />
              </div>
              <div className="admin-form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="Email Address" />
              </div>
            </div>

            {/* <h3>Change Password</h3> */}
            {/* <div className="admin-form-row">
              <div className="admin-form-group">
                <label htmlFor="usertype">User Type</label>
                <input type="text" id="usertype" placeholder="usertype" />
              </div>
            </div> */}

            <button className="admin-update-btn">Update</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileAdmin;