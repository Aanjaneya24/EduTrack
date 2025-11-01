import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, InputAdornment, TextField, Breadcrumbs, Link, Typography,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Avatar, Tooltip, IconButton
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getAllComplains } from '../../../redux/complainRelated/complainHandle';
import { 
  StyledPaper, 
  PageHeader, 
  SearchContainer, 
  TableContainer as StyledTableContainer, 
  EmptyState,
  LoadingOverlay 
} from '../../../components/StyledComponents';

const SeeComplains = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [resolvedComplaints, setResolvedComplaints] = useState(new Set());

  const { complainsList, loading, error, response } = useSelector((state) => state.complain);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getAllComplains(currentUser._id, "Complain"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const handleMarkResolved = (complainId) => {
    const newResolved = new Set(resolvedComplaints);
    if (newResolved.has(complainId)) {
      newResolved.delete(complainId);
    } else {
      newResolved.add(complainId);
    }
    setResolvedComplaints(newResolved);
  };

  const complainRows = complainsList && complainsList.length > 0 && complainsList
    .map((complain) => {
      const date = new Date(complain.date);
      const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
      return {
        user: complain.user.name,
        complaint: complain.complaint,
        date: dateString,
        id: complain._id,
      };
    })
    .filter((complain) => 
      complain.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complain.complaint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complain.date.includes(searchTerm)
    );

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
          <ReportProblemIcon sx={{ mr: 0.5 }} fontSize="small" />
          Complaints
        </Typography>
      </Breadcrumbs>

      {/* Page Header */}
      <PageHeader>
        <Box>
          <h4>All Complaints</h4>
          <p>Review and manage complaints from students and teachers</p>
        </Box>
        <Box sx={{ 
          background: '#FEF3C7', 
          padding: '8px 16px', 
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <ReportProblemIcon sx={{ color: '#F59E0B', fontSize: 20 }} />
          <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#92400E' }}>
            {complainsList?.length || 0} Total Complaints
          </Typography>
        </Box>
      </PageHeader>

      {loading ? (
        <LoadingOverlay>Loading complaints...</LoadingOverlay>
      ) : response || !complainsList || complainsList.length === 0 ? (
        <EmptyState>
          <CheckCircleIcon sx={{ fontSize: 80, color: '#10B981', mb: 2 }} />
          <h3>No Complaints</h3>
          <p>Great! There are no complaints at the moment.</p>
        </EmptyState>
      ) : (
        <>
          {/* Search Bar */}
          <SearchContainer>
            <TextField
              placeholder="Search by user, complaint, or date..."
              variant="outlined"
              fullWidth
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
          </SearchContainer>

          {/* Complaints Table */}
          <StyledTableContainer>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>User</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Complaint</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Status</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600, color: '#374151' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {complainRows.map((row) => (
                    <TableRow 
                      key={row.id} 
                      hover
                      sx={{ 
                        '&:last-child td, &:last-child th': { border: 0 },
                        opacity: resolvedComplaints.has(row.id) ? 0.6 : 1,
                        background: resolvedComplaints.has(row.id) ? '#F0FDF4' : 'transparent'
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar 
                            sx={{ 
                              width: 36, 
                              height: 36, 
                              background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                              fontSize: '14px'
                            }}
                          >
                            {row.user.charAt(0).toUpperCase()}
                          </Avatar>
                          <Box>
                            <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#1F2937' }}>
                              {row.user}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography 
                          sx={{ 
                            fontSize: '14px', 
                            color: '#6B7280',
                            maxWidth: '400px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {row.complaint}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CalendarTodayIcon sx={{ fontSize: 16, color: '#9CA3AF' }} />
                          <Typography sx={{ fontSize: '14px', color: '#6B7280' }}>
                            {row.date}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {resolvedComplaints.has(row.id) ? (
                          <Chip 
                            label="Resolved" 
                            size="small" 
                            sx={{ 
                              background: '#D1FAE5', 
                              color: '#065F46', 
                              fontWeight: 600,
                              fontSize: '12px'
                            }} 
                          />
                        ) : (
                          <Chip 
                            label="Pending" 
                            size="small" 
                            sx={{ 
                              background: '#FEF3C7', 
                              color: '#92400E', 
                              fontWeight: 600,
                              fontSize: '12px'
                            }} 
                          />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title={resolvedComplaints.has(row.id) ? "Mark as Pending" : "Mark as Resolved"}>
                          <IconButton
                            onClick={() => handleMarkResolved(row.id)}
                            sx={{ 
                              color: resolvedComplaints.has(row.id) ? '#10B981' : '#9CA3AF',
                              '&:hover': { 
                                background: resolvedComplaints.has(row.id) ? '#D1FAE5' : '#F3F4F6' 
                              }
                            }}
                          >
                            <CheckCircleIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </StyledTableContainer>

          {complainRows.length === 0 && searchTerm && (
            <EmptyState>
              <SearchIcon sx={{ fontSize: 80, color: '#9CA3AF', mb: 2 }} />
              <h3>No results found</h3>
              <p>Try adjusting your search terms</p>
            </EmptyState>
          )}
        </>
      )}
    </Box>
  );
};

export default SeeComplains;