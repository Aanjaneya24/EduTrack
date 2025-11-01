import { Container, Grid, Paper, Box, Typography, LinearProgress } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import Fees from "../../assets/img4.png";
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';
import { School, Person, Groups, AccountBalance, TrendingUp } from '@mui/icons-material';
import { motion } from 'framer-motion';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);

    const { currentUser } = useSelector(state => state.user)

    const adminID = currentUser._id

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList && studentsList.length;
    const numberOfClasses = sclassesList && sclassesList.length;
    const numberOfTeachers = teachersList && teachersList.length;

    const stats = [
        {
            title: 'Total Students',
            value: numberOfStudents,
            icon: <Person sx={{ fontSize: 40 }} />,
            color: '#A78BFA',
            bgColor: '#F3F0FF',
            trend: '+12%',
        },
        {
            title: 'Total Classes',
            value: numberOfClasses,
            icon: <School sx={{ fontSize: 40 }} />,
            color: '#60A5FA',
            bgColor: '#EFF6FF',
            trend: '+5%',
        },
        {
            title: 'Total Teachers',
            value: numberOfTeachers,
            icon: <Groups sx={{ fontSize: 40 }} />,
            color: '#F472B6',
            bgColor: '#FDF2F8',
            trend: '+8%',
        },
        {
            title: 'Fees Collection',
            value: 23000,
            icon: <AccountBalance sx={{ fontSize: 40 }} />,
            color: '#34D399',
            bgColor: '#ECFDF5',
            trend: '+15%',
            prefix: '$',
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
                            Hey {currentUser?.name || 'Admin'}! 👋
                        </WelcomeTitle>
                        <WelcomeText variant="body1">
                            Welcome back! Here's what's happening with your school today.
                        </WelcomeText>
                    </Box>
                    <WelcomeIllustration>
                        <img src={Students} alt="Welcome" style={{ width: '100%', maxWidth: '200px' }} />
                    </WelcomeIllustration>
                </WelcomeCard>

                {/* Stats Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {stats.map((stat, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
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
                                        {stat.prefix}
                                        <CountUp start={0} end={stat.value} duration={2.5} separator="," />
                                    </StatValue>
                                    <TrendBadge color={stat.color}>
                                        <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                                        {stat.trend} this month
                                    </TrendBadge>
                                </StatContent>
                            </ModernStatCard>
                        </Grid>
                    ))}
                </Grid>

                {/* Notice Board Section */}
                <Grid container spacing={3}>
                    <Grid item xs={12}>
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
    );
};


// Styled Components - Matching the soft purple/lavender aesthetic
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
  margin-bottom: 0.5rem;
`;

const TrendBadge = styled(Box)`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  background: ${props => props.color}15;
  color: ${props => props.color};
  font-size: 0.75rem;
  font-weight: 600;
  width: fit-content;
`;

const NoticeCard = styled(Paper)`
  padding: 2rem;
  border-radius: 20px;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid #F3F4F6;
`;

export default AdminHomePage