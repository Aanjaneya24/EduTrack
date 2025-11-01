import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import Popup from '../../../components/Popup';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress, TextField, Box, Breadcrumbs, Link, Typography, Chip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SubjectIcon from '@mui/icons-material/Subject';
import ClassIcon from '@mui/icons-material/Class';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import {
    FormContainer, PageHeader, PrimaryButton, InfoSection, InfoItem, LoadingOverlay
} from '../../../components/StyledComponents';

const AddTeacher = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const subjectID = params.id

  const { status, response, error } = useSelector(state => state.user);
  const { subjectDetails } = useSelector((state) => state.sclass);

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
  }, [dispatch, subjectID]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false)

  const role = "Teacher"
  const school = subjectDetails && subjectDetails.school
  const teachSubject = subjectDetails && subjectDetails._id
  const teachSclass = subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName._id

  const fields = { name, email, password, role, school, teachSubject, teachSclass }

  const submitHandler = (event) => {
    event.preventDefault()
    setLoader(true)
    dispatch(registerUser(fields, role))
  }

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl())
      navigate("/Admin/teachers")
    }
    else if (status === 'failed') {
      setMessage(response)
      setShowPopup(true)
      setLoader(false)
    }
    else if (status === 'error') {
      setMessage("Network Error")
      setShowPopup(true)
      setLoader(false)
    }
  }, [status, navigate, error, response, dispatch]);

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
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          color="inherit"
          onClick={() => navigate('/Admin/teachers')}
        >
          <SchoolIcon sx={{ mr: 0.5 }} fontSize="small" />
          Teachers
        </Link>
        <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
          <PersonAddIcon sx={{ mr: 0.5 }} fontSize="small" />
          Add Teacher
        </Typography>
      </Breadcrumbs>

      {/* Page Header */}
      <PageHeader>
        <Box>
          <h4>Add New Teacher</h4>
          <p>Register a new teacher for the selected subject and class</p>
        </Box>
      </PageHeader>

      {/* Subject and Class Info */}
      {subjectDetails && (
        <InfoSection sx={{ mb: 3 }}>
          <InfoItem color="#A78BFA">
            <label>Subject</label>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <SubjectIcon sx={{ color: '#A78BFA' }} />
              <Typography className="value">{subjectDetails.subName}</Typography>
            </Box>
          </InfoItem>
          <InfoItem color="#60A5FA">
            <label>Class</label>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <ClassIcon sx={{ color: '#60A5FA' }} />
              <Typography className="value">
                {subjectDetails.sclassName && subjectDetails.sclassName.sclassName}
              </Typography>
            </Box>
          </InfoItem>
        </InfoSection>
      )}

      {/* Form */}
      <FormContainer>
        <form onSubmit={submitHandler}>
          <TextField
            fullWidth
            label="Teacher Name"
            type="text"
            placeholder="Enter teacher's full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            required
            InputProps={{
              startAdornment: <PersonAddIcon sx={{ mr: 1, color: '#9CA3AF' }} />
            }}
          />

          <TextField
            fullWidth
            label="Email Address"
            type="email"
            placeholder="Enter teacher's email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            InputProps={{
              startAdornment: <EmailIcon sx={{ mr: 1, color: '#9CA3AF' }} />
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            placeholder="Enter teacher's password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            required
            InputProps={{
              startAdornment: <LockIcon sx={{ mr: 1, color: '#9CA3AF' }} />
            }}
          />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
            <PrimaryButton
              type="button"
              onClick={() => navigate('/Admin/teachers')}
              sx={{ background: '#9CA3AF !important' }}
            >
              Cancel
            </PrimaryButton>
            <PrimaryButton
              type="submit"
              disabled={loader}
              startIcon={loader ? <CircularProgress size={16} sx={{ color: 'white' }} /> : <PersonAddIcon />}
            >
              {loader ? 'Registering...' : 'Register Teacher'}
            </PrimaryButton>
          </Box>
        </form>
      </FormContainer>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Box>
  )
}

export default AddTeacher