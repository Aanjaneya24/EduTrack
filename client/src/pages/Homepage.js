import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button, Typography, Card, CardContent } from '@mui/material';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Home from "../assets/Home.jpg";
import SchoolIcon from '@mui/icons-material/School';
import AssessmentIcon from '@mui/icons-material/Assessment';
import GroupsIcon from '@mui/icons-material/Groups';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { LightPurpleButton } from '../components/buttonStyles';

const Homepage = () => {
    const features = [
        {
            icon: <SchoolIcon sx={{ fontSize: 40 }} />,
            title: 'Smart Learning',
            description: 'Track student progress and performance with intelligent insights'
        },
        {
            icon: <AssessmentIcon sx={{ fontSize: 40 }} />,
            title: 'Analytics Dashboard',
            description: 'Real-time data visualization and comprehensive reporting'
        },
        {
            icon: <GroupsIcon sx={{ fontSize: 40 }} />,
            title: 'Class Management',
            description: 'Organize classes, subjects, and schedules effortlessly'
        },
        {
            icon: <NotificationsActiveIcon sx={{ fontSize: 40 }} />,
            title: 'Instant Updates',
            description: 'Stay connected with real-time notifications and announcements'
        }
    ];

    return (
        <PageWrapper>
            {/* Hero Section */}
            <HeroSection>
                <Container maxWidth="xl">
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <LogoBadge>
                                    <SchoolIcon sx={{ fontSize: 28, mr: 1 }} />
                                    EduTrack
                                </LogoBadge>
                                <HeroTitle>
                                    Transform Your
                                    <GradientText> Educational Journey</GradientText>
                                </HeroTitle>
                                <HeroSubtitle>
                                    Streamline school management, organize classes, and enhance 
                                    communication between students and faculty with our all-in-one platform.
                                </HeroSubtitle>
                                <ButtonGroup>
                                    <StyledLink to="/choose">
                                        <PrimaryButton
                                            variant="contained"
                                            size="large"
                                            component={motion.button}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Get Started →
                                        </PrimaryButton>
                                    </StyledLink>
                                    <StyledLink to="/chooseasguest">
                                        <SecondaryButton
                                            variant="outlined"
                                            size="large"
                                            component={motion.button}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Explore as Guest
                                        </SecondaryButton>
                                    </StyledLink>
                                </ButtonGroup>
                                <SignUpText>
                                    New to EduTrack?{' '}
                                    <StyledRegisterLink to="/Adminregister">
                                        Create Account
                                    </StyledRegisterLink>
                                </SignUpText>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <HeroImageContainer>
                                    <HeroImage src={Home} alt="education" />
                                    <ImageOverlay />
                                    <FloatingCard
                                        component={motion.div}
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    >
                                        <CardContent>
                                            <Typography variant="h6" fontWeight={700}>
                                                🎓 5000+ Students
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Trust our platform
                                            </Typography>
                                        </CardContent>
                                    </FloatingCard>
                                </HeroImageContainer>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
            </HeroSection>

            {/* Features Section */}
            <FeaturesSection>
                <Container maxWidth="xl">
                    <SectionTitle
                        component={motion.div}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Typography variant="h3" fontWeight={800} gutterBottom>
                            Why Choose <GradientText>EduTrack</GradientText>?
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                            Everything you need to manage your educational institution efficiently
                        </Typography>
                    </SectionTitle>
                    
                    <Grid container spacing={4} sx={{ mt: 4 }}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <FeatureCard
                                    component={motion.div}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -10 }}
                                >
                                    <IconWrapper>{feature.icon}</IconWrapper>
                                    <Typography variant="h6" fontWeight={700} gutterBottom>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {feature.description}
                                    </Typography>
                                </FeatureCard>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </FeaturesSection>

            {/* CTA Section */}
            <CTASection>
                <Container maxWidth="md">
                    <CTAContent
                        component={motion.div}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Typography variant="h3" fontWeight={800} gutterBottom color="white">
                            Ready to Get Started?
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }} color="white">
                            Join thousands of institutions already using EduTrack
                        </Typography>
                        <StyledLink to="/Adminregister">
                            <CTAButton
                                variant="contained"
                                size="large"
                                component={motion.button}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Create Your Account Now
                            </CTAButton>
                        </StyledLink>
                    </CTAContent>
                </Container>
            </CTASection>
        </PageWrapper>
    );
};

