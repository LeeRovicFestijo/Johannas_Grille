import React, { useState, useEffect } from "react";
import './EditCustomer.css';

const EditModal = ({ employeeId, onClose, onSave }) => {
  const [UpdatedempfName, setUpdatedfName] = useState('');
  const [UpdatedemplName, setUpdatedlName] = useState('');
  const [Updatedemail, setUpdatedEmail] = useState('');
  const [Updatedusername, setUpdatedUsername] = useState('');
  const [UpdatedselectedBranch, setUpdatedSelectedBranch] = useState('');
  const [updatedImage, setUpdatedImage] = useState(null); // File to upload
  const [imagePreview, setImagePreview] = useState(''); // Image URL preview

  // Handle form input changes
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/employees/${employeeId}`);  // Use backticks here
        if (response.ok) {
          const data = await response.json();
          setUpdatedfName(data.firstname);
          setUpdatedlName(data.lastname);
          setUpdatedEmail(data.email);
          setUpdatedUsername(data.username);
          setUpdatedSelectedBranch(data.branch);
          setImagePreview(`http://localhost:3000${data.image_url}`);
        } else {
          console.error('Error fetching employee:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstname', UpdatedempfName);
    formData.append('lastname', UpdatedemplName);
    formData.append('email', Updatedemail);
    formData.append('username', Updatedusername);
    formData.append('branch', UpdatedselectedBranch);
    if (updatedImage) {
      formData.append('image', updatedImage);
    }

    try {
      const response = await fetch(`http://localhost:3000/api/employees/${employeeId}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        onSave(updatedProduct); // Pass updated product back to parent
        onClose(); // Close the popup
      } else {
        console.error('Error updating menu item:', response.statusText);
      }

    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedImage(file);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="edit-customer-popup-form">
      <div className="edit-customer-content">
        <h2>Edit Customer</h2>
        <form onSubmit={handleSave}>
          <div className="edit-form-left">
            <label htmlFor="image">Upload Image</label>
            {imagePreview && (
              <div className="edit-customer-image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
            <input
              id="image"
              type="file"
              accept="image/*"
              className="customer-popup-input"
              onChange={handleImageChange}
            />
            <div className="edit-customer-container">
              <div className="form-group1">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  className="edit-customer-info-input"
                  value={UpdatedempfName}
                  onChange={(e) => setUpdatedfName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group1">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  className="edit-customer-info-input"
                  value={UpdatedemplName}
                  onChange={(e) => setUpdatedlName(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="edit-form-right">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="edit-customer-info-input"
              value={Updatedusername}
              onChange={(e) => setUpdatedUsername(e.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="edit-customer-info-input"
              value={Updatedemail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
              required
            />
            <label htmlFor="branch">Branch</label>
            <input
              type="text"
              id="branch"
              name="branch"
              className="edit-customer-info-input"
              value={UpdatedselectedBranch}
              onChange={(e) => setUpdatedSelectedBranch(e.target.value)}
              required
            />
            <div>
              <button className="edit-customer-popup-button" type="submit">Save Changes</button>
              <button className="edit-customer-popup-button cancel" type="button" onClick={onClose}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;