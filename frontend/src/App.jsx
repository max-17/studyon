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

function App() {
  // const axiosPrivate = useAxiosPrivate();

  // useEffect(() => {
  //   let isMounted = true;
  //   const controller = new AbortController();

  //   const getUser = async () => {
  //     try {
  //       const response = await axiosPrivate.get('/auth/users/me/', {
  //         signal: controller.signal,
  //       });
  //       console.log(response.data);
  //       isMounted && setUser(response.data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   getUser();

  //   return () => {
  //     isMounted = false;
  //     controller.abort();
  //   };
  // }, []);

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ResponsiveAppBar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='signin' element={<SignIn />}></Route>
          <Route path='signup' element={<SignUp />}></Route>
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
