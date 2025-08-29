import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress, Backdrop } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from "../assets/students.jpg"
import { LightPurpleButton } from '../components/buttonStyles';
import styled from 'styled-components';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import { styled as muiStyled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const defaultTheme = createTheme();

const GlassEffect = muiStyled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(127, 86, 218, 0.2) 0%, rgba(255, 255, 255, 0.2) 100%)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  padding: '2rem',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
}));

const StyledPaper = muiStyled(Paper)(({ theme }) => ({
  borderRadius: '20px',
  padding: '2rem',
  background: 'rgba(255, 255, 255, 0.95)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  backdropFilter: 'blur(4px)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
}));

const LogoText = muiStyled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 800,
  background: 'linear-gradient(45deg, #7f56da, #9869f4)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '0.5rem',
}));

const LoginContainer = muiStyled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '2rem',
  '& .MuiTextField-root': {
    marginBottom: '1rem',
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
      transition: 'all 0.3s ease-in-out',
      '&:hover fieldset': {
        borderColor: '#7f56da',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#7f56da',
        borderWidth: '2px',
      }
    },
  },
}));

const LoginPage = ({ role }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);;

    const [toggle, setToggle] = useState(false)
    const [guestLoader, setGuestLoader] = useState(false)
    const [loader, setLoader] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rollNumberError, setRollNumberError] = useState(false);
    const [studentNameError, setStudentNameError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (role === "Student") {
            const rollNum = event.target.rollNumber.value;
            const studentName = event.target.studentName.value;
            const password = event.target.password.value;

            if (!rollNum || !studentName || !password) {
                if (!rollNum) setRollNumberError(true);
                if (!studentName) setStudentNameError(true);
                if (!password) setPasswordError(true);
                return;
            }
            const fields = { rollNum, studentName, password }
            setLoader(true)
            dispatch(loginUser(fields, role))
        }

        else {
            const email = event.target.email.value;
            const password = event.target.password.value;

            if (!email || !password) {
                if (!email) setEmailError(true);
                if (!password) setPasswordError(true);
                return;
            }

            const fields = { email, password }
            setLoader(true)
            dispatch(loginUser(fields, role))
        }
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'rollNumber') setRollNumberError(false);
        if (name === 'studentName') setStudentNameError(false);
    };

    const guestModeHandler = () => {
        const password = "zxc"

        if (role === "Admin") {
            const email = "John@12"
            const fields = { email, password }
            setGuestLoader(true)
            dispatch(loginUser(fields, role))
        }
        else if (role === "Student") {
            const rollNum = "1"
            const studentName = "kite"
            const fields = { rollNum, studentName, password }
            setGuestLoader(true)
            dispatch(loginUser(fields, role))
        }
        else if (role === "Teacher") {
            const email = "Aanjaneya"
            const fields = { email, password }
            setGuestLoader(true)
            dispatch(loginUser(fields, role))
        }
    }

    useEffect(() => {
        if (status === 'success' || currentUser !== null) {
            if (currentRole === 'Admin') {
                navigate('/Admin/dashboard');
            }
            else if (currentRole === 'Student') {
                navigate('/Student/dashboard');
            } else if (currentRole === 'Teacher') {
                navigate('/Teacher/dashboard');
            }
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
            setLoader(false)
            setGuestLoader(false)
        }
    }, [status, currentRole, navigate, error, response, currentUser]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component={motion.main} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              sx={{ 
                height: '100vh',
                background: 'linear-gradient(135deg, rgba(127, 86, 218, 0.05) 0%, rgba(255, 255, 255, 0.1) 100%)',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '100%',
                  background: 'radial-gradient(circle at top left, rgba(127, 86, 218, 0.1) 0%, transparent 60%)',
                  pointerEvents: 'none',
                }
              }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} 
                  component={motion.div}
                  initial={{ x: -100 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.5 }}>
                  <StyledPaper elevation={6}>
                    <LoginContainer>
                      <motion.div
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <LogoText>
                          EduTrack
                        </LogoText>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            mb: 1, 
                            color: "#666",
                            textAlign: 'center',
                            fontSize: '1rem',
                            letterSpacing: '0.5px'
                          }}
                        >
                          Your Educational Journey Simplified
                        </Typography>
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            mt: 4,
                            mb: 2, 
                            color: "#2c2143",
                            fontWeight: 600,
                            textAlign: 'center' 
                          }}
                        >
                          {role} Login
                        </Typography>
                      </motion.div>

                      <Box component="form" 
                        noValidate 
                        onSubmit={handleSubmit} 
                        sx={{ width: '100%', mt: 2 }}>
                        {role === "Student" ? (
                          <>
                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="rollNumber"
                              label="Enter your Roll Number"
                              name="rollNumber"
                              autoComplete="off"
                              type="number"
                              autoFocus
                              error={rollNumberError}
                              helperText={rollNumberError && 'Roll Number is required'}
                              onChange={handleInputChange}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  backgroundColor: '#f8f9fa',
                                }
                              }}
                            />
                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="studentName"
                              label="Enter your name"
                              name="studentName"
                              autoComplete="name"
                              autoFocus
                              error={studentNameError}
                              helperText={studentNameError && 'Name is required'}
                              onChange={handleInputChange}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  backgroundColor: '#f8f9fa',
                                }
                              }}
                            />
                          </>
                        ) : (
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Enter your email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={emailError}
                            helperText={emailError && 'Email is required'}
                            onChange={handleInputChange}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: '#f8f9fa',
                              }
                            }}
                          />
                        )}
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type={toggle ? 'text' : 'password'}
                          id="password"
                          autoComplete="current-password"
                          error={passwordError}
                          helperText={passwordError && 'Password is required'}
                          onChange={handleInputChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={() => setToggle(!toggle)}>
                                  {toggle ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              backgroundColor: '#f8f9fa',
                            }
                          }}
                        />

                        <Grid container sx={{ 
                          display: "flex", 
                          justifyContent: "space-between",
                          mb: 2 
                        }}>
                          <FormControlLabel
                            control={
                              <Checkbox 
                                sx={{
                                  color: '#7f56da',
                                  '&.Mui-checked': {
                                    color: '#7f56da',
                                  },
                                }}
                              />
                            }
                            label="Remember me"
                          />

                        </Grid>

                        <LightPurpleButton
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ 
                            mt: 3,
                            height: '3.5rem',
                            borderRadius: '10px',
                            fontSize: '1.1rem',
                            textTransform: 'none',
                            background: 'linear-gradient(45deg, #7f56da 30%, #9869f4 90%)',
                            boxShadow: '0px 4px 12px rgba(127, 86, 218, 0.2)',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: '0px 6px 15px rgba(127, 86, 218, 0.3)',
                              background: 'linear-gradient(45deg, #9869f4 30%, #7f56da 90%)',
                            }
                          }}
                        >
                          {loader ? (
                            <CircularProgress size={24} color="inherit" />
                          ) : "Sign In"}
                        </LightPurpleButton>

                        <Button
                          fullWidth
                          onClick={guestModeHandler}
                          variant="outlined"
                          sx={{ 
                            mt: 2,
                            mb: 3,
                            height: '3.5rem',
                            borderRadius: '10px',
                            fontSize: '1.1rem',
                            textTransform: 'none',
                            color: "#7f56da",
                            borderColor: "#7f56da",
                            '&:hover': {
                              backgroundColor: 'rgba(127, 86, 218, 0.04)',
                              borderColor: "#7f56da",
                            }
                          }}
                        >
                          {guestLoader ? (
                            <CircularProgress size={24} color="inherit" />
                          ) : "Login as Guest"}
                        </Button>

                        {role === "Admin" && (
                          <Grid container justifyContent="center" spacing={1}>
                            <Grid item>
                              <Typography color="textSecondary">
                                Don't have an account?
                              </Typography>
                            </Grid>
                            <Grid item>
                              <StyledLink to="/Adminregister">
                                Sign up
                              </StyledLink>
                            </Grid>
                          </Grid>
                        )}
                      </Box>
                    </LoginContainer>
                  </StyledPaper>
                </Grid>

                <Grid
                  item
                  xs={false}
                  sm={4}
                  md={7}
                  component={motion.div}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  sx={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${bgpic})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                      t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: { sm: '0 20px 20px 0' },
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                      background: 'linear-gradient(180deg, rgba(127, 86, 218, 0.2) 0%, rgba(0,0,0,0.7) 100%)',
                      borderRadius: { sm: '0 20px 20px 0' },
                    }
                  }}
                />
            </Grid>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={guestLoader}
            >
                <CircularProgress color="primary" />
                Please Wait
            </Backdrop>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </ThemeProvider>
    );
}

export default LoginPage

const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: #7f56da;
`;
