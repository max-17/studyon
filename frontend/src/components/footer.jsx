import React from 'react';
import { Box, Button, ButtonGroup, Divider, Typography } from '@mui/material';
import { Instagram, Telegram, YouTube } from '@mui/icons-material';

const Footer = () => {
    return (
        <>
            <Divider sx={{ marginY: '2rem', bgcolor: 'black' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ButtonGroup variant='text' color='primary' aria-label='' sx={{ margin: '2rem' }}>
                    <Button size='large'>
                        <Instagram />
                    </Button>
                    <Button size='large'>
                        <Telegram />
                    </Button>
                    <Button size='large'>
                        <YouTube />
                    </Button>
                </ButtonGroup>
                <Typography variant='body1' color='GrayText'>
                    Terms of Use
                </Typography>
                <Typography variant='body1' color='GrayText'>
                    Privacy Policy
                </Typography>
            </Box>
        </>
    );
};

export default Footer;
