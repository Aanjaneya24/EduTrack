import React from 'react';
import { Typography, Grid, Box, Avatar, Breadcrumbs, Link, Chip } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import SubjectIcon from '@mui/icons-material/Subject';
import EmailIcon from '@mui/icons-material/Email';
import {
    StyledPaper, PageHeader, InfoSection, InfoItem
} from '../../components/StyledComponents';

const TeacherProfile = () => {
  const navigate = useNavigate();
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const teachSclass = currentUser.teachSclass;
  const teachSubject = currentUser.teachSubject;
  const teachSchool = currentUser.school;

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
          <PersonIcon sx={{ mr: 0.5 }} fontSize="small" />
          Profile
        </Typography>
      </Breadcrumbs>

      {/* Page Header */}
      <PageHeader>
        <Box>
          <h4>Teacher Profile</h4>
          <p>View your teaching information and assigned subjects</p>
        </Box>
      </PageHeader>

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <StyledPaper sx={{ textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                margin: '0 auto 16px',
                background: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
                fontSize: '48px',
                fontWeight: 600
              }}
            >
              {String(currentUser.name).charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#1F2937', mb: 1 }}>
              {currentUser.name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#6B7280', mb: 2 }}>
              {teachSubject?.subName} Teacher
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Chip
                label={teachSclass?.sclassName}
                sx={{
                  background: '#F3E8FF',
                  color: '#6B21A8',
                  fontWeight: 500
                }}
              />
              <Chip
                label="Teacher"
                sx={{
                  background: '#DBEAFE',
                  color: '#1E40AF',
                  fontWeight: 500
                }}
              />
            </Box>
          </StyledPaper>
        </Grid>

        {/* Details Card */}
        <Grid item xs={12} md={8}>
          <StyledPaper>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1F2937', mb: 3 }}>
              Teaching Information
            </Typography>
            <InfoSection>
              <InfoItem color="#60A5FA">
                <label>Full Name</label>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <PersonIcon sx={{ color: '#60A5FA' }} />
                  <Typography className="value">{currentUser.name}</Typography>
                </Box>
              </InfoItem>
              <InfoItem color="#EC4899">
                <label>Email Address</label>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <EmailIcon sx={{ color: '#EC4899' }} />
                  <Typography className="value">{currentUser.email}</Typography>
                </Box>
              </InfoItem>
              <InfoItem color="#F59E0B">
                <label>Assigned Class</label>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <ClassIcon sx={{ color: '#F59E0B' }} />
                  <Typography className="value">{teachSclass?.sclassName}</Typography>
                </Box>
              </InfoItem>
              <InfoItem color="#A78BFA">
                <label>Teaching Subject</label>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <SubjectIcon sx={{ color: '#A78BFA' }} />
                  <Typography className="value">{teachSubject?.subName}</Typography>
                </Box>
              </InfoItem>
              <InfoItem color="#34D399">
                <label>School Name</label>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <SchoolIcon sx={{ color: '#34D399' }} />
                  <Typography className="value">{teachSchool?.schoolName}</Typography>
                </Box>
              </InfoItem>
            </InfoSection>
          </StyledPaper>

          {/* Teaching Stats */}
          <StyledPaper sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1F2937', mb: 3 }}>
              Quick Overview
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 2,
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
                    color: 'white'
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {teachSclass?.sclassName}
                  </Typography>
                  <Typography variant="body2">Class</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 2,
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                    color: 'white'
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '20px' }}>
                    {teachSubject?.subName}
                  </Typography>
                  <Typography variant="body2">Subject</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 2,
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)',
                    color: 'white'
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Active
                  </Typography>
                  <Typography variant="body2">Status</Typography>
                </Box>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeacherProfile;