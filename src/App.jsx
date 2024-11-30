import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// Import components
import Header from './components/layout/Header/Header';
import Hero from './components/sections/Hero/Hero';
import About from './components/sections/About/About';
import Projects from './components/sections/Projects/Projects';
import Skills from './components/sections/Skills/Skills';
import Contact from './components/sections/Contact/Contact';

// Styled Components
styled('div')(({ theme }) => ({
    position: 'fixed',
    top: 20,
    left: 20,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    zIndex: 10,
}));
const MainContainer = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    position: 'relative',
    backgroundColor: theme.palette.background.default,
}));

const SectionsContainer = styled('div')({
    position: 'relative',
    zIndex: 1,
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
            {/* Header */}
            <Header />

            {/* Main Content */}
            <SectionsContainer>
                <section id="hero">
                    <Hero onNavigate={scrollToSection} />
                </section>

                <section id="about">
                    <About />
                </section>

                <section id="projects">
                    <Projects />
                </section>

                <section id="skills">
                    <Skills />
                </section>

                <section id="contact">
                    <Contact />
                </section>
            </SectionsContainer>
        </MainContainer>
    );
};

export default App;