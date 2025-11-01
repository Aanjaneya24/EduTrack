import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllStudents } from '../../../redux/studentRelated/studentHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import {
    Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow,
    CircularProgress, Chip, InputAdornment, Tooltip, Breadcrumbs, Typography, Link
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GradingIcon from '@mui/icons-material/Grading';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import {
    PageHeader, SearchContainer, StyledSearchField,
    PrimaryButton, TableContainer,
    EmptyState, LoadingOverlay
} from '../../../components/StyledComponents';
import Popup from '../../../components/Popup';

const ShowStudents = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { studentsList, loading, error, response } = useSelector((state) => state.student);
    const { currentUser } = useSelector(state => state.user)

    const [searchTerm, setSearchTerm] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        dispatch(getAllStudents(currentUser._id));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const filteredStudents = studentsList && studentsList.length > 0 
        ? studentsList.filter(student => 
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.rollNum.toString().includes(searchTerm) ||
            student.sclassName.sclassName.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : [];

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        
        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getAllStudents(currentUser._id));
            })
    }

    const actions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
            action: () => navigate("/Admin/addstudents")
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students',
            action: () => deleteHandler(currentUser._id, "Students")
        },
    ];

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
                    <PeopleIcon sx={{ mr: 0.5 }} fontSize="small" />
                    Students
                </Typography>
            </Breadcrumbs>

            {/* Page Header */}
            <PageHeader>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                        <h4>Students Management</h4>
                        <p>View, manage, and track all students in your school</p>
                    </Box>
                    <PrimaryButton
                        startIcon={<PersonAddAlt1Icon />}
                        onClick={() => navigate("/Admin/addstudents")}
                    >
                        Add New Student
                    </PrimaryButton>
                </Box>
            </PageHeader>

            {loading ? (
                <LoadingOverlay>
                    <CircularProgress />
                </LoadingOverlay>
            ) : response ? (
                <EmptyState>
                    <PeopleIcon sx={{ fontSize: 80, color: '#D1D5DB' }} />
                    <h3>No Students Found</h3>
                    <p>Get started by adding your first student</p>
                    <Box sx={{ mt: 3 }}>
                        <PrimaryButton
                            startIcon={<PersonAddAlt1Icon />}
                            onClick={() => navigate("/Admin/addstudents")}
                        >
                            Add Student
                        </PrimaryButton>
                    </Box>
                </EmptyState>
            ) : (
                <>
                    {/* Search Bar */}
                    <SearchContainer>
                        <StyledSearchField
                            placeholder="Search by name, roll number, or class..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: '#9CA3AF' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Chip
                            label={`${filteredStudents.length} Students`}
                            sx={{
                                background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '14px',
                                height: '40px'
                            }}
                        />
                    </SearchContainer>

                    {/* Students Table */}
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Roll Number</TableCell>
                                    <TableCell>Class</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredStudents.length > 0 ? (
                                    filteredStudents.map((student) => (
                                        <TableRow key={student._id}>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Box
                                                        sx={{
                                                            width: 40,
                                                            height: 40,
                                                            borderRadius: '50%',
                                                            background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            color: 'white',
                                                            fontWeight: 600,
                                                            fontSize: '16px'
                                                        }}
                                                    >
                                                        {student.name.charAt(0).toUpperCase()}
                                                    </Box>
                                                    <Typography sx={{ fontWeight: 500 }}>
                                                        {student.name}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={student.rollNum}
                                                    size="small"
                                                    sx={{ fontWeight: 500 }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={student.sclassName.sclassName}
                                                    size="small"
                                                    sx={{
                                                        background: '#F3E8FF',
                                                        color: '#6B21A8',
                                                        fontWeight: 500
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Tooltip title="View Details">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => navigate("/Admin/students/student/" + student._id)}
                                                            sx={{
                                                                background: '#DBEAFE',
                                                                color: '#1E40AF',
                                                                '&:hover': { background: '#BFDBFE' }
                                                            }}
                                                        >
                                                            <VisibilityIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Take Attendance">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => navigate("/Admin/students/student/attendance/" + student._id)}
                                                            sx={{
                                                                background: '#D1FAE5',
                                                                color: '#065F46',
                                                                '&:hover': { background: '#A7F3D0' }
                                                            }}
                                                        >
                                                            <CheckCircleIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Provide Marks">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => navigate("/Admin/students/student/marks/" + student._id)}
                                                            sx={{
                                                                background: '#FEF3C7',
                                                                color: '#92400E',
                                                                '&:hover': { background: '#FDE68A' }
                                                            }}
                                                        >
                                                            <GradingIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete Student">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => deleteHandler(student._id, "Student")}
                                                            sx={{
                                                                background: '#FEE2E2',
                                                                color: '#991B1B',
                                                                '&:hover': { background: '#FECACA' }
                                                            }}
                                                        >
                                                            <PersonRemoveIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                                            <EmptyState>
                                                <SearchIcon />
                                                <h3>No students found</h3>
                                                <p>Try adjusting your search terms</p>
                                            </EmptyState>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <SpeedDialTemplate actions={actions} />
                </>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Box>
    );
};

export default ShowStudents;