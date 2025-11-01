import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';

const SideBar = () => {
    const location = useLocation();
    return (
        <>
            <React.Fragment>
                <ListItemButton 
                    component={Link} 
                    to="/"
                    selected={location.pathname === "/" || location.pathname === "/Admin/dashboard"}
                >
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/Admin/classes"
                    selected={location.pathname.startsWith('/Admin/classes')}
                >
                    <ListItemIcon>
                        <ClassOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Classes" />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/Admin/subjects"
                    selected={location.pathname.startsWith("/Admin/subjects")}
                >
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Subjects" />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/Admin/teachers"
                    selected={location.pathname.startsWith("/Admin/teachers")}
                >
                    <ListItemIcon>
                        <SupervisorAccountOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Teachers" />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/Admin/students"
                    selected={location.pathname.startsWith("/Admin/students")}
                >
                    <ListItemIcon>
                        <PersonOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Students" />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/Admin/notices"
                    selected={location.pathname.startsWith("/Admin/notices")}
                >
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Notices" />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/Admin/complains"
                    selected={location.pathname.startsWith("/Admin/complains")}
                >
                    <ListItemIcon>
                        <ReportIcon />
                    </ListItemIcon>
                    <ListItemText primary="Complains" />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheader component="div" inset>
                    Account
                </ListSubheader>
                <ListItemButton 
                    component={Link} 
                    to="/Admin/profile"
                    selected={location.pathname.startsWith("/Admin/profile")}
                >
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton component={Link} to="/logout">
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </React.Fragment>
        </>
    )
}

export default SideBar
