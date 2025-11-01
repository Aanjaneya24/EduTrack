# 📚 EduTrack - School Management System

<div align="center">

![EduTrack Banner](https://img.shields.io/badge/EduTrack-School%20Management-6366f1?style=for-the-badge)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.12.1-007FFF?style=flat&logo=mui)](https://mui.com/)

**A comprehensive MERN stack school management platform that streamlines academic administration, classroom organization, and communication between Admins, Teachers, and Students.**

### 🌐 Live Demo

**Frontend:** [https://edu-track-iota.vercel.app](https://edu-track-iota.vercel.app)  
**Backend API:** [https://edutrack-nm04.onrender.com](https://edutrack-nm04.onrender.com)

*Note: The backend may take 30-50 seconds to wake up on first request (free tier limitation)*

[🚀 Features](#-features) • [🛠️ Tech Stack](#️-tech-stack) • [📦 Installation](#-installation) • [🎯 Usage](#-usage) • [🎭 Guest Demo](#-guest-demo-access)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [System Architecture](#-system-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Guest Demo Access](#-guest-demo-access)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## Overview

**EduTrack** is a modern, full-stack school management system designed to digitize and simplify educational administration. Built with the MERN stack, it provides role-based access control for three types of users: **Admins**, **Teachers**, and **Students**, each with dedicated dashboards and functionalities.

### 🎯 Problem Statement
Traditional school management involves manual tracking of attendance, grades, subjects, and communication—leading to inefficiencies and errors.

### ✅ Solution
EduTrack provides a centralized digital platform that automates attendance tracking, grade management, class organization, and facilitates seamless communication between all stakeholders.

---

## 🚀 Features

### �‍💼 Admin Features
- **Dashboard Analytics**: Visual overview of students, teachers, classes, and subjects with interactive charts
- **User Management**: 
  - Add, view, update, and delete students
  - Add, view, update, and delete teachers
  - Assign teachers to subjects and classes
- **Class Management**: 
  - Create and manage multiple classes
  - View class details with enrolled students
  - Delete classes (with student reassignment options)
- **Subject Management**: 
  - Create subjects and assign to classes
  - Link teachers to subjects
  - Track subject-wise performance
- **Notice Board**: Create and manage school-wide announcements
- **Complaint Management**: View and manage complaints from students and teachers
- **Profile Management**: Update admin credentials and school information

### �‍🏫 Teacher Features
- **Teacher Dashboard**: Overview of assigned classes and subjects
- **Student Management**: 
  - View complete list of students in assigned classes
  - Access individual student profiles and academic records
- **Attendance Management**: 
  - Mark daily attendance for students
  - View attendance history and patterns
- **Grade Management**: 
  - Record marks for students in assigned subjects
  - Track student performance over time
- **Class Details**: View comprehensive information about assigned classes
- **Complaint System**: Submit complaints or feedback to administration
- **Profile Management**: Update personal information and credentials

### 👨‍🎓 Student Features
- **Student Dashboard**: Personalized overview of academic performance
- **Attendance Tracking**: 
  - View personal attendance records
  - Subject-wise attendance breakdown
  - Attendance calculator to track required classes
- **Grade Viewing**: 
  - View marks in all enrolled subjects
  - Performance analytics with charts
- **Subject Information**: Access details about enrolled subjects and teachers
- **Notice Board**: View school announcements and important updates
- **Complaint System**: Submit complaints or feedback to administration
- **Profile Management**: View and update personal information

### 🎨 UI/UX Features
- **Modern Design**: Clean, purple-themed interface with Material-UI components
- **Responsive Layout**: Fully responsive design for all screen sizes
- **Interactive Charts**: Data visualization using Recharts for better insights
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Particle Background**: Aesthetic particle effects on authentication pages
- **Loading States**: Proper loading indicators for better user feedback
- **Error Handling**: Comprehensive error messages and popups

---

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - UI library for building interactive interfaces
- **Material-UI 5.12.1** - Component library for modern design
- **Redux Toolkit** - State management for predictable data flow
- **React Router DOM** - Client-side routing
- **Recharts** - Data visualization and charting library
- **Framer Motion** - Animation library for smooth transitions
- **Axios** - HTTP client for API requests
- **Styled Components** - CSS-in-JS styling solution
- **React Particles** - Background particle effects

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js 4.18.2** - Web application framework
- **MongoDB Atlas** - Cloud-based NoSQL database
- **Mongoose 7.0.4** - MongoDB object modeling
- **Bcrypt 5.1.0** - Password hashing for security
- **CORS** - Cross-Origin Resource Sharing
- **Dotenv** - Environment variable management

### Development Tools
- **Nodemon** - Auto-restart server during development
- **React Scripts** - Build and development scripts
- **ESLint** - Code linting and quality assurance

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  (React + Redux + Material-UI + React Router)               │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/HTTPS (Axios)
                     │
┌────────────────────▼────────────────────────────────────────┐
│                      Server Layer                            │
│              (Node.js + Express.js)                         │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Routes     │  │ Controllers  │  │  Middleware  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────┬────────────────────────────────────────┘
                     │ Mongoose ODM
                     │
┌────────────────────▼────────────────────────────────────────┐
│                     Database Layer                           │
│                   (MongoDB Atlas)                           │
│                                                              │
│  Collections: admins, students, teachers, sclasses,         │
│               subjects, notices, complains                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Installation

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB Atlas account** (or local MongoDB installation)
- **Git**

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aanjaneya24/EduTrack.git
   cd EduTrack
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Setup Backend**
   ```bash
   cd server
   npm install
   ```

4. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```

5. **Configure Environment Variables** (See [Configuration](#-configuration) section)

6. **Seed Guest Accounts** (Optional - for demo purposes)
   ```bash
   cd ../server
   node seedGuestAccounts.js
   ```

7. **Start the Application**
   
   **Option 1: Run both servers separately**
   
   Terminal 1 (Backend):
   ```bash
   cd server
   npm start
   ```
   
   Terminal 2 (Frontend):
   ```bash
   cd client
   npm start
   ```
   
   **Option 2: Use concurrently (if configured)**
   ```bash
   npm run dev
   ```

8. **Access the Application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5001`

---

## ⚙️ Configuration

### Backend Configuration

Create a `.env` file in the `server` directory:

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/edutrack?retryWrites=true&w=majority

# Server Configuration
PORT=5001
NODE_ENV=development

# Security (Optional - for future JWT implementation)
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
```

### Frontend Configuration

Create a `.env` file in the `client` directory:

```env
# API Base URL
REACT_APP_BASE_URL=http://localhost:5001

# Optional: Google Analytics, etc.
REACT_APP_GA_TRACKING_ID=your_tracking_id
```

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (Free tier available)
3. Create database user with username and password
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get connection string and replace in `MONGO_URI`

---

## 🎯 Usage

### First Time Setup

1. **Start the application** following installation steps
2. **Access the homepage** at `http://localhost:3000`
3. **Choose your role**: Admin, Teacher, or Student
4. **For first-time admin setup**:
   - Click on "Admin" → "Register" (if no admin exists)
   - Fill in school details and admin credentials
   - Login with created credentials

### Admin Workflow

1. **Login** with admin credentials
2. **Create Classes**: Navigate to "Classes" → "Add Class"
3. **Create Subjects**: Navigate to "Subjects" → "Add Subject" (assign to class)
4. **Add Teachers**: Navigate to "Teachers" → "Add Teacher" (assign subjects)
5. **Add Students**: Navigate to "Students" → "Add Student" (assign to class)
6. **Post Notices**: Navigate to "Notices" → "Add Notice"
7. **Monitor Dashboard**: View analytics and system overview

### Teacher Workflow

1. **Login** with teacher credentials (provided by admin)
2. **View Dashboard**: See assigned classes and subjects
3. **Mark Attendance**: Navigate to class → "Attendance" → Select date → Mark present/absent
4. **Record Grades**: Navigate to class → Select student → "Add Marks" → Enter marks
5. **View Students**: Access student profiles and academic records
6. **Submit Complaints**: Use complaint form for feedback

### Student Workflow

1. **Login** with student credentials (roll number + name/password)
2. **View Dashboard**: See academic overview and performance charts
3. **Check Attendance**: Navigate to "Attendance" → View subject-wise records
4. **View Grades**: Navigate to "Subjects" → See marks and performance
5. **Read Notices**: Stay updated with school announcements
6. **Submit Complaints**: Use complaint form for issues or feedback

---

## 📡 API Documentation

### Base URL
```
http://localhost:5001
```

### Authentication Endpoints

#### Admin Login
```http
POST /AdminLogin
Content-Type: application/json

{
  "email": "admin@school.com",
  "password": "password123"
}
```

#### Teacher Login
```http
POST /TeacherLogin
Content-Type: application/json

{
  "email": "teacher@school.com",
  "password": "password123"
}
```

#### Student Login
```http
POST /StudentLogin
Content-Type: application/json

{
  "rollNum": 1,
  "studentName": "John Doe",
  "password": "password123"
}
```

### Admin Operations

#### Get All Students
```http
GET /Students/:id
```

#### Add Student
```http
POST /StudentReg
Content-Type: application/json

{
  "name": "Student Name",
  "rollNum": 101,
  "password": "password123",
  "sclassName": "classId",
  "adminID": "adminId"
}
```

#### Get All Teachers
```http
GET /Teachers/:id
```

#### Add Teacher
```http
POST /TeacherReg
Content-Type: application/json

{
  "name": "Teacher Name",
  "email": "teacher@school.com",
  "password": "password123",
  "role": "Teacher",
  "school": "schoolId",
  "teachSubject": "subjectId",
  "teachSclass": "classId"
}
```

#### Add Class
```http
POST /SclassCreate
Content-Type: application/json

{
  "sclassName": "Class 10A",
  "adminID": "adminId"
}
```

#### Add Subject
```http
POST /SubjectCreate
Content-Type: application/json

{
  "subName": "Mathematics",
  "subCode": "MATH101",
  "sessions": 40,
  "sclassName": "classId",
  "adminID": "adminId"
}
```

### Teacher Operations

#### Mark Attendance
```http
PUT /UpdateStudentFields/:id
Content-Type: application/json

{
  "attendance": [{
    "date": "2025-11-01",
    "status": "Present",
    "subName": "subjectId"
  }]
}
```

#### Add Student Marks
```http
PUT /UpdateStudentFields/:id
Content-Type: application/json

{
  "examResult": [{
    "subName": "subjectId",
    "marksObtained": 85
  }]
}
```

### Student Operations

#### Get Student Details
```http
GET /Student/:id
```

#### View Attendance
```http
GET /Student/:id
Response includes attendance array
```

#### Submit Complaint
```http
POST /ComplainCreate
Content-Type: application/json

{
  "user": "studentId",
  "complaint": "Complaint text here",
  "school": "schoolId"
}
```

---

## 🎭 Guest Demo Access

EduTrack provides pre-configured guest accounts for demonstration purposes. Click **"Continue as Guest"** on the login page or **"Explore as Guest"** on the homepage.

### Guest Credentials

| Role    | Email/Roll No        | Name/Email       | Password |
|---------|---------------------|------------------|----------|
| Admin   | John@12             | John Doe         | zxc      |
| Teacher | Aanjaneya Pandey    | Aanjaneya Pandey | zxc      |
| Student | Roll No: 1          | kite             | zxc      |

### Setting Up Guest Accounts

Run the seed script to create guest accounts in your database:

```bash
cd server
node seedGuestAccounts.js
```

This will create:
- ✅ Guest Admin account
- ✅ Demo Class (Class 1)
- ✅ Guest Student (enrolled in Demo Class)
- ✅ Guest Teacher (assigned to Demo Class)

---

## 📁 Project Structure

```
EduTrack/
├── client/                          # Frontend React application
│   ├── public/
│   │   └── index.html              # HTML template
│   ├── src/
│   │   ├── assets/                 # Images, icons, static files
│   │   ├── components/             # Reusable React components
│   │   │   ├── AccountMenu.js
│   │   │   ├── attendanceCalculator.js
│   │   │   ├── CustomBarChart.js
│   │   │   ├── CustomPieChart.js
│   │   │   ├── ErrorPage.js
│   │   │   ├── ParticlesBackground.js
│   │   │   ├── Popup.js
│   │   │   ├── SpeedDialTemplate.js
│   │   │   ├── TableTemplate.js
│   │   │   └── TableViewTemplate.js
│   │   ├── pages/                  # Page components
│   │   │   ├── admin/              # Admin-specific pages
│   │   │   │   ├── AdminDashboard.js
│   │   │   │   ├── AdminHomePage.js
│   │   │   │   ├── AdminProfile.js
│   │   │   │   ├── AdminRegisterPage.js
│   │   │   │   ├── SideBar.js
│   │   │   │   ├── classRelated/
│   │   │   │   │   ├── AddClass.js
│   │   │   │   │   ├── ClassDetails.js
│   │   │   │   │   └── ShowClasses.js
│   │   │   │   ├── noticeRelated/
│   │   │   │   │   ├── AddNotice.js
│   │   │   │   │   └── ShowNotices.js
│   │   │   │   ├── studentRelated/
│   │   │   │   │   ├── AddStudent.js
│   │   │   │   │   ├── SeeComplains.js
│   │   │   │   │   ├── ShowStudents.js
│   │   │   │   │   ├── StudentAttendance.js
│   │   │   │   │   ├── StudentExamMarks.js
│   │   │   │   │   └── ViewStudent.js
│   │   │   │   ├── subjectRelated/
│   │   │   │   │   ├── AddSubject.js
│   │   │   │   │   ├── ShowSubjects.js
│   │   │   │   │   ├── SubjectDetails.js
│   │   │   │   │   └── ViewSubject.js
│   │   │   │   └── teacherRelated/
│   │   │   │       ├── AddTeacher.js
│   │   │   │       ├── ChooseSubject.js
│   │   │   │       ├── ShowTeachers.js
│   │   │   │       └── TeacherDetails.js
│   │   │   ├── student/            # Student-specific pages
│   │   │   │   ├── StudentComplain.js
│   │   │   │   ├── StudentDashboard.js
│   │   │   │   ├── StudentHomePage.js
│   │   │   │   ├── StudentProfile.js
│   │   │   │   ├── StudentSideBar.js
│   │   │   │   ├── StudentSubjects.js
│   │   │   │   └── ViewStdAttendance.js
│   │   │   ├── teacher/            # Teacher-specific pages
│   │   │   │   ├── TeacherClassDetails.js
│   │   │   │   ├── TeacherComplain.js
│   │   │   │   ├── TeacherDashboard.js
│   │   │   │   ├── TeacherHomePage.js
│   │   │   │   ├── TeacherProfile.js
│   │   │   │   ├── TeacherSideBar.js
│   │   │   │   └── TeacherViewStudent.js
│   │   │   ├── ChooseUser.js       # Role selection page
│   │   │   ├── Homepage.js         # Landing page
│   │   │   ├── LoginPage.js        # Login page
│   │   │   └── Logout.js           # Logout handler
│   │   ├── redux/                  # State management
│   │   │   ├── store.js            # Redux store configuration
│   │   │   ├── complainRelated/
│   │   │   │   ├── complainHandle.js
│   │   │   │   └── complainSlice.js
│   │   │   ├── noticeRelated/
│   │   │   │   ├── noticeHandle.js
│   │   │   │   └── noticeSlice.js
│   │   │   ├── sclassRelated/
│   │   │   │   ├── sclassHandle.js
│   │   │   │   └── sclassSlice.js
│   │   │   ├── studentRelated/
│   │   │   │   ├── studentHandle.js
│   │   │   │   └── studentSlice.js
│   │   │   ├── teacherRelated/
│   │   │   │   ├── teacherHandle.js
│   │   │   │   └── teacherSlice.js
│   │   │   └── userRelated/
│   │   │       ├── userHandle.js
│   │   │       └── userSlice.js
│   │   ├── App.js                  # Main app component
│   │   ├── index.js                # React entry point
│   │   └── index.css               # Global styles
│   ├── .env                        # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── netlify.toml                # Netlify deployment config
│
├── server/                          # Backend Node.js application
│   ├── controllers/                # Request handlers
│   │   ├── admin-controller.js
│   │   ├── class-controller.js
│   │   ├── complain-controller.js
│   │   ├── notice-controller.js
│   │   ├── student_controller.js
│   │   ├── subject-controller.js
│   │   └── teacher-controller.js
│   ├── models/                     # Mongoose schemas
│   │   ├── adminSchema.js
│   │   ├── complainSchema.js
│   │   ├── noticeSchema.js
│   │   ├── sclassSchema.js
│   │   ├── studentSchema.js
│   │   ├── subjectSchema.js
│   │   └── teacherSchema.js
│   ├── routes/
│   │   └── route.js                # API routes
│   ├── .env                        # Environment variables
│   ├── .gitignore
│   ├── index.js                    # Server entry point
│   ├── package.json
│   └── seedGuestAccounts.js        # Guest account seeder
│
├── .gitignore                       # Root gitignore
├── package.json                     # Root package file
└── README.md                        # Documentation (this file)
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages
- Add comments for complex logic
- Test thoroughly before submitting PR
- Update documentation for new features

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Aanjaneya Pandey**

- GitHub: [@Aanjaneya24](https://github.com/Aanjaneya24)
- Project Link: [https://github.com/Aanjaneya24/EduTrack](https://github.com/Aanjaneya24)

---

## 🙏 Acknowledgments

- Material-UI for the comprehensive component library
- MongoDB Atlas for reliable database hosting
- React community for excellent documentation
- All contributors and testers

---

## 📞 Support

For support, issues, or feature requests:
- Open an issue on [GitHub Issues](https://github.com/Aanjaneya24/EduTrack/issues)
- Contact: [Create an issue with 'question' label]

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

Made with ❤️ by Aanjaneya Pandey

</div>

