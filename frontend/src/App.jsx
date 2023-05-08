<<<<<<< HEAD
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from 'components/home';
import SignIn from 'components/signin';
import 'App.css';
import SignUp from 'components/signup';
import ResponsiveAppBar from 'components/appBar';
import CourseDetail from 'components/course/courseDetail';
import theme from 'components/theme';
import AuthorAccount from 'components/authhor/account';
import AuthorCourseDetail from 'components/authhor/course/courseDetail';
import PageNotFound from 'components/404-page';
=======
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './components/home';
import SignIn from './components/signin';
import './App.css';
import SignUp from './components/signup';
import ResponsiveAppBar from './components/appBar';
import Course from './components/course/about_course';
import theme from './components/theme';
import AuthorAccount from './components/account';
>>>>>>> bf85c6042b51f32c313570aff81a4d9b44e89503

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ResponsiveAppBar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
<<<<<<< HEAD
        <Route path='signin' element={<SignIn />}></Route>
        <Route path='signup' element={<SignUp />}></Route>
        <Route path='author/courses/:courseId' element={<AuthorCourseDetail />} />
        <Route path='author/courses/:courseId/*' element={<PageNotFound />} />

        <Route path='author/*' element={<AuthorAccount />} />
        <Route path='*' element={<PageNotFound />} />
=======
        <Route path='course' element={<Course />}></Route>
        <Route path='signin' element={<SignIn />}></Route>
        <Route path='signup' element={<SignUp />}></Route>
        <Route path='author' element={<AuthorAccount />}></Route>
>>>>>>> bf85c6042b51f32c313570aff81a4d9b44e89503
      </Routes>
    </ThemeProvider>
  );
}

export default App;
