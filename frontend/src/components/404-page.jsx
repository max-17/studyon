import { Box, Container, Typography } from '@mui/material';
import { LinkButton } from './utils';

const PageNotFound = () => {
  return (
    <Container maxWidth='100%' disableGutters className='page_404'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 '>
            <div className='col-sm-10 col-sm-offset-1  text-center'>
              <div className='four_zero_four_bg'></div>

              <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                <Typography variant='h3'>Look like you're lost</Typography>

                <Typography variant='h6'>the page you are looking for is not avaible!</Typography>

                <LinkButton to='/' variant='contained'>
                  Go to Home
                </LinkButton>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PageNotFound;
