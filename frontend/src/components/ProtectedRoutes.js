// // ProtectedRoute.js
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ element: Component, isAuthenticated, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       element={isAuthenticated ? <Component /> : <Navigate to="/signin" replace />}
//     />
//   );
// };

// export default ProtectedRoute;
