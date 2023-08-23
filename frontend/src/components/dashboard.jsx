// import React, { useEffect, useState } from 'react';
// import { Grid, Typography, Button } from '@mui/material';
// import UserTable from './userTable';
// import AdmissionForm from './Admission';
// import DischargeForm from './Discharge';
// import UploadImagesForm from './UploadImagesForm';
// import { Link } from 'react-router-dom';

// const Dashboard = () => {
//   const [userData, setUserData] = useState(null);
//   const [formData, setFormData] = useState({
//       admission: {
//       admissionDate: '',
//       admissionTime: '',
//       chiefProblem: '',
//       historyOfPresentIllness: '',
//       socialHistory: '',
//       familyHistory: '',
//       physicalExam: '',
//       medicationOnAdmission: '',
//       allergies: '',
//     },
//     discharge: {
//       dischargeDate: '',
//       dischargeTime: '',
//       dischargeSummary: '',
//       dischargeMedication: '',
//     },
//     uploadImages: {
//       chestXRay: null,
//       ctScanReport: null,
//       bloodReport: null,
//     },
//   });

//   useEffect(() => {
//     // Retrieve the token from local storage
//     const token = localStorage.getItem('jwtToken');
//     console.log('JWTtoken', token);

//     // Check if the token is valid and not expired
//     const isTokenValid = (token) => {
//       if (!token) return false;

//       const decodedToken = JSON.parse(atob(token.split('.')[1]));
//       const currentTime = Date.now() / 1000;

//       return decodedToken && decodedToken.exp > currentTime;
//     };

//     if (isTokenValid(token)) {
//       // Make the request to fetch user data
//       const fetchUserData = async (token) => {
//         try {
//           const response = await fetch('http://localhost:5000/api/dashboard/user-data', {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//               // Include the token in the Authorization header
//               Authorization: `Bearer ${token}`,
//             },
//           });

//           if (response.ok) {
//             const data = await response.json();
//             setUserData(data);
//           } else {
//             // Handle error responses
//             console.error('Failed to fetch user data:', response);
//           }
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//         }
//       };

//       fetchUserData(token);
//     } else {
//       // Redirect the user to the login page if the token is not valid or expired
//       // Replace '/login' with the actual login page URL
//       window.location.replace('/login');
//     }
//   }, []);
//   // useEffect(() => {
//   //   const fetchUserData = async () => {
//   //     try {
//   //       const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/dashboard/user-data`, {
//   //         method: 'GET',
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //           Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
//   //         },
//   //       });

//   //       if (response.ok) {
//   //         const data = await response.json();
//   //         setUserData(data);
//   //       } else {
//   //         console.error('Failed to fetch user data:', response);
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching user data:', error);
//   //     }
//   //   };

//   //   fetchUserData();
//   // }, []);
// //handle functions submit

// const handleAdmissionSubmit = async (formData) => {
//   // Handle the submission of admission form data
//   try {
//     const response = await fetch('http://localhost:5000/api/admission', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
//       },
//       body: JSON.stringify(formData),
//     });

//     if (response.ok) {
//       // Show a success message or update the UI accordingly
//     } else {
//       // Handle error responses
//       console.error('Failed to submit admission form:', response);
//     }
//   } catch (error) {
//     console.error('Error submitting admission form:', error);
//   }
// };

// const handleDischargeSubmit = async (formData) => {
//   // Handle the submission of discharge form data
//   try {
//     const response = await fetch('http://localhost:5000/api/discharge', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
//       },
//       body: JSON.stringify(formData),
//     });

//     if (response.ok) {
//       // Show a success message or update the UI accordingly
//     } else {
//       // Handle error responses
//       console.error('Failed to submit discharge form:', response);
//     }
//   } catch (error) {
//     console.error('Error submitting discharge form:', error);
//   }
// };

// const handleUploadImagesSubmit = async (formData) => {
//   // Handle the submission of upload images form data
//   try {
//     const formDataWithFiles = new FormData();
//     formDataWithFiles.append('chestXRay', formData.chestXRay);
//     formDataWithFiles.append('ctScanReport', formData.ctScanReport);
//     formDataWithFiles.append('bloodReport', formData.bloodReport);

//     const response = await fetch('http://localhost:5000/api/upload-images', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
//       },
//       body: formDataWithFiles,
//     });

//     if (response.ok) {
//       // Show a success message or update the UI accordingly
//     } else {
//       // Handle error responses
//       console.error('Failed to submit upload images form:', response);
//     }
//   } catch (error) {
//     console.error('Error submitting upload images form:', error);
//   }
// };

//   return (
//     <Grid container spacing={3}>
//       <Grid item xs={12}>
//         <Typography variant="h4">Welcome to the Dashboard</Typography>
//       </Grid>
//       <UserTable userData={userData} />
//       <Grid item xs={12}>

//         <Link to="/admission-form">Admission Form</Link>

//         <Link to="/discharge-form">Discharge Form</Link>

//         <Link to="/upload-images">Upload Images Form</Link>
//       </Grid>
//     </Grid>

//   );
// };

// export default Dashboard;
