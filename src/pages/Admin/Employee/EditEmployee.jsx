import React, { useState } from "react";

const EditModal = ({ employeeData, onClose, onSave }) => {
  const [employee, setEmployee] = useState(employeeData);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit changes
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from reloading the page
    console.log("Saving employee:", employee); // Debug log

    try {
      const response = await fetch(`http://localhost:3000/api/employeesedit/${employee.userid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee), // Pass updated employee to the backend
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Employee updated successfully", data); // Debug log
        onSave(data); // Optionally pass the updated data back to the parent component
        onClose(); // Close the modal after saving
      } else {
        console.error("Failed to update employee:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={employee.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={employee.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="usertype">User Type</label>
            <input
              type="text"
              id="usertype"
              name="usertype"
              value={employee.usertype}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="branchid">Branch ID</label>
            <input
              type="text"
              id="branchid"
              name="branchid"
              value={employee.branchid}
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
