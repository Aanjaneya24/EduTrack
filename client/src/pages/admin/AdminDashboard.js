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
import SchoolIcon from '@mui/icons-material/School';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { InputBase, Badge, Avatar } from '@mui/material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: '#FFFFFF',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  borderBottom: '1px solid #F1F5F9',
  color: '#1E293B',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginRight: '32px',
}));

const LogoBox = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '12px',
  background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 700,
  color: '#1E293B',
  letterSpacing: '-0.5px',
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: '12px',
  backgroundColor: '#F8FAFC',
  border: '1px solid #E2E8F0',
  marginLeft: 0,
  width: '100%',
  maxWidth: '400px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#F1F5F9',
    borderColor: '#CBD5E1',
  },
  '&:focus-within': {
    backgroundColor: '#FFFFFF',
    borderColor: '#A78BFA',
    boxShadow: '0 0 0 3px rgba(167, 139, 250, 0.1)',
  },
}));

const SearchIconWrapper = styled(Box)(({ theme }) => ({
  padding: '0 16px',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#94A3B8',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#1E293B',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: '10px 16px 10px 48px',
    fontSize: '0.875rem',
    fontWeight: 500,
    '&::placeholder': {
      color: '#94A3B8',
      opacity: 1,
    },
  },
}));

const HeaderIconButton = styled(IconButton)(({ theme }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '10px',
  color: '#64748B',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#F1F5F9',
    color: '#A78BFA',
  },
}));

const MainContent = styled(Box)(({ theme }) => ({
  backgroundColor: '#F9FAFB',
  borderRadius: '0',
  padding: '0',
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
                <Toolbar sx={{ pr: '24px', height: '70px' }}>
                    <IconButton
                        edge="start"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '16px',
                            display: open ? 'none' : 'flex',
                            color: '#64748B',
                            '&:hover': {
                                background: '#F1F5F9',
                                color: '#A78BFA',
                            },
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    
                    {/* Logo - only show when drawer is closed */}
                    {!open && (
                        <LogoContainer>
                            <LogoBox>
                                <SchoolIcon sx={{ color: '#FFFFFF', fontSize: '24px' }} />
                            </LogoBox>
                            <LogoText>EduTrack</LogoText>
                        </LogoContainer>
                    )}
                    
                    {/* Search Bar */}
                    <SearchContainer>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search..."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </SearchContainer>
                    
                    <Box sx={{ flexGrow: 1 }} />
                    
                    {/* Header Icons */}
                    <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <AccountMenu />
                    </Box>
                </Toolbar>
            </StyledAppBar>
            <Drawer variant="permanent" open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
                <Toolbar sx={styles.toolBarStyled}>
                    {open && (
                        <LogoContainer sx={{ width: '100%' }}>
                            <LogoBox>
                                <SchoolIcon sx={{ color: '#FFFFFF', fontSize: '24px' }} />
                            </LogoBox>
                            <LogoText sx={{ color: '#FFFFFF', flexGrow: 1 }}>EduTrack</LogoText>
                            <IconButton onClick={toggleDrawer} sx={{ color: '#94A3B8' }}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </LogoContainer>
                    )}
                </Toolbar>
                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />
                <List component="nav" sx={{ px: 2, py: 2 }}>
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
        backgroundColor: '#F9FAFB',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        transition: 'all 0.3s ease',
    },
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        height: '70px',
        background: '#1E1E1E',
        color: '#ffffff',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    },
    drawerStyled: {
        display: "flex",
        '& .MuiDrawer-paper': {
            background: '#1E1E1E',
            color: '#ffffff',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            '& .MuiListItemButton-root': {
                borderRadius: '12px',
                marginBottom: '4px',
                padding: '12px 16px',
                transition: 'all 0.2s ease',
                '&:hover': {
                    backgroundColor: 'rgba(167, 139, 250, 0.1)',
                },
                '& .MuiListItemIcon-root': {
                    color: '#94A3B8',
                    minWidth: '40px',
                },
                '& .MuiListItemText-primary': {
                    color: '#E2E8F0',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                }
            },
            '& .Mui-selected': {
                backgroundColor: 'rgba(167, 139, 250, 0.15) !important',
                '& .MuiListItemIcon-root': {
                    color: '#A78BFA',
                },
                '& .MuiListItemText-primary': {
                    color: '#FFFFFF',
                    fontWeight: 600,
                }
            },
            '& .MuiListSubheader-root': {
                background: 'transparent',
                color: '#64748B',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                lineHeight: '32px',
                paddingLeft: '16px',
                marginTop: '16px',
            },
            '& .MuiDivider-root': {
                borderColor: 'rgba(255, 255, 255, 0.08)',
                marginTop: '8px',
                marginBottom: '8px',
            }
        }
    },
    hideDrawer: {
        display: 'flex',
        '@media (max-width: 600px)': {
            display: 'none',
        },
        '& .MuiDrawer-paper': {
            background: '#2D2D2D',
            color: '#ffffff',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '16px',
            '& .MuiListItemButton-root': {
                borderRadius: '10px',
                marginBottom: '6px',
                marginLeft: '8px',
                marginRight: '8px',
                padding: '12px 8px',
                minHeight: '52px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.2s ease',
                position: 'relative',
                '&:hover': {
                    backgroundColor: 'rgba(167, 139, 250, 0.2)',
                    '& .MuiListItemIcon-root': {
                        color: '#D4C5F9',
                        transform: 'scale(1.1)',
                    }
                },
                '& .MuiListItemIcon-root': {
                    color: '#E0E0E0',
                    minWidth: 'auto',
                    margin: 0,
                    fontSize: '26px',
                    transition: 'all 0.2s ease',
                    '& svg': {
                        fontSize: '26px',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                    }
                },
                '& .MuiListItemText-root': {
                    display: 'none',
                }
            },
            '& .Mui-selected': {
                backgroundColor: 'rgba(167, 139, 250, 0.25) !important',
                boxShadow: '0 2px 8px rgba(167, 139, 250, 0.3)',
                '& .MuiListItemIcon-root': {
                    color: '#FFFFFF !important',
                    transform: 'scale(1.05)',
                },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '3px',
                    height: '70%',
                    backgroundColor: '#A78BFA',
                    borderRadius: '0 4px 4px 0',
                    boxShadow: '0 0 8px rgba(167, 139, 250, 0.6)',
                }
            },
            '& .MuiDivider-root': {
                borderColor: 'rgba(255, 255, 255, 0.12)',
                marginTop: '12px',
                marginBottom: '12px',
                marginLeft: '12px',
                marginRight: '12px',
            },
            '& .MuiListSubheader-root': {
                display: 'none',
            }
        }
    },
}