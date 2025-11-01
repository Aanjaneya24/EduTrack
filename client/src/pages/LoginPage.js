import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress, Backdrop, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff, LockOutlined, Email, Person, VpnKey } from '@mui/icons-material';
import SchoolIcon from '@mui/icons-material/School';
import bgpic from "../assets/students.jpg"
import { LightPurpleButton } from '../components/buttonStyles';
import styled from 'styled-components';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import { styled as muiStyled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const defaultTheme = createTheme();

const GlassEffect = muiStyled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(20px)',
  borderRadius: '24px',
  padding: '3rem',
  boxShadow: '0 8px 32px 0 rgba(99, 102, 241, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
}));

const StyledPaper = muiStyled(Paper)(({ theme }) => ({
  borderRadius: '24px',
  padding: '3rem 2.5rem',
  background: 'rgba(255, 255, 255, 0.98)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 25px 70px rgba(0, 0, 0, 0.2)',
  }
}));

const LogoText = muiStyled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #6366f1, #ec4899)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
}));

const LoginContainer = muiStyled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1.5rem 0',
  '& .MuiTextField-root': {
    marginBottom: '1.25rem',
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      transition: 'all 0.3s ease-in-out',
      backgroundColor: '#f8fafc',
      '&:hover': {
        backgroundColor: '#f1f5f9',
        '& fieldset': {
          borderColor: '#6366f1',
        }
      },
      '&.Mui-focused': {
        backgroundColor: 'white',
        '& fieldset': {
          borderColor: '#6366f1',
          borderWidth: '2px',
        }
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
            const rollNum = 1
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
            setGuestLoader(false)
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
            <PageContainer 
              component={motion.main} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
                <CssBaseline />
                <Grid container sx={{ height: '100vh' }}>
                  <Grid item xs={12} sm={8} md={5} 
                    component={motion.div}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: { xs: 2, sm: 4 }
                    }}
                  >
                    <StyledPaper elevation={6}>
                      <LoginContainer>
                        <motion.div
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          style={{ width: '100%' }}
                        >
                          <LogoText>
                            <SchoolIcon sx={{ fontSize: '2.5rem' }} />
                            EduTrack
                          </LogoText>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              mb: 3, 
                              color: "#64748b",
                              textAlign: 'center',
                              fontSize: '1rem',
                              letterSpacing: '0.3px'
                            }}
                          >
                            Welcome back! Please login to continue
                          </Typography>
                          <RoleBadge>
                            <LockOutlined sx={{ fontSize: 20, mr: 1 }} />
                            {role} Portal
                          </RoleBadge>
                        </motion.div>

                        <Box component="form" 
                          noValidate 
                          onSubmit={handleSubmit} 
                          sx={{ width: '100%', mt: 3 }}>
                          {role === "Student" ? (
                            <>
                              <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="rollNumber"
                                label="Roll Number"
                                name="rollNumber"
                                autoComplete="off"
                                type="number"
                                autoFocus
                                error={rollNumberError}
                                helperText={rollNumberError && 'Roll Number is required'}
                                onChange={handleInputChange}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <VpnKey sx={{ color: '#6366f1' }} />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                              <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="studentName"
                                label="Full Name"
                                name="studentName"
                                autoComplete="name"
                                error={studentNameError}
                                helperText={studentNameError && 'Name is required'}
                                onChange={handleInputChange}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Person sx={{ color: '#6366f1' }} />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </>
                          ) : (
                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="email"
                              label="Email Address"
                              name="email"
                              autoComplete="email"
                              autoFocus
                              error={emailError}
                              helperText={emailError && 'Email is required'}
                              onChange={handleInputChange}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Email sx={{ color: '#6366f1' }} />
                                  </InputAdornment>
                                ),
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
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LockOutlined sx={{ color: '#6366f1' }} />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton 
                                    onClick={() => setToggle(!toggle)}
                                    edge="end"
                                    sx={{ color: '#6366f1' }}
                                  >
                                    {toggle ? <Visibility /> : <VisibilityOff />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />

                          <Box sx={{ 
                            display: "flex", 
                            justifyContent: "flex-start",
                            alignItems: "center",
                            mt: 1,
                            mb: 2 
                          }}>
                            <FormControlLabel
                              control={
                                <Checkbox 
                                  sx={{
                                    color: '#6366f1',
                                    '&.Mui-checked': {
                                      color: '#6366f1',
                                    },
                                  }}
                                />
                              }
                              label={<Typography variant="body2">Remember me</Typography>}
                            />
                          </Box>

                          <StyledButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            component={motion.button}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loader}
                          >
                            {loader ? (
                              <CircularProgress size={24} color="inherit" />
                            ) : (
                              <>Sign In →</>
                            )}
                          </StyledButton>

                          <Divider sx={{ my: 3 }}>
                            <Typography variant="body2" color="text.secondary">
                              OR
                            </Typography>
                          </Divider>

                          <GuestButton
                            fullWidth
                            onClick={guestModeHandler}
                            variant="outlined"
                            component={motion.button}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={guestLoader}
                          >
                            {guestLoader ? (
                              <CircularProgress size={24} color="inherit" />
                            ) : (
                              <>Continue as Guest →</>
                            )}
                          </GuestButton>

                          {role === "Admin" && (
                            <Box sx={{ mt: 3, textAlign: 'center' }}>
                              <Typography variant="body2" color="text.secondary">
                                Don't have an account?{' '}
                                <StyledLink to="/Adminregister">
                                  Sign up now
                                </StyledLink>
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </LoginContainer>
                    </StyledPaper>
                  </Grid>

                  <HeroSide
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    component={motion.div}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <HeroOverlay />
                    <HeroContent
                      component={motion.div}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      <Typography 
                        variant="h2" 
                        sx={{ 
                          fontWeight: 900, 
                          mb: 3,
                          color: 'white',
                          textShadow: '0 4px 20px rgba(0,0,0,0.3)'
                        }}
                      >
                        Welcome to EduTrack
                      </Typography>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          mb: 4,
                          color: 'rgba(255,255,255,0.95)',
                          lineHeight: 1.6,
                          maxWidth: '500px',
                          textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                        }}
                      >
                        Your all-in-one platform for seamless educational management. 
                        Track attendance, manage classes, and connect with your institution.
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 3, mt: 4 }}>
                        <FeatureBox>
                          <Typography variant="h3" fontWeight={900} color="white">
                            5000+
                          </Typography>
                          <Typography variant="body1" color="rgba(255,255,255,0.9)">
                            Active Users
                          </Typography>
                        </FeatureBox>
                        <FeatureBox>
                          <Typography variant="h3" fontWeight={900} color="white">
                            100+
                          </Typography>
                          <Typography variant="body1" color="rgba(255,255,255,0.9)">
                            Institutions
                          </Typography>
                        </FeatureBox>
                        <FeatureBox>
                          <Typography variant="h3" fontWeight={900} color="white">
                            99.9%
                          </Typography>
                          <Typography variant="body1" color="rgba(255,255,255,0.9)">
                            Uptime
                          </Typography>
                        </FeatureBox>
                      </Box>
                    </HeroContent>
                  </HeroSide>
                </Grid>
            </PageContainer>
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

