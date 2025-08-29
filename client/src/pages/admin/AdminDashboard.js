import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppBar, Drawer } from '../../components/styles';
import Logout from '../Logout';
import SideBar from './SideBar';
import AdminProfile from './AdminProfile';
import AdminHomePage from './AdminHomePage';

import AddStudent from './studentRelated/AddStudent';
import SeeComplains from './studentRelated/SeeComplains';
import ShowStudents from './studentRelated/ShowStudents';
import StudentAttendance from './studentRelated/StudentAttendance';
import StudentExamMarks from './studentRelated/StudentExamMarks';
import ViewStudent from './studentRelated/ViewStudent';

import AddNotice from './noticeRelated/AddNotice';
import ShowNotices from './noticeRelated/ShowNotices';

import ShowSubjects from './subjectRelated/ShowSubjects';
import SubjectForm from './subjectRelated/SubjectForm';
import ViewSubject from './subjectRelated/ViewSubject';

import AddTeacher from './teacherRelated/AddTeacher';
import ChooseClass from './teacherRelated/ChooseClass';
import ChooseSubject from './teacherRelated/ChooseSubject';
import ShowTeachers from './teacherRelated/ShowTeachers';
import TeacherDetails from './teacherRelated/TeacherDetails';

import AddClass from './classRelated/AddClass';
import ClassDetails from './classRelated/ClassDetails';
import ShowClasses from './classRelated/ShowClasses';
import AccountMenu from '../../components/AccountMenu';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: '#072d0bff',  // Darker background for better contrast
  boxShadow: '0 4px 30px rgba(244, 241, 241, 0.2)',
  borderBottom: '1px solid rgba(244, 239, 239, 0.1)',
}));

const DashboardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#ffffff',  // Pure white for maximum contrast
  letterSpacing: '0.5px',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
}));

const MainContent = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',  // White background for content
  borderRadius: '20px',
  margin: '24px',
  padding: '24px',
  boxShadow: '0 4px 20px rgba(7, 46, 15, 0.97)',
}));

const AdminDashboard = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <StyledAppBar open={open} position='absolute'>
                <Toolbar sx={{ pr: '24px' }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                            '&:hover': {
                                background: 'rgba(8, 117, 34, 1)',  // Subtle hover effect
                            },
                            color: '#ffffff',  // White icon for contrast
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <DashboardTitle
                        component="h1"
                        variant="h6"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Admin Dashboard
                    </DashboardTitle>
                    <AccountMenu />
                </Toolbar>
            </StyledAppBar>
            <Drawer variant="permanent" open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
                <Toolbar sx={styles.toolBarStyled}>
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    <SideBar />
                </List>
            </Drawer>
            <MainContent component="main" sx={styles.boxStyled}>
                <Toolbar />
                <Routes>
                    <Route path="/" element={<AdminHomePage />} />
                    <Route path='*' element={<Navigate to="/" />} />
                    <Route path="/Admin/dashboard" element={<AdminHomePage />} />
                    <Route path="/Admin/profile" element={<AdminProfile />} />
                    <Route path="/Admin/complains" element={<SeeComplains />} />

                    {/* Notice */}
                    <Route path="/Admin/addnotice" element={<AddNotice />} />
                    <Route path="/Admin/notices" element={<ShowNotices />} />

                    {/* Subject */}
                    <Route path="/Admin/subjects" element={<ShowSubjects />} />
                    <Route path="/Admin/subjects/subject/:classID/:subjectID" element={<ViewSubject />} />
                    <Route path="/Admin/subjects/chooseclass" element={<ChooseClass situation="Subject" />} />

                    <Route path="/Admin/addsubject/:id" element={<SubjectForm />} />
                    <Route path="/Admin/class/subject/:classID/:subjectID" element={<ViewSubject />} />

                    <Route path="/Admin/subject/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                    <Route path="/Admin/subject/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />

                    {/* Class */}
                    <Route path="/Admin/addclass" element={<AddClass />} />
                    <Route path="/Admin/classes" element={<ShowClasses />} />
                    <Route path="/Admin/classes/class/:id" element={<ClassDetails />} />
                    <Route path="/Admin/class/addstudents/:id" element={<AddStudent situation="Class" />} />

                    {/* Student */}
                    <Route path="/Admin/addstudents" element={<AddStudent situation="Student" />} />
                    <Route path="/Admin/students" element={<ShowStudents />} />
                    <Route path="/Admin/students/student/:id" element={<ViewStudent />} />
                    <Route path="/Admin/students/student/attendance/:id" element={<StudentAttendance situation="Student" />} />
                    <Route path="/Admin/students/student/marks/:id" element={<StudentExamMarks situation="Student" />} />

                    {/* Teacher */}
                    <Route path="/Admin/teachers" element={<ShowTeachers />} />
                    <Route path="/Admin/teachers/teacher/:id" element={<TeacherDetails />} />
                    <Route path="/Admin/teachers/chooseclass" element={<ChooseClass situation="Teacher" />} />
                    <Route path="/Admin/teachers/choosesubject/:id" element={<ChooseSubject situation="Norm" />} />
                    <Route path="/Admin/teachers/choosesubject/:classID/:teacherID" element={<ChooseSubject situation="Teacher" />} />
                    <Route path="/Admin/teachers/addteacher/:id" element={<AddTeacher />} />

                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </MainContent>
        </Box>
    );
}

export default AdminDashboard

const styles = {
    boxStyled: {
        backgroundColor: '#f8fafc',  // Light background with better contrast
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        transition: 'all 0.3s ease',
    },
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
        background: '#072d0bff',  // Matching AppBar color
        color: '#ffffff',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
    drawerStyled: {
        display: "flex",
        '& .MuiDrawer-paper': {
            background: '#072d0bff',  // Consistent dark background
            color: '#ffffff',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            '& .MuiListItemButton-root': {
                '&:hover': {
                    backgroundColor: 'rgba(248, 245, 245, 0.1)',
                },
                '& .MuiListItemIcon-root': {
                    color: '#ffffff',  // White icons for contrast
                },
                '& .MuiListItemText-primary': {
                    color: '#ffffff',  // White text for contrast
                    fontSize: '0.95rem',
                    fontWeight: 500,
                }
            },
            '& .Mui-selected': {
                backgroundColor: '#072d0bff !important',
            }
        }
    },
    hideDrawer: {
        display: 'flex',
        '@media (max-width: 600px)': {
            display: 'none',
        },
        '& .MuiDrawer-paper': {
            background: '#00a511ff',
            color: '#fafafaff',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        }
    },
}