export default Homepage;

// Styled Components
const PageWrapper = styled.div`
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    overflow-x: hidden;
`;

const HeroSection = styled.section`
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    padding: 4rem 0;
    background: linear-gradient(135deg, 
        rgba(99, 102, 241, 0.03) 0%, 
        rgba(236, 72, 153, 0.03) 100%
    );
`;

const LogoBadge = styled.div`
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
    color: white;
    border-radius: 50px;
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 2rem;
    box-shadow: 0 10px 40px rgba(99, 102, 241, 0.3);
`;

const HeroTitle = styled.h1`
    font-size: 4rem;
    font-weight: 900;
    line-height: 1.1;
    color: #0f172a;
    margin-bottom: 1.5rem;
    
    @media (max-width: 768px) {
        font-size: 2.5rem;
    }
`;

const GradientText = styled.span`
    background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const HeroSubtitle = styled.p`
    font-size: 1.25rem;
    line-height: 1.8;
    color: #64748b;
    margin-bottom: 3rem;
    max-width: 550px;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
`;

const PrimaryButton = styled(Button)`
    && {
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        color: white;
        padding: 1rem 2.5rem;
        font-size: 1.1rem;
        font-weight: 600;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(99, 102, 241, 0.3);
        text-transform: none;
        
        &:hover {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            box-shadow: 0 15px 50px rgba(99, 102, 241, 0.4);
        }
    }
`;

const SecondaryButton = styled(Button)`
    && {
        color: #6366f1;
        border: 2px solid #6366f1;
        padding: 1rem 2.5rem;
        font-size: 1.1rem;
        font-weight: 600;
        border-radius: 12px;
        text-transform: none;
        
        &:hover {
            border-color: #4f46e5;
            background: rgba(99, 102, 241, 0.05);
        }
    }
`;

const HeroImageContainer = styled.div`
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const HeroImage = styled.img`
    width: 100%;
    height: auto;
    display: block;
    border-radius: 24px;
`;

const ImageOverlay = styled.div`
    position: absolute;
    inset: 0;
    background: linear-gradient(
        135deg,
        rgba(99, 102, 241, 0.2) 0%,
        rgba(236, 72, 153, 0.2) 100%
    );
`;

const FloatingCard = styled(Card)`
    && {
        position: absolute;
        bottom: 2rem;
        left: 2rem;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        
        @media (max-width: 768px) {
            left: 1rem;
            bottom: 1rem;
        }
    }
`;

const FeaturesSection = styled.section`
    padding: 6rem 0;
    background: white;
`;

const SectionTitle = styled.div`
    text-align: center;
    margin-bottom: 3rem;
`;

const FeatureCard = styled(Card)`
    && {
        padding: 2.5rem;
        height: 100%;
        border-radius: 20px;
        border: 1px solid #e2e8f0;
        background: white;
        transition: all 0.3s ease;
        cursor: pointer;
        
        &:hover {
            border-color: #6366f1;
            box-shadow: 0 20px 60px rgba(99, 102, 241, 0.15);
        }
    }
`;

const IconWrapper = styled.div`
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
    border-radius: 16px;
    color: white;
    margin-bottom: 1.5rem;
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
`;

const CTASection = styled.section`
    padding: 6rem 0;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        opacity: 0.1;
    }
`;

const CTAContent = styled.div`
    text-align: center;
    position: relative;
    z-index: 1;
`;

const CTAButton = styled(Button)`
    && {
        background: white;
        color: #6366f1;
        padding: 1rem 3rem;
        font-size: 1.1rem;
        font-weight: 700;
        border-radius: 12px;
        text-transform: none;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        
        &:hover {
            background: #f8fafc;
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
        }
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const SignUpText = styled.p`
    color: #64748b;
    font-size: 1rem;
    margin-top: 1rem;
`;

const StyledRegisterLink = styled(Link)`
    color: #6366f1;
    font-weight: 700;
    text-decoration: none;
    
    &:hover {
        text-decoration: underline;
    }
`;
