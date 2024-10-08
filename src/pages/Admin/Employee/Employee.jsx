import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import EditModal from "../../../components/Admin/Employee/EditEmployee";
import AddModal from "../../../components/Admin/Employee/AddEmployee";
import { RiEditLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
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

const EmployeeList = (id) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = () => {
    fetch("http://localhost:3000/api/employees")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employee data:", error));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleEditClick = (employee) => {
    setIsEditModalOpen(true);
    setSelectedEmployee(employee.userid);  // Pass the employee's ID here
  };

  const handleUpdate = () => {
    fetchEmployees(); // Refresh the menu items list
  };


  const handleCloseModal = () => {
    setSelectedEmployee(null);
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
  };

  const handleSaveNewEmployee = (formData) => {
    fetch("http://localhost:3000/api/employeeadd", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setEmployees((prev) => [...prev, data]);
        handleCloseModal();
      })
      .catch((error) => console.error("Error adding employee:", error));
  };

  const handleDelete = (employeeId) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    fetch(`http://localhost:3000/api/employees/${employeeId}`, {
      method: "DELETE",
    })
      .then((response) => response.ok && setEmployees((prev) => prev.filter((e) => e.userid !== employeeId)))
      .catch((error) => console.error("Error deleting employee:", error));
  };

  return (
    <main className="page-wrapper">
      <Sidebar />
      <div className="content-wrapper">
        <div>
          <div className="emp-header-container">
            <button className="admin-add-product-button" onClick={handleAddClick}>
              Add Employee
            </button>
            <h1>Employee Account</h1>
          </div>
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

        {isEditModalOpen && selectedEmployee && (
          <EditModal
            employeeId={selectedEmployee}  // Pass employeeId properly
            onClose={handleCloseModal}
            onSave={handleUpdate}
          />
        )}

        {isAddModalOpen && (
          <AddModal
            onClose={handleCloseModal}
            onSave={handleSaveNewEmployee} // Pass the save handler
          />
        )}
      </div>
    </main>
  );
};

export default EmployeeList;
