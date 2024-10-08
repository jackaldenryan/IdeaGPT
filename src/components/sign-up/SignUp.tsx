// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormLabel from '@mui/material/FormLabel';
// import FormControl from '@mui/material/FormControl';
// import Link from '@mui/material/Link';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
// import MuiCard from '@mui/material/Card';
// import {
//   createTheme,
//   ThemeProvider,
//   styled,
//   PaletteMode,
// } from '@mui/material/styles';
// import getSignUpTheme from './theme/getSignUpTheme';
// import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
// import TemplateFrame from './TemplateFrame';

// const Card = styled(MuiCard)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   alignSelf: 'center',
//   width: '100%',
//   padding: theme.spacing(4),
//   gap: theme.spacing(2),
//   margin: 'auto',
//   boxShadow:
//     'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
//   [theme.breakpoints.up('sm')]: {
//     width: '450px',
//   },
//   ...theme.applyStyles('dark', {
//     boxShadow:
//       'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
//   }),
// }));

// const SignUpContainer = styled(Stack)(({ theme }) => ({
//   minHeight: '100%',
//   padding: theme.spacing(2),
//   [theme.breakpoints.up('sm')]: {
//     padding: theme.spacing(4),
//   },
//   backgroundImage:
//     'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
//   backgroundRepeat: 'no-repeat',
//   ...theme.applyStyles('dark', {
//     backgroundImage:
//       'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
//   }),
// }));

// export default function SignUp() {
//   const [mode, setMode] = React.useState<PaletteMode>('light');
//   const [showCustomTheme, setShowCustomTheme] = React.useState(true);
//   const defaultTheme = createTheme({ palette: { mode } });
//   const SignUpTheme = createTheme(getSignUpTheme(mode));
//   const [nameError, setNameError] = React.useState(false);
//   const [nameErrorMessage, setNameErrorMessage] = React.useState('');
//   const [emailError, setEmailError] = React.useState(false);
//   const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
//   const [passwordError, setPasswordError] = React.useState(false);
//   const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
//   // This code only runs on the client side, to determine the system color preference
//   React.useEffect(() => {
//     // Check if there is a preferred mode in localStorage
//     const savedMode = localStorage.getItem('themeMode') as PaletteMode | null;
//     if (savedMode) {
//       setMode(savedMode);
//     } else {
//       // If no preference is found, it uses system preference
//       const systemPrefersDark = window.matchMedia(
//         '(prefers-color-scheme: dark)',
//       ).matches;
//       setMode(systemPrefersDark ? 'dark' : 'light');
//     }
//   }, []);

//   const toggleColorMode = () => {
//     const newMode = mode === 'dark' ? 'light' : 'dark';
//     setMode(newMode);
//     localStorage.setItem('themeMode', newMode); // Save the selected mode to localStorage
//   };

//   const toggleCustomTheme = () => {
//     setShowCustomTheme((prev) => !prev);
//   };

//   const validateInputs = () => {
//     const email = document.getElementById('email') as HTMLInputElement;
//     const password = document.getElementById('password') as HTMLInputElement;
//     const name = document.getElementById('name') as HTMLInputElement;

//     let isValid = true;

//     if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
//       setEmailError(true);
//       setEmailErrorMessage('Please enter a valid email address.');
//       isValid = false;
//     } else {
//       setEmailError(false);
//       setEmailErrorMessage('');
//     }

//     if (!password.value || password.value.length < 6) {
//       setPasswordError(true);
//       setPasswordErrorMessage('Password must be at least 6 characters long.');
//       isValid = false;
//     } else {
//       setPasswordError(false);
//       setPasswordErrorMessage('');
//     }

//     if (!name.value || name.value.length < 1) {
//       setNameError(true);
//       setNameErrorMessage('Name is required.');
//       isValid = false;
//     } else {
//       setNameError(false);
//       setNameErrorMessage('');
//     }

//     return isValid;
//   };

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     if (nameError || emailError || passwordError) {
//       event.preventDefault();
//       return;
//     }
//     const data = new FormData(event.currentTarget);
//     console.log({
//       name: data.get('name'),
//       lastName: data.get('lastName'),
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };

