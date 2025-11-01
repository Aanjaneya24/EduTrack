import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getAllTeachers } from '../../../redux/teacherRelated/teacherHandle';
import {
    Paper, Table, TableBody, TableContainer, TableCell, TableRow,
    TableHead, TablePagination, Button, Box, IconButton, CircularProgress,
    Chip, InputAdornment, Tooltip, Breadcrumbs, Typography, Link
} from '@mui/material';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import {
    StyledPaper, PageHeader, SearchContainer, StyledSearchField,
    PrimaryButton, EmptyState, LoadingOverlay, TableContainer as ModernTableContainer
} from '../../../components/StyledComponents';

const ShowTeachers = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { teachersList, loading, error, response } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getAllTeachers(currentUser._id));
    }, [currentUser._id, dispatch]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    if (error) {
        console.log(error);
    }

    const filteredTeachers = teachersList && teachersList.length > 0 
        ? teachersList.filter(teacher => 
            teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (teacher.teachSubject?.subName && teacher.teachSubject.subName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            teacher.teachSclass.sclassName.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : [];

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        
        dispatch(deleteUser(deleteID, address)).then(() => {
            dispatch(getAllTeachers(currentUser._id));
        });
    };

    const actions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Teacher',
            action: () => navigate("/Admin/teachers/chooseclass")
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Teachers',
            action: () => deleteHandler(currentUser._id, "Teachers")
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
                    <SchoolIcon sx={{ mr: 0.5 }} fontSize="small" />
                    Teachers
                </Typography>
            </Breadcrumbs>

            {/* Page Header */}
            <PageHeader>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                        <h4>Teachers Management</h4>
                        <p>View and manage all teachers in your school</p>
                    </Box>
                    <PrimaryButton
                        startIcon={<PersonAddAlt1Icon />}
                        onClick={() => navigate("/Admin/teachers/chooseclass")}
                    >
                        Add New Teacher
                    </PrimaryButton>
                </Box>
            </PageHeader>

            {loading ? (
                <LoadingOverlay>
                    <CircularProgress />
                </LoadingOverlay>
            ) : response ? (
                <EmptyState>
                    <SchoolIcon sx={{ fontSize: 80, color: '#D1D5DB' }} />
                    <h3>No Teachers Found</h3>
                    <p>Get started by adding your first teacher</p>
                    <Box sx={{ mt: 3 }}>
                        <PrimaryButton
                            startIcon={<PersonAddAlt1Icon />}
                            onClick={() => navigate("/Admin/teachers/chooseclass")}
                        >
                            Add Teacher
                        </PrimaryButton>
                    </Box>
                </EmptyState>
            ) : (
                <>
                    {/* Search Bar */}
                    <SearchContainer>
                        <StyledSearchField
                            placeholder="Search by name, subject, or class..."
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
                            label={`${filteredTeachers.length} Teachers`}
                            sx={{
                                background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '14px',
                                height: '40px'
                            }}
                        />
                    </SearchContainer>

                    {/* Teachers Table */}
                    <ModernTableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Subject</TableCell>
                                    <TableCell>Class</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredTeachers.length > 0 ? (
                                    filteredTeachers
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((teacher) => (
                                            <TableRow key={teacher._id}>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Box
                                                            sx={{
                                                                width: 40,
                                                                height: 40,
                                                                borderRadius: '50%',
                                                                background: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                color: 'white',
                                                                fontWeight: 600,
                                                                fontSize: '16px'
                                                            }}
                                                        >
                                                            {teacher.name.charAt(0).toUpperCase()}
                                                        </Box>
                                                        <Typography sx={{ fontWeight: 500 }}>
                                                            {teacher.name}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    {teacher.teachSubject?.subName ? (
                                                        <Chip
                                                            label={teacher.teachSubject.subName}
                                                            size="small"
                                                            sx={{
                                                                background: '#DBEAFE',
                                                                color: '#1E40AF',
                                                                fontWeight: 500
                                                            }}
                                                        />
                                                    ) : (
                                                        <PrimaryButton
                                                            size="small"
                                                            onClick={() => navigate(`/Admin/teachers/choosesubject/${teacher.teachSclass._id}/${teacher._id}`)}
                                                        >
                                                            Add Subject
                                                        </PrimaryButton>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={teacher.teachSclass.sclassName}
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
                                                                onClick={() => navigate("/Admin/teachers/teacher/" + teacher._id)}
                                                                sx={{
                                                                    background: '#DBEAFE',
                                                                    color: '#1E40AF',
                                                                    '&:hover': { background: '#BFDBFE' }
                                                                }}
                                                            >
                                                                <VisibilityIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Delete Teacher">
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => deleteHandler(teacher._id, "Teacher")}
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
                                                <h3>No teachers found</h3>
                                                <p>Try adjusting your search terms</p>
                                            </EmptyState>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 100]}
                            component="div"
                            count={filteredTeachers.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(event, newPage) => setPage(newPage)}
                            onRowsPerPageChange={(event) => {
                                setRowsPerPage(parseInt(event.target.value, 10));
                                setPage(0);
                            }}
                        />
                    </ModernTableContainer>

                    <SpeedDialTemplate actions={actions} />
                </>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Box>
    );
};

export default ShowTeachers;