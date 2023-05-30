import {
  Avatar,
  Card,
  CardActionArea as DefaultCardActionArea,
  CardContent,
  CardMedia,
  Grid,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Rating,
  Typography,
  Box,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from 'react-router-dom';
import { MenuBook } from '@mui/icons-material';
import theme from '../theme';

const { primary } = theme.palette;

const CardActionArea = (props) => {
  const navigate = useNavigate();
  return <DefaultCardActionArea {...props} onClick={() => navigate(props.link)}></DefaultCardActionArea>;
};

export const CourseCard = ({ id, image, author, authorIcon, title, rating, price, duration, lectures }) => {
  const navigate = useNavigate();
  return (
    <Card
      className='course-card'
      variant='outlined'
      sx={{ borderRadius: '1rem', borderColor: primary.line, maxWidth: 450, margin: 'auto' }}
    >
      <CardActionArea link={`${id}`}>
        <CardMedia component='img' height='194' image={image} sx={{ borderRadius: '1.5rem', padding: '.7rem' }} />
      </CardActionArea>

      <CardContent sx={{ padding: '0.7rem' }}>
        <ListItemButton onClick={() => navigate('/')} sx={{ paddingX: 0 }}>
          <ListItemAvatar>
            <Avatar alt='Profile Picture' src={authorIcon} />
          </ListItemAvatar>
          <ListItemText color='grey' primary={author} />
        </ListItemButton>
        <CardActionArea>
          <Typography>{title}</Typography>
        </CardActionArea>

        <Grid container spacing={1} marginY={2}>
          <Grid item xs={6} display='flex'>
            <AccessTimeIcon color='primary' sx={{ marginX: 1 }} />
            <Typography variant='body1' color='grey'>
              {duration}
            </Typography>
          </Grid>
          <Grid item xs={6} display='flex'>
            <MenuBook color='primary' sx={{ marginX: 1 }} />
            <Typography variant='body1' color='grey'>
              {lectures + ' Lectures'}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          alignItems='center'
          alignContent='center'
          justifyContent='space-between'
          sx={{ background: primary.light, borderRadius: 2, padding: 1.5 }}
        >
          <Typography component='legend' variant='h6' color='primary' fontWeight='bold'>
            {`${price} KRW`}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {rating}
            <Rating size='small' value={rating} readOnly />
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};
