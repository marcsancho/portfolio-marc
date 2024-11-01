// src/components/Footer.js
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { GitHub, LinkedIn } from '@mui/icons-material';

const Footer = () => (
    <Box sx={{ textAlign: 'center', padding: 2, backgroundColor: 'primary.main', color: 'white' }}>
        <Typography variant="body2">© 2023 Mi Portafolio</Typography>
        <IconButton color="inherit" href="https://github.com/tu_usuario">
            <GitHub />
        </IconButton>
        <IconButton color="inherit" href="https://linkedin.com/in/tu_usuario">
            <LinkedIn />
        </IconButton>
    </Box>
);

export default Footer;
