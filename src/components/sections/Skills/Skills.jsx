// src/components/sections/Skills/Skills.jsx
import React from 'react';
import { Card, CardContent, Grid2, Typography, Container, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const SkillsSection = styled('div')({
    minHeight: '90vh',
    padding: '4rem 0',
    position: 'relative',
});

const SkillCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    height: '100%',
}));

const skills = [
    { name: 'Frontend Development', level: 90 },
    { name: 'Backend Development', level: 85 },
    { name: 'UI/UX Design', level: 75 },
];

const Skills = () => (
    <Container>
        <SkillsSection>
            <Typography variant="h2" component="h1" gutterBottom>
                Skills & Expertise
            </Typography>
            <Grid2 container spacing={4}>
                {skills.map((skill, index) => (
                    <Grid2 xs={12} md={6} key={index}>
                        <SkillCard>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {skill.name}
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={skill.level}
                                    sx={{ height: 8, borderRadius: 4 }}
                                />
                            </CardContent>
                        </SkillCard>
                    </Grid2>
                ))}
            </Grid2>
        </SkillsSection>
    </Container>
);

export default Skills;