import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Table, TableBody, TableContainer, TableHead, Typography, Paper, TableRow, TableCell, CircularProgress, Breadcrumbs, Link, Chip } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import { getTeacherFreeClassSubjects } from '../../../redux/sclassRelated/sclassHandle';
import { updateTeachSubject } from '../../../redux/teacherRelated/teacherHandle';
import { GreenButton, PurpleButton } from '../../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import SubjectIcon from '@mui/icons-material/Subject';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
    StyledPaper, PageHeader, EmptyState, LoadingOverlay,
    PrimaryButton, SuccessButton, TableContainer as ModernTableContainer
} from '../../../components/StyledComponents';

const ChooseSubject = ({ situation }) => {
    const params = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [classID, setClassID] = useState("");
    const [teacherID, setTeacherID] = useState("");
    const [loader, setLoader] = useState(false)

    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);

    useEffect(() => {
        if (situation === "Norm") {
            setClassID(params.id);
            const classID = params.id
            dispatch(getTeacherFreeClassSubjects(classID));
        }
        else if (situation === "Teacher") {
            const { classID, teacherID } = params
            setClassID(classID);
            setTeacherID(teacherID);
            dispatch(getTeacherFreeClassSubjects(classID));
        }
    }, [situation]);

    if (error) {
        console.log(error)
    }

    const updateSubjectHandler = (teacherId, teachSubject) => {
        setLoader(true)
        dispatch(updateTeachSubject(teacherId, teachSubject))
        navigate("/Admin/teachers")
    }

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
                    <SubjectIcon sx={{ mr: 0.5 }} fontSize="small" />
                    Choose Subject
                </Typography>
            </Breadcrumbs>

            {/* Page Header */}
            <PageHeader>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                        <h4>Choose a Subject</h4>
                        <p>Select a subject to assign to the teacher</p>
                    </Box>
                </Box>
            </PageHeader>

            {loading ? (
                <LoadingOverlay>
                    <CircularProgress />
                </LoadingOverlay>
            ) : response ? (
                <EmptyState>
                    <CheckCircleIcon sx={{ fontSize: 80, color: '#10B981' }} />
                    <h3>All Subjects Assigned!</h3>
                    <p>All subjects in this class already have teachers assigned</p>
                    <Box sx={{ mt: 3 }}>
                        <PrimaryButton
                            startIcon={<SubjectIcon />}
                            onClick={() => navigate("/Admin/addsubject/" + classID)}
                        >
                            Add New Subjects
                        </PrimaryButton>
                    </Box>
                </EmptyState>
            ) : (
                <ModernTableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Subject Name</TableCell>
                                <TableCell>Subject Code</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(subjectsList) && subjectsList.length > 0 ? (
                                subjectsList.map((subject, index) => (
                                    <TableRow key={subject._id}>
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
                                                        width: 36,
                                                        height: 36,
                                                        borderRadius: '8px',
                                                        background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: 'white'
                                                    }}
                                                >
                                                    <AssignmentIcon fontSize="small" />
                                                </Box>
                                                <Typography sx={{ fontWeight: 500 }}>
                                                    {subject.subName}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={subject.subCode}
                                                size="small"
                                                sx={{
                                                    background: '#DBEAFE',
                                                    color: '#1E40AF',
                                                    fontWeight: 500
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            {situation === "Norm" ? (
                                                <SuccessButton
                                                    startIcon={<CheckCircleIcon />}
                                                    onClick={() => navigate("/Admin/teachers/addteacher/" + subject._id)}
                                                >
                                                    Choose
                                                </SuccessButton>
                                            ) : (
                                                <SuccessButton
                                                    disabled={loader}
                                                    startIcon={loader ? <CircularProgress size={16} sx={{ color: 'white' }} /> : <CheckCircleIcon />}
                                                    onClick={() => updateSubjectHandler(teacherID, subject._id)}
                                                >
                                                    {loader ? 'Assigning...' : 'Assign Subject'}
                                                </SuccessButton>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                                        <EmptyState>
                                            <SubjectIcon />
                                            <h3>No subjects available</h3>
                                            <p>Add subjects to this class first</p>
                                        </EmptyState>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </ModernTableContainer>
            )}
        </Box>
    );
};

export default ChooseSubject;