//   return (
//       <ThemeProvider theme={showCustomTheme ? SignUpTheme : defaultTheme}>
//         <CssBaseline enableColorScheme />
//         <SignUpContainer direction="column" justifyContent="space-between">
//           <Card variant="outlined">
//             {/* <SitemarkIcon /> */}
//             <Typography
//               component="h1"
//               variant="h4"
//               sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
//             >
//               Sign up
//             </Typography>
//             <Box
//               component="form"
//               onSubmit={handleSubmit}
//               sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
//             >
//               <FormControl>
//                 <FormLabel htmlFor="name">Full name</FormLabel>
//                 <TextField
//                   autoComplete="name"
//                   name="name"
//                   required
//                   fullWidth
//                   id="name"
//                   placeholder="Jon Snow"
//                   error={nameError}
//                   helperText={nameErrorMessage}
//                   color={nameError ? 'error' : 'primary'}
//                 />
//               </FormControl>
//               <FormControl>
//                 <FormLabel htmlFor="email">Email</FormLabel>
//                 <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   placeholder="your@email.com"
//                   name="email"
//                   autoComplete="email"
//                   variant="outlined"
//                   error={emailError}
//                   helperText={emailErrorMessage}
//                   color={passwordError ? 'error' : 'primary'}
//                 />
//               </FormControl>
//               <FormControl>
//                 <FormLabel htmlFor="password">Password</FormLabel>
//                 <TextField
//                   required
//                   fullWidth
//                   name="password"
//                   placeholder="••••••"
//                   type="password"
//                   id="password"
//                   autoComplete="new-password"
//                   variant="outlined"
//                   error={passwordError}
//                   helperText={passwordErrorMessage}
//                   color={passwordError ? 'error' : 'primary'}
//                 />
//               </FormControl>
//               <FormControlLabel
//                 control={<Checkbox value="allowExtraEmails" color="primary" />}
//                 label="I want to receive updates via email."
//               />
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 onClick={validateInputs}
//               >
//                 Sign up
//               </Button>
//               <Typography sx={{ textAlign: 'center' }}>
//                 Already have an account?{' '}
//                 <span>
//                   <Link
//                     href="/sign-in/"
//                     variant="body2"
//                     sx={{ alignSelf: 'center' }}
//                   >
//                     Sign in
//                   </Link>
//                 </span>
//               </Typography>
//             </Box>
//             {/* TODO: add logins */}
//             {/* <Divider>
//               <Typography sx={{ color: 'text.secondary' }}>or</Typography>
//             </Divider>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//               <Button
//                 fullWidth
//                 variant="outlined"
//                 onClick={() => alert('Sign up with Google')}
//                 startIcon={<GoogleIcon />}
//               >
//                 Sign up with Google
//               </Button>
//               <Button
//                 fullWidth
//                 variant="outlined"
//                 onClick={() => alert('Sign up with Facebook')}
//                 startIcon={<FacebookIcon />}
//               >
//                 Sign up with Facebook
//               </Button>
//             </Box> */}
//           </Card>
//         </SignUpContainer>
//       </ThemeProvider>
//   );
// }


// src/components/sign-up/SignUp.tsx

"use client";

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import {
  createTheme,
  ThemeProvider,
  styled,
  PaletteMode,
} from '@mui/material/styles';
import getSignUpTheme from './theme/getSignUpTheme';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
import { supabase } from '@/supabaseClient';
import { useRouter } from 'next/navigation';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh', // Ensure it takes full viewport height
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  ...theme.applyStyles('dark', {
    backgroundImage:
      'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  }),
}));

interface SignUpProps {
  disableCustomTheme?: boolean;
}

export default function SignUp({ disableCustomTheme }: SignUpProps) {
  const [mode, setMode] = useState<PaletteMode>('light');
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignUpTheme = createTheme(getSignUpTheme(mode));

  // Form state
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  // Error states
  const [nameError, setNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [generalError, setGeneralError] = useState<string>('');

  // Loading state
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  // Determine theme mode on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as PaletteMode | null;
    if (savedMode) {
      setMode(savedMode);
    } else {
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  // Input validation
  const validateInputs = (): boolean => {
    let isValid = true;

    // Reset errors
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    if (!name.trim()) {
      setNameError('Name is required.');
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError('Email is required.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    }

    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    setGeneralError('');

    try {
      const { data, error } = await supabase.auth.signUp(
        {
          email,
          password,
          options: {
              data: {
                full_name: name,
              }
          }
        }, 
      );

      if (error) {
        setGeneralError(error.message);
      } else {
        // Optionally, inform the user to check their email for confirmation
        // Redirect to sign-in page or show a success message
        router.push('/sign-in');
      }
    } catch (err) {
      setGeneralError('An unexpected error occurred. Please try again.');
      console.error('Sign-up error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle social sign-up
  const handleGoogleSignUp = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) setGeneralError(error.message);
  };

  const handleFacebookSignUp = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'facebook' });
    if (error) setGeneralError(error.message);
  };

  return (
    <ThemeProvider theme={showCustomTheme ? SignUpTheme : defaultTheme}>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="center">
        <Card variant="outlined">
          {/* <SitemarkIcon /> */}
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center' }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Full Name</FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="Jon Snow"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={Boolean(nameError)}
                helperText={nameError}
                color={Boolean(nameError) ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(emailError)}
                helperText={emailError}
                color={Boolean(emailError) ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(passwordError)}
                helperText={passwordError}
                color={Boolean(passwordError) ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  value="allowExtraEmails"
                  color="primary"
                />
              }
              label="I want to receive updates via email."
            />
            {generalError && (
              <Typography color="error" variant="body2">
                {generalError}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link href="/sign-in" variant="body2">
                Sign in
              </Link>
            </Typography>
          </Box>
          {/* <Divider sx={{ my: 2 }}>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleGoogleSignUp}
              startIcon={<GoogleIcon />}
            >
              Sign up with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleFacebookSignUp}
              startIcon={<FacebookIcon />}
            >
              Sign up with Facebook
            </Button>
          </Box> */}
        </Card>
      </SignUpContainer>
    </ThemeProvider>
  );
}