// src/components/Projects.js
import React from 'react';
import { Box, Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material';

const projects = [
    { title: 'Proyecto 1', description: 'Descripción breve del proyecto 1.' },
    { title: 'Proyecto 2', description: 'Descripción breve del proyecto 2.' },
    // Agrega más proyectos aquí
];

const Projects = () => (
    <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>Proyectos</Typography>
        <Grid container spacing={4}>
            {projects.map((project, index) => (
                <Grid item xs={12} md={4} key={index}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">{project.title}</Typography>
                            <Typography>{project.description}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">Ver Más</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Box>
);

export default Projects;
