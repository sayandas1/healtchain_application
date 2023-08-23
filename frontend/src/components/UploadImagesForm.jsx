// import React from 'react';
// import { Button, Typography } from '@mui/material';

// const UploadImagesForm = ({ formData, setFormData, onPrevious, onSubmit }) => {
//   const {
//     chestXRay,
//     ctScanReport,
//     bloodReport,
//   } = formData;

//   const handleChange = (e) => {
//     const { name, files } = e.target;
//     const file = files[0];
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: file,
//     }));
//   };

//   const handlePrevious = (e) => {
//     e.preventDefault();
//     onPrevious();
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit();
//   };

//   return (
//     <form style={{ margin: '30px', marginLeft: '10px', border: '2px solid red', padding: '20px' }}>
//       <Typography variant="h5" gutterBottom>
//         Upload Images
//       </Typography>
//       <input
//         type="file"
//         accept=".jpg, .jpeg, .png"
//         name="chestXRay"
//         onChange={handleChange}
//         required
//         style={{ marginBottom: '10px' }}
//       />
//       <input
//         type="file"
//         accept=".jpg, .jpeg, .png"
//         name="ctScanReport"
//         onChange={handleChange}
//         required
//         style={{ marginBottom: '10px' }}
//       />
//       <input
//         type="file"
//         accept=".jpg, .jpeg, .png"
//         name="bloodReport"
//         onChange={handleChange}
//         required
//         style={{ marginBottom: '10px' }}
//       />

//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <Button variant="contained" onClick={handlePrevious} style={{ marginRight: '20px' }}>
//           Previous
//         </Button>
//         <Button variant="contained" color="primary" onClick={handleSubmit}>
//           Submit
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default UploadImagesForm;

import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';

const UploadImages = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    chestXRay: null,
    ctScanReport: null,
    bloodReport: null,
  });

  const handleChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setFormData((prevData) => ({
      ...prevData,
      [name]: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form style={{ margin: '30px', marginLeft: '10px', border: '2px solid red', padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Upload Images
      </Typography>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        name="chestXRay"
        onChange={handleChange}
        required
        style={{ marginBottom: '10px' }}
      />
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        name="ctScanReport"
        onChange={handleChange}
        required
        style={{ marginBottom: '10px' }}
      />
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        name="bloodReport"
        onChange={handleChange}
        required
        style={{ marginBottom: '10px' }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default UploadImages;

