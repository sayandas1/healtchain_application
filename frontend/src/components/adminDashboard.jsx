import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [result, setResult] = useState("");
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [healthStaffs, setHealthStaffs] = useState([]);

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
        const patientsData = data.filter((user) => user.role === "Patient");
        const doctorsData = data.filter((user) => user.role === "Doctor");
        const adminsData = data.filter((user) => user.role === "Admin");
        const healthStaffsData = data.filter(
          (user) => user.role === "Health Staff"
        );

        setUsers(data);
        setPatients(patientsData);
        setDoctors(doctorsData);
        setAdmins(adminsData);
        setHealthStaffs(healthStaffsData);
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

  // const handleDeleteUser = (userId) => {
  //   fetch(`http://localhost:5000/api/dashboard/users/${userId}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Update the respective users array based on their role
  //       const updatedPatients = patients.filter(
  //         (patient) => patient._id !== userId
  //       );
  //       setPatients(updatedPatients);

  //       const updatedDoctors = doctors.filter(
  //         (doctor) => doctor._id !== userId
  //       );
  //       setDoctors(updatedDoctors);

  //       const updatedAdmins = admins.filter((admin) => admin._id !== userId);
  //       setAdmins(updatedAdmins);

  //       const updatedHealthStaffs = healthStaffs.filter(
  //         (healthStaff) => healthStaff._id !== userId
  //       );
  //       setHealthStaffs(updatedHealthStaffs);
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting user:", error);
  //     });
  // };

  const handleDeleteUser = (userId, role) => {
    let deleteEndpoint = "";

    // Determine the delete endpoint based on the user's role
    if (role === "Patient") {
      deleteEndpoint = `http://localhost:5000/api/dashboard/users/patients/${userId}`;
    } else if (role === "Doctor") {
      deleteEndpoint = `http://localhost:5000/api/dashboard/users/doctors/${userId}`;
    } else if (role === "Admin") {
      deleteEndpoint = `http://localhost:5000/api/dashboard/users/admins/${userId}`;
    } else if (role === "Health Staff") {
      deleteEndpoint = `http://localhost:5000/api/dashboard/users/healthstaffs/${userId}`;
    }

    // Send a DELETE request to the appropriate endpoint
    fetch(deleteEndpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then(() => {
        // Refresh the user lists based on their roles
        if (role === "Patient") {
          setPatients((prevPatients) =>
            prevPatients.filter((patient) => patient._id !== userId)
          );
        } else if (role === "Doctor") {
          setDoctors((prevDoctors) =>
            prevDoctors.filter((doctor) => doctor._id !== userId)
          );
        } else if (role === "Admin") {
          setAdmins((prevAdmins) =>
            prevAdmins.filter((admin) => admin._id !== userId)
          );
        } else if (role === "Health Staff") {
          setHealthStaffs((prevHealthStaffs) =>
            prevHealthStaffs.filter((healthStaff) => healthStaff._id !== userId)
          );
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
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
            <option value="Admin">Admin</option>
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

      <div>
        <h2> Add users</h2>
        <div>
          <button onClick={() => navigate("/admin-registration")}>
            Add admin
          </button>
          <button onClick={() => navigate("/doctor-registration")}>
            Add doctor
          </button>
          <button onClick={() => navigate("/register")}>Add patient</button>
          <button onClick={() => navigate("/register-health-staff")}>
            Add health staff
          </button>
        </div>
      </div>

      {/* Display the result */}
      {result !== "" && <p>Sum: {result}</p>}

      <div>
        <h2>Patients List</h2>
        <ul>
          {patients?.map((patient) => (
            <li key={patient._id}>
              {patient.firstName} {patient.lastName} - Role: {patient.role}
              <Link to={`/edit_patient/${patient._id}`}>
                <button>Edit</button>
              </Link>
              <button
                onClick={() => handleDeleteUser(patient._id, patient.role)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Doctors List</h2>
        <ul>
          {doctors?.map((doctor) => (
            <li key={doctor._id}>
              {doctor.firstName} {doctor.lastName} - Role: {doctor.role}
              <button>Edit</button>
              <button onClick={() => handleDeleteUser(doctor._id, doctor.role)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Admins List</h2>
        <ul>
          {admins?.map((admin) => (
            <li key={admin._id}>
              {admin.firstName} {admin.lastName} - Role: {admin.role}
              <button>Edit</button>
              <button onClick={() => handleDeleteUser(admin._id, admin.role)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Health Staff List</h2>
        <ul>
          {healthStaffs?.map((healthStaff) => (
            <li key={healthStaff._id}>
              {healthStaff.firstName} {healthStaff.lastName} - Role:{" "}
              {healthStaff.role}
              <button>Edit</button>
              <button
                onClick={() =>
                  handleDeleteUser(healthStaff._id, healthStaff.role)
                }
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
