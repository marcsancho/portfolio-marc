// src/pages/Home.js
import React from 'react';
import Hero from '../components/sections/Hero/hero';
import About from '../components/sections/About/about';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => (
    <>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
    </>
);

export default Home;
