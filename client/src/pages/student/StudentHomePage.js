import React, { useEffect, useState } from 'react'
import { Container, Grid, Paper, Typography, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Subject from "../../assets/subjects.svg";
import Assignment from "../../assets/assignment.svg";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { Book, Assignment as AssignmentIcon, TrendingUp, CheckCircle } from '@mui/icons-material';
import { motion } from 'framer-motion';

const StudentHomePage = () => {
    const dispatch = useDispatch();

    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const classID = currentUser.sclassName._id

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList && subjectsList.length;

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    const stats = [
        {
            title: 'Total Subjects',
            value: numberOfSubjects,
            icon: <Book sx={{ fontSize: 40 }} />,
            color: '#A78BFA',
            bgColor: '#F3F0FF',
        },
        {
            title: 'Assignments',
            value: 15,
            icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
            color: '#60A5FA',
            bgColor: '#EFF6FF',
        },
        {
            title: 'Attendance Rate',
            value: Math.round(overallAttendancePercentage),
            icon: <CheckCircle sx={{ fontSize: 40 }} />,
            color: '#34D399',
            bgColor: '#ECFDF5',
            suffix: '%',
        },
    ];

    return (
        <>
            <PageContainer maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                {/* Welcome Section */}
                <WelcomeCard
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Box>
                        <WelcomeTitle variant="h4">
                            Hey {currentUser?.name}! 👋
                        </WelcomeTitle>
                        <WelcomeText variant="body1">
                            Welcome back! Let's dive into your learning journey and keep progressing towards your goals.
                        </WelcomeText>
                    </Box>
                    <WelcomeIllustration>
                        <img src={Subject} alt="Welcome" style={{ width: '100%', maxWidth: '180px' }} />
                    </WelcomeIllustration>
                </WelcomeCard>

                <Grid container spacing={3}>
                    {/* Stats Cards */}
                    {stats.map((stat, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <ModernStatCard
                                component={motion.div}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                bgcolor={stat.bgColor}
                            >
                                <StatIconWrapper bgcolor={stat.color}>
                                    {stat.icon}
                                </StatIconWrapper>
                                <StatContent>
                                    <StatLabel variant="body2">{stat.title}</StatLabel>
                                    <StatValue>
                                        <CountUp start={0} end={stat.value} duration={2.5} />
                                        {stat.suffix}
                                    </StatValue>
                                </StatContent>
                            </ModernStatCard>
                        </Grid>
                    ))}

                    {/* Attendance Chart */}
                    <Grid item xs={12} md={6}>
                        <AttendanceCard
                            component={motion.div}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Box sx={{ p: 2 }}>
                                <Typography variant="h6" fontWeight={700} gutterBottom>
                                    Attendance Overview
                                </Typography>
                                {
                                    response ?
                                        <Typography variant="body2" color="text.secondary">No Attendance Found</Typography>
                                        :
                                        <>
                                            {loading
                                                ? (
                                                    <Typography variant="body2">Loading...</Typography>
                                                )
                                                :
                                                <>
                                                    {
                                                        subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                                                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 2 }}>
                                                                <CustomPieChart data={chartData} />
                                                            </Box>
                                                        )
                                                            :
                                                            <Typography variant="body2" color="text.secondary">No Attendance Found</Typography>
                                                    }
                                                </>
                                            }
                                        </>
                                }
                            </Box>
                        </AttendanceCard>
                    </Grid>

                    {/* Notice Board */}
                    <Grid item xs={12} md={6}>
                        <NoticeCard
                            component={motion.div}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <SeeNotice />
                        </NoticeCard>
                    </Grid>
                </Grid>
            </PageContainer>
        </>
    )
}

// Styled Components - Soft pastel aesthetic
const PageContainer = styled(Container)`
  && {
    background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%);
    min-height: 100vh;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
`;

const WelcomeCard = styled(Paper)`
  padding: 2.5rem;
  border-radius: 24px;
  background: linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%);
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 40px rgba(167, 139, 250, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const WelcomeTitle = styled(Typography)`
  && {
    color: white;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
`;

const WelcomeText = styled(Typography)`
  && {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1rem;
    max-width: 500px;
  }
`;

const WelcomeIllustration = styled(Box)`
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`;

const ModernStatCard = styled(Paper)`
  padding: 2rem;
  border-radius: 20px;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid ${props => props.bgcolor};
  position: relative;
  overflow: hidden;
  height: 100%;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${props => props.bgcolor};
  }
  
  &:hover {
    box-shadow: 0 12px 40px rgba(167, 139, 250, 0.2);
  }
`;

const StatIconWrapper = styled(Box)`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: ${props => props.bgcolor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 1rem;
  box-shadow: 0 8px 16px ${props => props.bgcolor}40;
`;

const StatContent = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const StatLabel = styled(Typography)`
  && {
    color: #64748B;
    font-weight: 500;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
  }
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: #1E293B;
`;

const AttendanceCard = styled(Paper)`
  padding: 2rem;
  border-radius: 20px;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid #F3F4F6;
  height: 100%;
`;

const NoticeCard = styled(Paper)`
  padding: 2rem;
  border-radius: 20px;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid #F3F4F6;
  height: 100%;
`;

export default StudentHomePage