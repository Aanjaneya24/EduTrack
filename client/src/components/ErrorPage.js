import React from 'react';
import { Box, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from './StyledComponents';
import HomeIcon from '@mui/icons-material/Home';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '20px',
                textAlign: 'center'
            }}
        >
            <Box
                sx={{
                    maxWidth: '600px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    padding: '60px 40px',
                    borderRadius: '24px',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
                }}
            >
                {/* Error Icon */}
                <Box
                    sx={{
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #F87171 0%, #EF4444 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 32px',
                        animation: 'pulse 2s infinite'
                    }}
                >
                    <ErrorOutlineIcon sx={{ fontSize: 72, color: 'white' }} />
                </Box>

                {/* Error Message */}
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 700,
                        color: '#1F2937',
                        marginBottom: '16px',
                        fontSize: { xs: '28px', md: '36px' }
                    }}
                >
                    Oops, Something Went Wrong
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: '#6B7280',
                        fontSize: '18px',
                        lineHeight: 1.6,
                        marginBottom: '32px'
                    }}
                >
                    We apologize for the inconvenience. Our website is currently experiencing technical difficulties. Please try again later or contact support if the problem persists.
                </Typography>

                {/* Action Button */}
                <PrimaryButton
                    startIcon={<HomeIcon />}
                    onClick={() => navigate('/')}
                    sx={{ fontSize: '16px', padding: '12px 32px' }}
                >
                    Go to Homepage
                </PrimaryButton>
            </Box>

            {/* CSS Animation */}
            <style>
                {`
                    @keyframes pulse {
                        0%, 100% {
                            transform: scale(1);
                        }
                        50% {
                            transform: scale(1.05);
                        }
                    }
                `}
            </style>
        </Box>
    );
};

export default ErrorPage;