// Styled Components
const PageContainer = styled(Box)`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const RoleBadge = styled(Box)`
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.95rem;
  margin: 2rem 0 1.5rem 0;
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.25);
`;

const StyledButton = styled(Button)`
  && {
    margin-top: 1.5rem;
    height: 56px;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    text-transform: none;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
    transition: all 0.3s ease;
    
    &:hover {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4);
    }
    
    &:disabled {
      background: linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%);
    }
  }
`;

const GuestButton = styled(Button)`
  && {
    height: 56px;
    border-radius: 12px;
    font-size: 1.05rem;
    font-weight: 600;
    text-transform: none;
    color: #6366f1;
    border: 2px solid #6366f1;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: #4f46e5;
      background: rgba(99, 102, 241, 0.05);
    }
  }
`;

const HeroSide = styled(Grid)`
  background-image: linear-gradient(rgba(99, 102, 241, 0.8), rgba(139, 92, 246, 0.8)), url(${bgpic});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, 
    rgba(99, 102, 241, 0.9) 0%, 
    rgba(139, 92, 246, 0.85) 50%,
    rgba(236, 72, 153, 0.8) 100%
  );
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.3;
  }
`;

const HeroContent = styled(Box)`
  position: relative;
  z-index: 1;
  text-align: left;
`;

const FeatureBox = styled(Box)`
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-5px);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #6366f1;
  font-weight: 700;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled(Box)`
  display: flex;
  align-items: center;
  text-align: center;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e2e8f0;
  }
  
  &::before {
    margin-right: 1rem;
  }
  
  &::after {
    margin-left: 1rem;
  }
`;
