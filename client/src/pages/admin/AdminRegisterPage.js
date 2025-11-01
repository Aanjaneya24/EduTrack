import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff, LockOutlined, Email, Person, School as SchoolIcon, Business } from '@mui/icons-material';
import bgpic from "../../assets/designlogin.jpg"
import { LightPurpleButton } from '../../components/buttonStyles';
import { registerUser } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { styled as muiStyled } from '@mui/material/styles';
import Popup from '../../components/Popup';

const defaultTheme = createTheme();

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

const RegisterContainer = muiStyled(Box)(({ theme }) => ({
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

const AdminRegisterPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);;

    const [toggle, setToggle] = useState(false)
    const [loader, setLoader] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [adminNameError, setAdminNameError] = useState(false);
    const [schoolNameError, setSchoolNameError] = useState(false);
    const role = "Admin"

    const handleSubmit = (event) => {
        event.preventDefault();

        const name = event.target.adminName.value;
        const schoolName = event.target.schoolName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!name || !schoolName || !email || !password) {
            if (!name) setAdminNameError(true);
            if (!schoolName) setSchoolNameError(true);
            if (!email) setEmailError(true);
            if (!password) setPasswordError(true);
            return;
        }

        const fields = { name, email, password, role, schoolName }
        setLoader(true)
        dispatch(registerUser(fields, role))
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'adminName') setAdminNameError(false);
        if (name === 'schoolName') setSchoolNameError(false);
    };

    useEffect(() => {
        if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) {
            navigate('/Admin/dashboard');
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            console.log(error)
        }
    }, [status, currentUser, currentRole, navigate, error, response]);

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
                            <RegisterContainer>
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
                                            mb: 2, 
                                            color: "#64748b",
                                            textAlign: 'center',
                                            fontSize: '1rem',
                                            letterSpacing: '0.3px'
                                        }}
                                    >
                                        Create your own school and manage your institution
                                    </Typography>
                                    <RoleBadge>
                                        <Business sx={{ fontSize: 20, mr: 1 }} />
                                        Admin Registration
                                    </RoleBadge>
                                </motion.div>
                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%', mt: 3 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="adminName"
                                        label="Full Name"
                                        name="adminName"
                                        autoComplete="name"
                                        autoFocus
                                        error={adminNameError}
                                        helperText={adminNameError && 'Name is required'}
                                        onChange={handleInputChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Person sx={{ color: '#6366f1' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="schoolName"
                                        label="School Name"
                                        name="schoolName"
                                        autoComplete="off"
                                        error={schoolNameError}
                                        helperText={schoolNameError && 'School name is required'}
                                        onChange={handleInputChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SchoolIcon sx={{ color: '#6366f1' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
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

                                    <Grid container sx={{ 
                                        display: "flex", 
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        mt: 1,
                                        mb: 2 
                                    }}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox 
                                                    value="remember" 
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
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                color: '#6366f1', 
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    textDecoration: 'underline'
                                                }
                                            }}
                                        >
                                            Terms & Conditions
                                        </Typography>
                                    </Grid>

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
                                            <>Create Account →</>
                                        )}
                                    </StyledButton>

                                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Already have an account?{' '}
                                            <StyledLink to="/Adminlogin">
                                                Log in now
                                            </StyledLink>
                                        </Typography>
                                    </Box>
                                </Box>
                            </RegisterContainer>
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
                                Start Your Journey
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
                                Create your educational institution on EduTrack and unlock powerful 
                                management tools for students, teachers, and administrators.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 3, mt: 4 }}>
                                <FeatureBox>
                                    <Typography variant="h3" fontWeight={900} color="white">
                                        Free
                                    </Typography>
                                    <Typography variant="body1" color="rgba(255,255,255,0.9)">
                                        Forever Plan
                                    </Typography>
                                </FeatureBox>
                                <FeatureBox>
                                    <Typography variant="h3" fontWeight={900} color="white">
                                        2 Min
                                    </Typography>
                                    <Typography variant="body1" color="rgba(255,255,255,0.9)">
                                        Setup Time
                                    </Typography>
                                </FeatureBox>
                                <FeatureBox>
                                    <Typography variant="h3" fontWeight={900} color="white">
                                        24/7
                                    </Typography>
                                    <Typography variant="body1" color="rgba(255,255,255,0.9)">
                                        Support
                                    </Typography>
                                </FeatureBox>
                            </Box>
                        </HeroContent>
                    </HeroSide>
                </Grid>
            </PageContainer>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </ThemeProvider>
    );
}

export default AdminRegisterPage

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
