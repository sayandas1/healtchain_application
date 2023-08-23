import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import RegistrationForm from "./components/RegistrationForm";
import DoctorRegistrationForm from "./components/doctorRegistrationForm";
import AdminRegistrationForm from "./components/adminRegistrationForm";
import HealthStaffRegistration from "./components/healthStaffRegistration"; // Import the HealthStaffRegistrationForm component
import AdminDashboard from "./components/adminDashboard"; // Import the AdminDashboard component
import DoctorDashboard from "./components/doctorDashboard"; // Import the DoctorDashboard component
import PatientDashboard from "./components/patientDashboard"; // Import the PatientDashboard component
import AdmissionForm from "./components/Admission";
import DischargeForm from "./components/Discharge";
import UploadImagesForm from "./components/UploadImagesForm";
import HealthStaffDashboard from "./components/healthStaffDashbaord";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignUp />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route
            path="/doctor-registration"
            element={<DoctorRegistrationForm />}
          />
          <Route
            path="/admin-registration"
            element={<AdminRegistrationForm />}
          />
          <Route
            path="/register-health-staff"
            element={<HealthStaffRegistration />}
          />{" "}
          {/* Route for Health Staff Registration */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />{" "}
          {/* Route for Admin Dashboard */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />{" "}
          {/* Route for Doctor Dashboard */}
          <Route
            path="/health-staff-dashboard"
            element={<HealthStaffDashboard />}
          />{" "}
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          {/* Route for Patient Dashboard */}
          {/* <Route path="/admission" element={<AdmissionForm />} /> */}
          {/* Route to the Admission Form */}
          <Route path="/admission" element={<AdmissionForm />} />
          <Route path="/discharge" element={<DischargeForm />} />
          <Route path="/upload-images-form" element={<UploadImagesForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
