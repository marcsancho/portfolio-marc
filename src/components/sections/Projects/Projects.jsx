import React from 'react';
import { Typography, Container, Grid2 } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const ProjectsSection = styled('div')({
    minHeight: '90vh',
    padding: '4rem 0',
    position: 'relative',
});

const ProjectCard = styled(motion.div)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    cursor: 'pointer',
    height: '100%',
}));

const projects = [
    {
        id: 1,
        title: 'Project One',
        description: 'Description of project one',
        technologies: ['React', 'Node.js', 'MongoDB']
    },
    {
        id: 2,
        title: 'Project Two',
        description: 'Description of project two',
        technologies: ['Angular', 'Express', 'PostgreSQL']
    }
];

const Projects = () => (
    <Container>
        <ProjectsSection>
            <Typography variant="h2" component="h1" gutterBottom>
                My Projects
            </Typography>
            <Grid2 container spacing={4}>
                {projects.map((project) => (
                    <Grid2 xs={12} md={6} key={project.id}>
                        <ProjectCard
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Typography variant="h5" gutterBottom>
                                {project.title}
                            </Typography>
                            <Typography variant="body1">
                                {project.description}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                                {project.technologies.join(' • ')}
                            </Typography>
                        </ProjectCard>
                    </Grid2>
                ))}
            </Grid2>
        </ProjectsSection>
    </Container>
);

export default Projects;