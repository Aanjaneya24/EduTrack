import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import { Box, Typography, Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { StyledPaper, PrimaryButton, DangerButton } from '../components/StyledComponents';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '20px'
            }}
        >
            <StyledPaper
                sx={{
                    maxWidth: '500px',
                    width: '100%',
                    textAlign: 'center',
                    padding: '48px !important'
                }}
            >
                {/* Warning Icon */}
                <Box
                    sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: '#FEF3C7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                    }}
                >
                    <WarningAmberIcon sx={{ fontSize: 48, color: '#F59E0B' }} />
                </Box>

                {/* User Info */}
                <Avatar
                    sx={{
                        width: 80,
                        height: 80,
                        margin: '0 auto 16px',
                        background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                        fontSize: '32px',
                        fontWeight: 600
                    }}
                >
                    {currentUser.name.charAt(0).toUpperCase()}
                </Avatar>

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 600,
                        color: '#1F2937',
                        marginBottom: '8px'
                    }}
                >
                    {currentUser.name}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: '#6B7280',
                        marginBottom: '32px',
                        fontSize: '16px'
                    }}
                >
                    Are you sure you want to log out?
                </Typography>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <PrimaryButton
                        startIcon={<CancelIcon />}
                        onClick={handleCancel}
                        sx={{ minWidth: '140px', background: '#6B7280 !important' }}
                    >
                        Cancel
                    </PrimaryButton>
                    <DangerButton
                        startIcon={<LogoutIcon />}
                        onClick={handleLogout}
                        sx={{ minWidth: '140px' }}
                    >
                        Log Out
                    </DangerButton>
                </Box>
            </StyledPaper>
        </Box>
    );
};

export default Logout;
