import React from 'react';
import { Card, CardContent, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const AboutSection = styled('div')({
  height: '90vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  position: 'relative',
});

const AboutCard = styled(Card)(({ theme }) => ({
  maxWidth: 1000,
  margin: '0 auto',
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
}));

const About = () => (
  <Container>
    <AboutSection>
      <AboutCard>
        <CardContent>
          <Typography variant="h2" component="h1" gutterBottom>
            About Me
          </Typography>
          <Typography variant="body1" component="body">
            Hi! I&#39;m Marc Sancho, a passionate developer with a keen eye for detail and a strong
            dedication to building impactful digital experiences.
          </Typography>
          <Typography variant="body1">
            I specialize in creating elegant solutions to complex problems, always striving to write
            clean, maintainable code that makes a difference.
          </Typography>
        </CardContent>
      </AboutCard>
    </AboutSection>
  </Container>
);

export default About;
