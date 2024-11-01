// src/components/About.js
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const About = () => (
    <Box sx={{ padding: 4 }}>
        <Paper sx={{ padding: 3 }}>
            <Typography variant="h4">Sobre Mí</Typography>
            <Typography paragraph>
                Soy un desarrollador web con experiencia en frontend y backend, apasionado por la tecnología y siempre en búsqueda de nuevos retos.
            </Typography>
        </Paper>
    </Box>
);

export default About;
