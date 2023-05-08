import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

import Typography from '@mui/material/Typography';
import { Paper, Skeleton, Button, Checkbox } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import theme from '../theme';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Footer from '../footer';
import { QuestionMark } from '@mui/icons-material';

import CourseHero from './CourseHero';

const heroDescription = {
  title: 'The Ultimate HTML/CSS Mastery Series',
  description: 'Everything you need to build fast and beautiful websites with HTML5 and CSS3 in one bundle',
  image: 'images/courses-01.jpg',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const features = ['intermediate', 'lifetime access', '5 hours of videos', 'exercises & solutions', 'certificate'];
const youWillBe = [
  'Confidently build websites with HTML5/CSS3',
  'Build websites that look great on any screen or device',
  'Troubleshoot issues like a pro',
  'Deploy your websites to the cloud',
];
const youLearn = [
  'Learn the fundamentals of web development',
  'Structure your web pages using HTML5',
  'Make beautiful web pages using CSS3',
  'Learn the essential Photoshop skills every web developer needs',
  'Master mobile-first responsive design',
  'Create layouts with Flex and Grid layout systems',
  'Add smooth, beautiful animations',
  'Create beautiful typography',
  'Optimize images for performance',
  'Build forms with data validation',
  'Write clean, maintainable, object-oriented CSS3',
  'Learn HTML5/CSS3 best practices',
  'Write valid, semantic HTML5 code that search engines love',
  'Increase your productivity using little-known shortcuts',
  'Host your code on GitHub',
  'Set up continuous deployment',
  "Measure your website's performance",
  'Get to know the tools that make your job easier',
  'And much, much more!',
];

export default function Course() {
  return (
    <Container maxWidth='lg' sx={{ marginTop: '1rem' }} disableGutters>
      <main>
        <CourseHero data={heroDescription} />
      </main>
      <div sx={{}}>
        <Grid container spacing={7} m={1}>
          <Grid xs={12} md={7}>
            <Typography variant='h5' my={4}>
              Become an HTML5/CSS3 Expert!
            </Typography>
            <Typography variant='body1' my={1}>
              Perhaps you know enough to make small tweaks in existing HTML/CSS code, but struggle to build something
              from scratch. If you know the basics and are looking for a course that doesn’t treat you like an absolute
              beginner, look no further.
            </Typography>

            <Typography variant='body1' my={1}>
              A fun, highly-practical, step-by-step course that teaches you the both latest and more complex HTML5/CSS3
              concepts such as responsive design, Flex & Grid layout systems, typography, responsive images, organizing
              CSS and much, much, more.
            </Typography>

            <Typography variant='h6' my={4}>
              No lenghty, boring, repetitive explanations here. Just HTML5/CSS3 explained clearly.
            </Typography>
            <Button variant='contained' color='success' startIcon={<ShoppingCart />}>
              Enroll Now!
            </Button>
          </Grid>
          <Grid xs={12} md={5}>
            <Paper elevation={3} sx={{ padding: '1rem' }}>
              <nav aria-label='main mailbox folders'>
                <List>
                  {features.map((e, i) => (
                    <ListItem disablePadding key={i}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Skeleton variant='circular' width={40} height={40} />
                        </ListItemIcon>
                        <ListItemText primary={e.toUpperCase()} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </nav>
            </Paper>
          </Grid>
        </Grid>
        <Grid container justifyContent='center' sx={{ backgroundColor: theme.palette.divider, padding: '2rem' }}>
          <Grid xs={12} md={8}>
            <Typography variant='h5'>By the end of this course, you'll be able to…</Typography>
            <nav aria-label='main mailbox folders'>
              <List>
                {youWillBe.map((e, i) => (
                  <ListItem disableGutters key={i}>
                    <ListItemIcon>
                      <Checkbox checked={true} disabled size='large' />
                    </ListItemIcon>
                    <ListItemText primary={e} />
                  </ListItem>
                ))}
              </List>
            </nav>
          </Grid>
        </Grid>
        <Grid container justifyContent='center' sx={{ padding: '2rem' }}>
          <Grid xs={12} md={8}>
            <Typography variant='h5'>The Most Comprehensive (& Fun) HTML5/CSS3 Course</Typography>
            <nav aria-label='main mailbox folders'>
              <List>
                {youLearn.map((e, i) => (
                  <ListItem disableGutters key={i}>
                    <ListItemIcon>
                      <Checkbox checked={true} disabled size='large' />
                    </ListItemIcon>
                    <ListItemText primary={e} />
                  </ListItem>
                ))}
              </List>
            </nav>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            backgroundColor: theme.palette.divider,
          }}
          justifyContent='center'
        >
          <Grid xs={11} mt={6}>
            <Typography variant='h4' align='center'>
              Enroll to get instant access!
            </Typography>
          </Grid>

          <Button variant='contained' color='success' sx={{ m: 6 }} startIcon={<ShoppingCart />}>
            Enroll Now
          </Button>
        </Grid>
        <Grid container justifyContent='center' m={4}>
          <Grid xs={12} md={8}>
            <Typography variant='h4' my={4}>
              <QuestionMark fontSize='large' sx={{ border: 2 }} /> Frequently Asked Questions
            </Typography>
            <Typography variant='h5' my={4}>
              When does the course start and finish?
            </Typography>
            <Typography variant='body1' my={1}>
              The course starts now and never ends! It is a completely self-paced online course - you decide when you
              start and when you finish
            </Typography>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </Container>
  );
}
