import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../../redux/userRelated/userHandle';
import { useNavigate } from 'react-router-dom';
import { authLogout } from '../../redux/userRelated/userSlice';
import { Box, Avatar, Grid, TextField, Breadcrumbs, Link, Typography, Divider, Alert } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import {
    StyledPaper, PageHeader, PrimaryButton, DangerButton, InfoSection, InfoItem
} from '../../components/StyledComponents';

const AdminProfile = () => {
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser, response, error } = useSelector((state) => state.user);
    const address = "Admin";

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState("");
    const [schoolName, setSchoolName] = useState(currentUser.schoolName);

    const fields = password === "" ? { name, email, schoolName } : { name, email, password, schoolName };

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updateUser(fields, currentUser._id, address));
        setEditMode(false);
        setPassword("");
    };

    const deleteHandler = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                dispatch(deleteUser(currentUser._id, "Students"));
                dispatch(deleteUser(currentUser._id, address));
                dispatch(authLogout());
                navigate('/');
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <Box sx={{ padding: '24px', background: '#F9FAFB', minHeight: '100vh' }}>
            {/* Breadcrumbs */}
            <Breadcrumbs sx={{ mb: 3 }}>
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    color="inherit"
                    onClick={() => navigate('/Admin/dashboard')}
                >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
                    Dashboard
                </Link>
                <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
                    <PersonIcon sx={{ mr: 0.5 }} fontSize="small" />
                    Profile
                </Typography>
            </Breadcrumbs>

            {/* Page Header */}
            <PageHeader>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                        <h4>Admin Profile</h4>
                        <p>View and manage your profile information</p>
                    </Box>
                    {!editMode && (
                        <PrimaryButton
                            startIcon={<EditIcon />}
                            onClick={() => setEditMode(true)}
                        >
                            Edit Profile
                        </PrimaryButton>
                    )}
                </Box>
            </PageHeader>

            {/* Alerts */}
            {response && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    {response}
                </Alert>
            )}
            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <Grid container spacing={3}>
                {/* Profile Card */}
                <Grid item xs={12} md={4}>
                    <StyledPaper sx={{ textAlign: 'center' }}>
                        <Avatar
                            sx={{
                                width: 120,
                                height: 120,
                                margin: '0 auto 16px',
                                background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                                fontSize: '48px',
                                fontWeight: 600
                            }}
                        >
                            {currentUser.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1F2937', mb: 1 }}>
                            {currentUser.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6B7280', mb: 2 }}>
                            Administrator
                        </Typography>
                        <Box
                            sx={{
                                display: 'inline-block',
                                px: 2,
                                py: 0.5,
                                borderRadius: '12px',
                                background: '#F3E8FF',
                                color: '#6B21A8',
                                fontSize: '14px',
                                fontWeight: 500
                            }}
                        >
                            Admin Account
                        </Box>
                    </StyledPaper>
                </Grid>

                {/* Details Card */}
                <Grid item xs={12} md={8}>
                    <StyledPaper>
                        {!editMode ? (
                            <>
                                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1F2937', mb: 3 }}>
                                    Profile Information
                                </Typography>
                                <InfoSection>
                                    <InfoItem color="#A78BFA">
                                        <label>Full Name</label>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                            <PersonIcon sx={{ color: '#A78BFA' }} />
                                            <Typography className="value">{currentUser.name}</Typography>
                                        </Box>
                                    </InfoItem>
                                    <InfoItem color="#60A5FA">
                                        <label>Email Address</label>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                            <EmailIcon sx={{ color: '#60A5FA' }} />
                                            <Typography className="value">{currentUser.email}</Typography>
                                        </Box>
                                    </InfoItem>
                                    <InfoItem color="#34D399">
                                        <label>School Name</label>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                            <SchoolIcon sx={{ color: '#34D399' }} />
                                            <Typography className="value">{currentUser.schoolName}</Typography>
                                        </Box>
                                    </InfoItem>
                                </InfoSection>

                                <Divider sx={{ my: 3 }} />

                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <DangerButton
                                        startIcon={<DeleteIcon />}
                                        onClick={deleteHandler}
                                    >
                                        Delete Account
                                    </DangerButton>
                                </Box>
                            </>
                        ) : (
                            <form onSubmit={submitHandler}>
                                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1F2937', mb: 3 }}>
                                    Edit Profile
                                </Typography>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    sx={{ mb: 2 }}
                                    InputProps={{
                                        startAdornment: <PersonIcon sx={{ mr: 1, color: '#9CA3AF' }} />
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="School Name"
                                    value={schoolName}
                                    onChange={(e) => setSchoolName(e.target.value)}
                                    required
                                    sx={{ mb: 2 }}
                                    InputProps={{
                                        startAdornment: <SchoolIcon sx={{ mr: 1, color: '#9CA3AF' }} />
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    sx={{ mb: 2 }}
                                    InputProps={{
                                        startAdornment: <EmailIcon sx={{ mr: 1, color: '#9CA3AF' }} />
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="New Password (optional)"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Leave blank to keep current password"
                                    sx={{ mb: 3 }}
                                    InputProps={{
                                        startAdornment: <LockIcon sx={{ mr: 1, color: '#9CA3AF' }} />
                                    }}
                                />
                                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                    <PrimaryButton
                                        startIcon={<CancelIcon />}
                                        onClick={() => {
                                            setEditMode(false);
                                            setName(currentUser.name);
                                            setEmail(currentUser.email);
                                            setSchoolName(currentUser.schoolName);
                                            setPassword("");
                                        }}
                                        sx={{ background: '#6B7280 !important' }}
                                    >
                                        Cancel
                                    </PrimaryButton>
                                    <PrimaryButton
                                        type="submit"
                                        startIcon={<SaveIcon />}
                                    >
                                        Save Changes
                                    </PrimaryButton>
                                </Box>
                            </form>
                        )}
                    </StyledPaper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminProfile;