import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from 'components/home';
import SignIn from 'components/signin';
import 'App.css';
import SignUp from 'components/signup';
import ResponsiveAppBar from 'components/appBar';
import CourseDetail from 'components/course/courseDetail';
import theme from 'components/theme';
import AuthorAccount from 'components/author/account';
import AuthorLectureList from 'components/author/course/lectureList';
import PageNotFound from 'components/404-page';

import { Routes, Route } from 'react-router-dom';

import { createContext, useContext, useEffect, useState } from 'react';
import { AuthProvider } from 'context/authContext';
import StudentAccount from './components/student/account';
import ContactForm from 'components/contactForm';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ResponsiveAppBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='contact' element={<ContactForm />} />
          <Route path='author/courses/:courseId' element={<AuthorLectureList />} />
          {/* <Route path='student/:courseId' element={<Student />} /> */}

          <Route path='author/*' element={<AuthorAccount />} />
          <Route path='student/*' element={<StudentAccount />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
