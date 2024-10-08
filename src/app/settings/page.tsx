// "use client";

// import * as React from "react";
// import {
//   Button,
//   Container,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   OutlinedInput,
//   Typography,
//   Box,
// } from "@mui/material";
// import { supabase } from "@/supabaseClient"; // Import your supabase client

// const SettingsPage: React.FC = () => {
//   const [openChangePassword, setOpenChangePassword] = React.useState(false);
//   const [newPassword, setNewPassword] = React.useState("");
//   const [errorMessage, setErrorMessage] = React.useState("");
//   const [successMessage, setSuccessMessage] = React.useState("");

//   // Handle Password Update
//   const handleUpdatePassword = async () => {
//     if (newPassword.length < 6) {
//       setErrorMessage("Password must be at least 6 characters long.");
//       return;
//     }

//     const { error } = await supabase.auth.updateUser({
//       password: newPassword,
//     });

//     if (error) {
//       setErrorMessage(error.message);
//     } else {
//       setSuccessMessage("Your password has been updated successfully.");
//       setOpenChangePassword(false); // Close the dialog after success
//     }
//   };

//   return (
//     <Container sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Settings
//       </Typography>

//       {/* Change Password Section */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           gap: 2,
//           mb: 4,
//           alignItems: "flex-start",
//         }}
//       >
//         <Button
//           variant="contained"
//           onClick={() => setOpenChangePassword(true)}
//           sx={{ maxWidth: "300px", width: "100%" }}
//         >
//           Change Password
//         </Button>
//       </Box>

//       {/* Change Password Dialog */}
//       <Dialog
//         open={openChangePassword}
//         onClose={() => setOpenChangePassword(false)}
//       >
//         <DialogTitle>Change Password</DialogTitle>
//         <DialogContent>
//           <DialogContentText>Enter your new password below.</DialogContentText>
//           {errorMessage && (
//             <DialogContentText color="error">{errorMessage}</DialogContentText>
//           )}
//           {successMessage && (
//             <DialogContentText color="success">
//               {successMessage}
//             </DialogContentText>
//           )}
//           <OutlinedInput
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             placeholder="Enter new password"
//             fullWidth
//             sx={{ mt: 2 }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenChangePassword(false)}>Cancel</Button>
//           <Button onClick={handleUpdatePassword} variant="contained">
//             Change Password
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default SettingsPage;

"use client";

import * as React from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  OutlinedInput,
  Typography,
  Box,
} from "@mui/material";
import { supabase } from "@/supabaseClient"; // Import your supabase client

const SettingsPage: React.FC = () => {
  const [openChangePassword, setOpenChangePassword] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [userEmail, setUserEmail] = React.useState<string | null>(null); // State to store user email

  // Fetch user email when the component mounts
  React.useEffect(() => {
    const fetchUserEmail = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email); // Set the user's email
      }
    };

    fetchUserEmail();
  }, []);

  // Handle Password Update
  const handleUpdatePassword = async () => {
    if (newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setSuccessMessage("Your password has been updated successfully.");
      setOpenChangePassword(false); // Close the dialog after success
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      {/* Display User Email */}
      {userEmail && (
        <Typography variant="body1" sx={{ mb: 2 }}>
          Email: {userEmail}
        </Typography>
      )}

      {/* Change Password Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mb: 4,
          alignItems: "flex-start",
        }}
      >
        <Button
          variant="contained"
          onClick={() => setOpenChangePassword(true)}
          sx={{ maxWidth: "300px", width: "100%" }}
        >
          Change Password
        </Button>
      </Box>

      {/* Change Password Dialog */}
      <Dialog
        open={openChangePassword}
        onClose={() => setOpenChangePassword(false)}
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your new password below.</DialogContentText>
          {errorMessage && (
            <DialogContentText color="error">{errorMessage}</DialogContentText>
          )}
          {successMessage && (
            <DialogContentText color="success">
              {successMessage}
            </DialogContentText>
          )}
          <OutlinedInput
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            fullWidth
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenChangePassword(false)}>Cancel</Button>
          <Button onClick={handleUpdatePassword} variant="contained">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SettingsPage;
