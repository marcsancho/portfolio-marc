// src/components/Skills.js
import React from 'react';
import { Box, Chip, Typography } from '@mui/material';

const skills = ['JavaScript', 'React', 'Node.js', 'CSS', 'Python'];

const Skills = () => (
    <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>Habilidades</Typography>
        <Box>
            {skills.map((skill, index) => (
                <Chip label={skill} key={index} sx={{ margin: 0.5 }} />
            ))}
        </Box>
    </Box>
);

export default Skills;
