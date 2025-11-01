import { useEffect, useState } from 'react';
import { IconButton, Box, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Chip, InputAdornment, Tooltip, Breadcrumbs, Typography, Link } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddCardIcon from '@mui/icons-material/AddCard';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HomeIcon from '@mui/icons-material/Home';
import ClassIcon from '@mui/icons-material/Class';
import {
    PageHeader, SearchContainer, StyledSearchField,
    PrimaryButton, EmptyState, LoadingOverlay, TableContainer as ModernTableContainer
} from '../../../components/StyledComponents';

const ShowClasses = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector(state => state.user)

  const adminID = currentUser._id
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  if (error) {
    console.log(error)
  }

  const filteredClasses = sclassesList && sclassesList.length > 0 
    ? sclassesList.filter(sclass => 
        sclass.sclassName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const deleteHandler = (deleteID, address) => {
    console.log(deleteID);
    console.log(address);
    
    dispatch(deleteUser(deleteID, address))
      .then(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
      })
  }

  const actions = [
    {
      icon: <AddCardIcon color="primary" />, name: 'Add New Class',
      action: () => navigate("/Admin/addclass")
    },
    {
      icon: <DeleteIcon color="error" />, name: 'Delete All Classes',
      action: () => deleteHandler(adminID, "Sclasses")
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
          <ClassIcon sx={{ mr: 0.5 }} fontSize="small" />
          Classes
        </Typography>
      </Breadcrumbs>

      {/* Page Header */}
      <PageHeader>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <h4>Classes Management</h4>
            <p>View and manage all classes in your school</p>
          </Box>
          <PrimaryButton
            startIcon={<AddCardIcon />}
            onClick={() => navigate("/Admin/addclass")}
          >
            Add New Class
          </PrimaryButton>
        </Box>
      </PageHeader>

      {loading ? (
        <LoadingOverlay>
          <CircularProgress />
        </LoadingOverlay>
      ) : getresponse ? (
        <EmptyState>
          <ClassIcon sx={{ fontSize: 80, color: '#D1D5DB' }} />
          <h3>No Classes Found</h3>
          <p>Get started by adding your first class</p>
          <Box sx={{ mt: 3 }}>
            <PrimaryButton
              startIcon={<AddCardIcon />}
              onClick={() => navigate("/Admin/addclass")}
            >
              Add Class
            </PrimaryButton>
          </Box>
        </EmptyState>
      ) : (
        <>
          {/* Search Bar */}
          <SearchContainer>
            <StyledSearchField
              placeholder="Search classes..."
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
              label={`${filteredClasses.length} Classes`}
              sx={{
                background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                color: 'white',
                fontWeight: 600,
                fontSize: '14px',
                height: '40px'
              }}
            />
          </SearchContainer>

          {/* Classes Table */}
          <ModernTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Class Name</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredClasses.length > 0 ? (
                  filteredClasses.map((sclass, index) => (
                    <TableRow key={sclass._id}>
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
                              width: 40,
                              height: 40,
                              borderRadius: '8px',
                              background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontWeight: 600
                            }}
                          >
                            <ClassIcon />
                          </Box>
                          <Typography sx={{ fontWeight: 500, fontSize: '16px' }}>
                            {sclass.sclassName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                          <Tooltip title="View Details">
                            <IconButton
                              size="small"
                              onClick={() => navigate("/Admin/classes/class/" + sclass._id)}
                              sx={{
                                background: '#DBEAFE',
                                color: '#1E40AF',
                                '&:hover': { background: '#BFDBFE' }
                              }}
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Add Subjects">
                            <IconButton
                              size="small"
                              onClick={() => navigate("/Admin/addsubject/" + sclass._id)}
                              sx={{
                                background: '#D1FAE5',
                                color: '#065F46',
                                '&:hover': { background: '#A7F3D0' }
                              }}
                            >
                              <PostAddIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Add Students">
                            <IconButton
                              size="small"
                              onClick={() => navigate("/Admin/class/addstudents/" + sclass._id)}
                              sx={{
                                background: '#FEF3C7',
                                color: '#92400E',
                                '&:hover': { background: '#FDE68A' }
                              }}
                            >
                              <PersonAddAlt1Icon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Class">
                            <IconButton
                              size="small"
                              onClick={() => deleteHandler(sclass._id, "Sclass")}
                              sx={{
                                background: '#FEE2E2',
                                color: '#991B1B',
                                '&:hover': { background: '#FECACA' }
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center" sx={{ py: 8 }}>
                      <EmptyState>
                        <SearchIcon />
                        <h3>No classes found</h3>
                        <p>Try adjusting your search terms</p>
                      </EmptyState>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ModernTableContainer>

          <SpeedDialTemplate actions={actions} />
        </>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Box>
  );
};

export default ShowClasses;