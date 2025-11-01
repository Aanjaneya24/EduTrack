import React from 'react';
import { Typography, Grid, Box, Avatar, Breadcrumbs, Link, Chip } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import {
    StyledPaper, PageHeader, InfoSection, InfoItem
} from '../../components/StyledComponents';

const StudentProfile = () => {
  const navigate = useNavigate();
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const sclassName = currentUser.sclassName;
  const studentSchool = currentUser.school;

  return (
    <Box sx={{ padding: '24px', background: '#F9FAFB', minHeight: '100vh' }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          color="inherit"
          onClick={() => navigate('/Student/dashboard')}
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
          <h4>Student Profile</h4>
          <p>View your personal information and academic details</p>
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
                background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
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
              Roll No: {currentUser.rollNum}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Chip
                label={sclassName.sclassName}
                sx={{
                  background: '#F3E8FF',
                  color: '#6B21A8',
                  fontWeight: 500
                }}
              />
              <Chip
                label="Student"
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
              Academic Information
            </Typography>
            <InfoSection>
              <InfoItem color="#A78BFA">
                <label>Full Name</label>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <PersonIcon sx={{ color: '#A78BFA' }} />
                  <Typography className="value">{currentUser.name}</Typography>
                </Box>
              </InfoItem>
              <InfoItem color="#60A5FA">
                <label>Roll Number</label>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <BadgeIcon sx={{ color: '#60A5FA' }} />
                  <Typography className="value">{currentUser.rollNum}</Typography>
                </Box>
              </InfoItem>
              <InfoItem color="#F59E0B">
                <label>Class</label>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <ClassIcon sx={{ color: '#F59E0B' }} />
                  <Typography className="value">{sclassName.sclassName}</Typography>
                </Box>
              </InfoItem>
              <InfoItem color="#34D399">
                <label>School Name</label>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <SchoolIcon sx={{ color: '#34D399' }} />
                  <Typography className="value">{studentSchool.schoolName}</Typography>
                </Box>
              </InfoItem>
              <InfoItem color="#EC4899">
                <label>Email</label>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <EmailIcon sx={{ color: '#EC4899' }} />
                  <Typography className="value">{currentUser.email || 'Not provided'}</Typography>
                </Box>
              </InfoItem>
            </InfoSection>
          </StyledPaper>

          {/* Academic Stats */}
          <StyledPaper sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1F2937', mb: 3 }}>
              Quick Stats
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 2,
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                    color: 'white'
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {sclassName.sclassName}
                  </Typography>
                  <Typography variant="body2">Class</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
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
                    {currentUser.rollNum}
                  </Typography>
                  <Typography variant="body2">Roll No</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
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
              <Grid item xs={6} sm={3}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 2,
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                    color: 'white'
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    2024
                  </Typography>
                  <Typography variant="body2">Year</Typography>
                </Box>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentProfile;