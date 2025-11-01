import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography, Table, TableBody, TableHead, TableRow, TableCell, CircularProgress, Breadcrumbs, Link, Chip } from '@mui/material'
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate } from 'react-router-dom';
import { PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
    PageHeader, EmptyState, LoadingOverlay, PrimaryButton,
    TableContainer as ModernTableContainer
} from '../../../components/StyledComponents';

const ChooseClass = ({ situation }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllSclasses(currentUser._id, "Sclass"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error)
    }

    const navigateHandler = (classID) => {
        if (situation === "Teacher") {
            navigate("/Admin/teachers/choosesubject/" + classID)
        }
        else if (situation === "Subject") {
            navigate("/Admin/addsubject/" + classID)
        }
    }

    const sclassColumns = [
        { id: 'name', label: 'Class Name', minWidth: 170 },
    ]

    const sclassRows = sclassesList && sclassesList.length > 0 && sclassesList.map((sclass) => {
        return {
            name: sclass.sclassName,
            id: sclass._id,
        };
    })

    const SclassButtonHaver = ({ row }) => {
        return (
            <>
                <PurpleButton variant="contained"
                    onClick={() => navigateHandler(row.id)}>
                    Choose
                </PurpleButton>
            </>
        );
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
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    color="inherit"
                    onClick={() => navigate('/Admin/teachers')}
                >
                    <SchoolIcon sx={{ mr: 0.5 }} fontSize="small" />
                    Teachers
                </Link>
                <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
                    <ClassIcon sx={{ mr: 0.5 }} fontSize="small" />
                    Choose Class
                </Typography>
            </Breadcrumbs>

            {/* Page Header */}
            <PageHeader>
                <Box>
                    <h4>Choose a Class</h4>
                    <p>Select a class to continue with teacher assignment</p>
                </Box>
            </PageHeader>

            {loading ? (
                <LoadingOverlay>
                    <CircularProgress />
                </LoadingOverlay>
            ) : getresponse ? (
                <EmptyState>
                    <ClassIcon sx={{ fontSize: 80, color: '#D1D5DB' }} />
                    <h3>No Classes Found</h3>
                    <p>Create a class first to continue</p>
                    <Box sx={{ mt: 3 }}>
                        <PrimaryButton onClick={() => navigate("/Admin/addclass")}>
                            Add Class
                        </PrimaryButton>
                    </Box>
                </EmptyState>
            ) : (
                <ModernTableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Class Name</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(sclassesList) && sclassesList.length > 0 ? (
                                sclassesList.map((sclass, index) => (
                                    <TableRow key={sclass._id}>
                                        <TableCell>
                                            <Chip 
                                                label={index + 1} 
                                                size="small"
                                                sx={{ 
                                                    background: '#F3E8FF',
                                                    color: '#6B21A8',
                                                    fontWeight: 600
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Box
                                                    sx={{
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: '8px',
                                                        background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: 'white',
                                                        fontWeight: 600,
                                                        fontSize: '16px'
                                                    }}
                                                >
                                                    <ClassIcon />
                                                </Box>
                                                <Typography sx={{ fontWeight: 500, fontSize: '16px' }}>
                                                    {sclass.sclassName}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            <PrimaryButton
                                                endIcon={<ArrowForwardIcon />}
                                                onClick={() => navigateHandler(sclass._id)}
                                            >
                                                Choose Class
                                            </PrimaryButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} align="center" sx={{ py: 8 }}>
                                        <EmptyState>
                                            <ClassIcon />
                                            <h3>No classes available</h3>
                                            <p>Add classes to get started</p>
                                        </EmptyState>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </ModernTableContainer>
            )}
        </Box>
    )
}

export default ChooseClass