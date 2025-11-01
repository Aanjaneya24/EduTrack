import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Typography, CircularProgress, Stack, Breadcrumbs, Link, Alert } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MessageIcon from '@mui/icons-material/Message';
import SendIcon from '@mui/icons-material/Send';
import { addStuff } from '../../redux/userRelated/userHandle';
import Popup from '../../components/Popup';
import { FormContainer, PageHeader, PrimaryButton } from '../../components/StyledComponents';

const TeacherComplain = () => {
    const navigate = useNavigate();
    const [complaint, setComplaint] = useState("");
    const [date, setDate] = useState("");
    const [success, setSuccess] = useState(false);

    const dispatch = useDispatch();

    const { status, currentUser, error } = useSelector(state => state.user);

    const user = currentUser._id;
    const school = currentUser.school._id;
    const address = "Complain";

    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        user,
        date,
        complaint,
        school,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === "added") {
            setLoader(false);
            setSuccess(true);
            setMessage("Complaint submitted successfully!");
            setComplaint("");
            setDate("");
            setTimeout(() => setSuccess(false), 5000);
        }
        else if (error) {
            setLoader(false);
            setShowPopup(true);
            setMessage("Network Error");
        }
    }, [status, error]);

    return (
        <Box sx={{ padding: '24px', background: '#F9FAFB', minHeight: '100vh' }}>
            {/* Breadcrumbs */}
            <Breadcrumbs sx={{ mb: 3 }}>
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    color="inherit"
                    onClick={() => navigate('/Teacher/dashboard')}
                >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
                    Dashboard
                </Link>
                <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
                    <ReportProblemIcon sx={{ mr: 0.5 }} fontSize="small" />
                    Submit Complaint
                </Typography>
            </Breadcrumbs>

            {/* Page Header */}
            <PageHeader>
                <Box>
                    <h4>Submit a Complaint</h4>
                    <p>Report any issues or concerns you're facing</p>
                </Box>
            </PageHeader>

            {/* Success Alert */}
            {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    {message}
                </Alert>
            )}

            {/* Form */}
            <FormContainer>
                <form onSubmit={submitHandler}>
                    <Box sx={{ mb: 3, p: 2, background: '#FEF3C7', borderRadius: '12px', display: 'flex', gap: 2 }}>
                        <ReportProblemIcon sx={{ color: '#F59E0B', fontSize: 32 }} />
                        <Box>
                            <Typography sx={{ fontWeight: 600, color: '#92400E', mb: 0.5 }}>
                                Important Information
                            </Typography>
                            <Typography sx={{ fontSize: '14px', color: '#78350F' }}>
                                Your complaint will be reviewed by the administration. Please provide clear and detailed information.
                            </Typography>
                        </Box>
                    </Box>

                    <TextField
                        fullWidth
                        label="Date"
                        type="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            startAdornment: <CalendarTodayIcon sx={{ mr: 1, color: '#9CA3AF' }} />
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Describe your complaint"
                        variant="outlined"
                        value={complaint}
                        onChange={(event) => setComplaint(event.target.value)}
                        required
                        multiline
                        rows={6}
                        placeholder="Please describe your issue in detail..."
                        InputProps={{
                            startAdornment: (
                                <MessageIcon 
                                    sx={{ 
                                        mr: 1, 
                                        color: '#9CA3AF',
                                        alignSelf: 'flex-start',
                                        mt: 2
                                    }} 
                                />
                            )
                        }}
                    />

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
                        <PrimaryButton
                            type="button"
                            onClick={() => navigate('/Teacher/dashboard')}
                            sx={{ background: '#6B7280 !important' }}
                        >
                            Cancel
                        </PrimaryButton>
                        <PrimaryButton
                            type="submit"
                            disabled={loader}
                            startIcon={loader ? <CircularProgress size={16} sx={{ color: 'white' }} /> : <SendIcon />}
                        >
                            {loader ? 'Submitting...' : 'Submit Complaint'}
                        </PrimaryButton>
                    </Box>
                </form>
            </FormContainer>

            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Box>
    );
};

export default TeacherComplain;