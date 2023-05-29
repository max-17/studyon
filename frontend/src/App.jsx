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

import Course from './components/course/about_course';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ResponsiveAppBar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='signin' element={<SignIn />}></Route>
        <Route path='signup' element={<SignUp />}></Route>
        <Route path='author/courses/:courseId' element={<AuthorLectureList />} />
        <Route path='author/courses/:courseId/*' element={<PageNotFound />} />

        <Route path='author/*' element={<AuthorAccount />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
