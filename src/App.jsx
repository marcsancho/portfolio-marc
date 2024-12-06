import React from 'react';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

import Header from './components/layout/Header/Header';
import Hero from './components/layout/Hero/Hero';
import About from './components/layout/About/About';
import Projects from './components/layout/Projects/Projects';
import Skills from './components/layout/Skills/Skills';
import Contact from './components/layout/Contact/Contact';

const MainContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100%',
  backgroundColor: theme.palette.background.default,
  overflow: 'hidden',
}));

const ContentWrapper = styled(Box)({
  marginTop: '64px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

const Section = styled('section')({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const App = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MainContainer>
      <Header />
      <ContentWrapper>
        <Section id="hero">
          <Hero onNavigate={scrollToSection} />
        </Section>

        <Container maxWidth="lg">
          <Section id="about">
            <About />
          </Section>

          <Section id="projects">
            <Projects />
          </Section>

          <Section id="skills">
            <Skills />
          </Section>

          <Section id="contact">
            <Contact />
          </Section>
        </Container>
      </ContentWrapper>
    </MainContainer>
  );
};

export default App;
