import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { AccountCircle, School, Group, ArrowForward } from '@mui/icons-material';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const password = "zxc"

  const { status, currentUser, currentRole } = useSelector(state => state.user);;

  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "John@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Adminlogin');
      }
    }

    else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = 1
        const studentName = "kite"
        const fields = { rollNum, studentName, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Studentlogin');
      }
    }

    else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "Aanjaneya Pandey"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Teacherlogin');
      }
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
    else if (status === 'error') {
      setLoader(false)
      setMessage("Network Error")
      setShowPopup(true)
    }
  }, [status, currentRole, navigate, currentUser]);

  const roles = [
    {
      icon: <AccountCircle sx={{ fontSize: 80 }} />,
      title: 'Admin',
      description: 'Access the dashboard to manage app data, users, and system settings',
      color: '#6366f1',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    },
    {
      icon: <School sx={{ fontSize: 80 }} />,
      title: 'Student',
      description: 'Explore course materials, track attendance, and view your academic progress',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    },
    {
      icon: <Group sx={{ fontSize: 80 }} />,
      title: 'Teacher',
      description: 'Create courses, manage assignments, and monitor student performance',
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    },
  ];

  return (
    <PageWrapper
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg">
        <HeaderSection
          component={motion.div}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 900, 
              mb: 2,
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Choose Your Role
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#64748b',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.8
            }}
          >
            Select your role to continue to EduTrack. Each role has unique features tailored to your needs.
          </Typography>
        </HeaderSection>

        <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
          {roles.map((role, index) => (
            <Grid item xs={12} sm={6} md={4} key={role.title}>
              <RoleCard
                component={motion.div}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -15, scale: 1.02 }}
                onClick={() => navigateHandler(role.title)}
                gradient={role.gradient}
              >
                <IconWrapper gradient={role.gradient}>
                  {role.icon}
                </IconWrapper>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 2,
                      color: '#0f172a'
                    }}
                  >
                    {role.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#64748b',
                      lineHeight: 1.7,
                      mb: 3
                    }}
                  >
                    {role.description}
                  </Typography>
                  <ContinueButton
                    component={motion.div}
                    whileHover={{ x: 5 }}
                    gradient={role.gradient}
                  >
                    Continue <ArrowForward sx={{ ml: 1, fontSize: 20 }} />
                  </ContinueButton>
                </CardContent>
              </RoleCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Backdrop
        sx={{ 
          color: '#fff', 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }}
        open={loader}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress color="inherit" size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading...
          </Typography>
        </Box>
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </PageWrapper>
  );
};

export default ChooseUser;

// Styled Components
const PageWrapper = styled(Box)`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const HeaderSection = styled(Box)`
  text-align: center;
  margin-bottom: 3rem;
`;

const RoleCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border-radius: 24px;
  border: 2px solid transparent;
  background: white;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: ${props => props.gradient};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }
  
  &:hover {
    border-color: transparent;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    
    &::before {
      transform: scaleX(1);
    }
  }
`;

const IconWrapper = styled(Box)`
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.gradient};
  border-radius: 50%;
  color: white;
  margin: 2rem auto 0;
  box-shadow: 0 15px 40px rgba(99, 102, 241, 0.3);
  transition: all 0.3s ease;
  
  ${RoleCard}:hover & {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 20px 50px rgba(99, 102, 241, 0.4);
  }
`;

const ContinueButton = styled(Box)`
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: ${props => props.gradient};
  color: white;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
  
  ${RoleCard}:hover & {
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
  }
`;