import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [result, setResult] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    // Fetch list of users (patients, doctors, health staff, and admins) from the server
    fetch("http://localhost:5000/api/dashboard/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Include the token in the Authorization header
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });

    // Check if the logged-in user is an admin
    const decodedToken = jwtDecode(token);
    setIsAdmin(decodedToken.role === "Admin");
  }, []);

  const handleRoleAssignment = () => {
    // Send a request to the server to assign a role to a user
    fetch(
      `http://localhost:5000/api/dashboard/users/admin/assign-role/${selectedUserId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include the token in the Authorization header
          Authorization: token,
        },
        body: JSON.stringify({ role: selectedRole }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Refresh the list of users
        setUsers(data);
        setSelectedUserId("");
        setSelectedRole("");
      });
  };

  const handleLogout = () => {
    // Clear token and redirect to login
    localStorage.removeItem("jwtToken");
    navigate("/");
  };

  const calculateSum = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/calculate-sum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numbers: [2, 4, 6, 8, 10] }), // Example input data
      });

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {isAdmin && (
        <div>
          <h2>Assign Roles</h2>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="">Select a User</option>
            {users?.map((user) => (
              <option key={user._id} value={user._id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">Select a Role</option>
            <option value="Doctor">Doctor</option>
            <option value="Patient">Patient</option>
            <option value="Health Staff">Health Staff</option>{" "}
            {/* Include Health Staff role */}
          </select>
          <button onClick={handleRoleAssignment}>Assign Role</button>
        </div>
      )}
      <h2>Users</h2>
      <ul>
        {users?.map((user) => (
          <li key={user._id}>
            {user.firstName} {user.lastName} - Role: {user.role}
          </li>
        ))}
      </ul>
      <button onClick={handleLogout}>Logout</button>
      {/* Button to trigger the calculation */}
      <button onClick={calculateSum}>Calculate Sum</button>

      {/* Display the result */}
      {result !== "" && <p>Sum: {result}</p>}
    </div>
  );
};

export default AdminDashboard;
