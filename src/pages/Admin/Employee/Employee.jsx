import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import EditModal from "./EditEmployee"; // Import the new EditModal component
import { RiEditLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import "./Employee.css";

const TABLE_HEADS = [
  "UserID",
  "UserType",
  "FirstName",
  "LastName",
  "Email",
  "Branch",
  "Action",
];

const EmployeeList = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]); // State to hold user data

  // Fetch data from the API when the component mounts
  const fetchEmployees = () => {
    fetch("http://localhost:3000/api/employees") // Ensure this matches your Express route
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employee data:", error));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
    setIsEditModalOpen(false);
  };

  const handleSaveChanges = (updatedEmployee) => {
    // Send updated data to server (PUT request)
    fetch(`http://localhost:3000/api/employeesedit/${updatedEmployee.userid}`, {
      method: "PUT", // or PATCH depending on your API
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEmployee),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        // Optionally update the local employees state immediately
        setEmployees((prevEmployees) =>
          prevEmployees.map((emp) =>
            emp.userid === updatedEmployee.userid ? updatedEmployee : emp
          )
        );

        // Re-fetch all employees to ensure the latest data from server
        fetchEmployees();

        handleCloseModal();
      })
      .catch((error) => console.error("Error updating employee:", error));
  };

  const handleDelete = (employeeId) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return; // Cancel the deletion if the user doesn't confirm
    }

    // Send DELETE request to server
    fetch(`http://localhost:3000/api/employees/${employeeId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete employee");
        }
        // Remove employee from local state after successful deletion
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.userid !== employeeId)
        );
      })
      .catch((error) => console.error("Error deleting employee:", error));
  };

  return (
    <main className="page-wrapper">
      <Sidebar />
      <div className="content-wrapper">
        <div>
          <h1>Employee Account</h1>
          <section className="emplo-content-area-table">
            <div className="emplo-data-table-diagram">
              <table>
                <thead>
                  <tr>
                    {TABLE_HEADS.map((th, index) => (
                      <th key={index}>{th}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.userid}>
                      <td>{employee.userid}</td>
                      <td>{employee.usertype}</td>
                      <td>{employee.firstname}</td>
                      <td>{employee.lastname}</td>
                      <td>{employee.email}</td>
                      <td>{employee.branch}</td>
                      <td className="emplo-dt-cell-action">
                        <i>
                        <AiOutlineUserAdd size={25}/>
                        </i>
                        <i onClick={() => handleEditClick(employee)}>
                          <RiEditLine size={25} />
                        </i>
                        <i onClick={() => handleDelete(employee.userid)}>
                          <MdDeleteOutline size={25} />
                        </i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {isEditModalOpen && (
          <EditModal
            employeeData={selectedEmployee}
            onClose={handleCloseModal}
            onSave={handleSaveChanges}
          />
        )}
      </div>
    </main>
  );
};

export default EmployeeList;
