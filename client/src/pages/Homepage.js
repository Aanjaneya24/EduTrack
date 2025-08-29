import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button, Typography } from '@mui/material';
import styled from 'styled-components';
import Home from "../assets/Home.jpg";
import { LightPurpleButton } from '../components/buttonStyles';

const Homepage = () => {
    return (
        <StyledContainer>
            <Grid container spacing={0}>
                <Grid item xs={12} md={6}>
                    <ImageContainer>
                        <img src={Home} alt="education" style={{ 
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '20px'
                        }} />
                        <Overlay />
                    </ImageContainer>
                </Grid>
                <Grid item xs={12} md={6}>
                    <ContentWrapper elevation={3}>
                        <StyledTitle>
                                Transform Your
                                <br />
                                Educational
                                <br />
                                Journey with EduTrack
                        </StyledTitle>
                        <StyledText>
                            Streamline school management, organize classes, and enhance 
                            communication between students and faculty. Experience seamless 
                            attendance tracking, performance assessment, and instant feedback.
                        </StyledText>
                        <StyledBox>
                            <StyledLink to="/choose">
                                <LightPurpleButton 
                                    variant="contained" 
                                    fullWidth
                                    sx={{
                                        height: '3.5rem',
                                        fontSize: '1.1rem',
                                        background: 'linear-gradient(45deg, #7f56da 30%, #9869f4 90%)',
                                        boxShadow: '0 3px 5px 2px rgba(127, 86, 218, 0.3)',
                                        transition: 'all 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 6px 10px 4px rgba(127, 86, 218, 0.3)',
                                        }
                                    }}
                                >
                                    Get Started
                                </LightPurpleButton>
                            </StyledLink>
                            <StyledLink to="/chooseasguest">
                                <Button 
                                    variant="outlined" 
                                    fullWidth
                                    sx={{ 
                                        mt: 2, 
                                        mb: 3, 
                                        height: '3.5rem',
                                        fontSize: '1.1rem',
                                        color: "#7f56da", 
                                        borderColor: "#7f56da",
                                        '&:hover': {
                                            borderColor: "#9869f4",
                                            backgroundColor: 'rgba(127, 86, 218, 0.04)'
                                        }
                                    }}
                                >
                                    Explore as Guest
                                </Button>
                            </StyledLink>
                            <SignUpText>
                                New to EduTrack?{' '}
                                <Link to="/Adminregister" style={{
                                    color: "#7f56da",
                                    textDecoration: 'none',
                                    fontWeight: 600
                                }}>
                                    Create Account
                                </Link>
                            </SignUpText>
                        </StyledBox>
                    </ContentWrapper>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default Homepage;

const StyledContainer = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 2rem;
    background: linear-gradient(135deg, rgba(127, 86, 218, 0.05) 0%, rgba(255, 255, 255, 0.1) 100%);
`;

const ContentWrapper = styled.div`
    padding: 3rem 2rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ImageContainer = styled.div`
    position: relative;
    height: 100%;
    min-height: 500px;
    overflow: hidden;
    border-radius: 20px;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        45deg,
        rgba(127, 86, 218, 0.4) 0%,
        rgba(127, 86, 218, 0.1) 100%
    );
    border-radius: 20px;
`;

const LogoText = styled(Typography)`
    font-size: 2rem;
    font-weight: 800;
    background: linear-gradient(45deg, #7f56da, #9869f4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 2rem;
`;

const StyledTitle = styled.h1`
    font-size: 3.5rem;
    color: #2c2143;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    
    @media (max-width: 768px) {
        font-size: 2.5rem;
    }
`;

const StyledText = styled.p`
    color: #666;
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    max-width: 500px;
`;

const StyledBox = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    width: 100%;
`;

const SignUpText = styled.p`
    color: #666;
    text-align: center;
    font-size: 1rem;
`;
