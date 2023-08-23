// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Stepper, Step, StepLabel, Button, Typography, Container } from '@mui/material';
// import AdmissionForm from './Admission';
// import DischargeForm from './Discharge';
// import UploadImagesForm from './UploadImagesForm';

// const steps = ['Admission Details', 'Discharge Details', 'Upload Images'];

// const MultistepForm = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [formData, setFormData] = useState({
//     admissionDate: '',
//     admissionTime: '',
//     chiefProblem: '',
//     historyOfPresentIllness: '',
//     socialHistory: '',
//     familyHistory: '',
//     physicalExam: '',
//     medicationOnAdmission: '',
//     allergies: '',
//     dischargeDate: '',
//     dischargeTime: '',
//     dischargeSummary: '',
//     dischargeMedication: '',
//     chestXRay: null,
//     ctScanReport: null,
//     bloodReport: null,
//   });

//   const [formSubmitted, setFormSubmitted] = useState(false);

//   const navigate = useNavigate();
//   const handleGoToDashboard = () => {
//     navigate('/user-dashboard');
//   };

//   const handleNext = () => {
//     setActiveStep((prevStep) => prevStep + 1);
//   };

//   const handlePrevious = () => {
//     setActiveStep((prevStep) => prevStep - 1);
//   };

//   const handleSubmit = async () => {
//     try {
//       // Make API call to submit form data
//       const responseAdmission = await fetch('/api/admission', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
  
//       const responseDischarge = await fetch('/api/discharge', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
  
//       const responseUploadImages = await fetch('/api/upload-images', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
  
//       if (responseAdmission.ok && responseDischarge.ok && responseUploadImages.ok) {
//         console.log('Form submitted:', formData);
//         setFormSubmitted(true);
//       } else {
//         console.error('Error submitting form:', responseAdmission.status, responseDischarge.status, responseUploadImages.status);
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };
  

//   const getFormContent = (step) => {
//     switch (step) {
//       case 0:
//         return (
//           <AdmissionForm
//             formData={formData}
//             setFormData={setFormData}
//             onNext={handleNext}
//           />
//         );
//       case 1:
//         return (
//           <DischargeForm
//             formData={formData}
//             setFormData={setFormData}
//             onNext={handleNext}
//             onPrevious={handlePrevious}
//           />
//         );
//       case 2:
//         return (
//           <UploadImagesForm
//             formData={formData}
//             setFormData={setFormData}
//             onPrevious={handlePrevious}
//             onSubmit={handleSubmit}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   const ButtonGroup = () => {
//     return (
//       <React.Fragment>
//         {activeStep > 0 && (
//           <Button variant="contained" onClick={handlePrevious}>
//             Previous
//           </Button>
//         )}
//         {activeStep < steps.length - 1 ? (
//           <Button variant="contained" color="primary" onClick={handleNext}>
//             Next
//           </Button>
//         ) : (
//           <Button variant="contained" color="primary" onClick={handleSubmit}>
//             Submit
//           </Button>
//         )}
//         <Button variant="contained" color="primary" onClick={handleGoToDashboard}>
//           Go to User Dashboard
//         </Button>
//       </React.Fragment>
//     );
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4" align="center" gutterBottom>
//         Project 648 Covid Tracker
//       </Typography>
//       <Stepper variant="horizontal" activeStep={activeStep} alternativeLabel>
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       <div className="form-content">
//         {activeStep === steps.length ? (
//           formSubmitted ? (
//             <Typography variant="h5" align="center" gutterBottom>
//               Form submitted successfully!
//             </Typography>
//           ) : null
//         ) : (
//           <div>{getFormContent(activeStep)}</div>
//         )}
//       </div>
//       {ButtonGroup()}
//     </Container>
//   );
// };

// export default MultistepForm;
