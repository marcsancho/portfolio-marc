// src/components/hero/hero.js
import React from 'react';
import { Box, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import './hero.css';
import logoImage from '../../assets/icon.png'; // Adjust the path according to your project structure

const Hero = () => {
    const theme = useTheme();

    return (
        <Box
            className="hero-section"
            sx={{
                height: '100vh',
                position: 'relative',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                overflow: 'hidden',
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
            }}
        >
            <div className='logo'>
                <img src={logoImage} alt="Logo" className="logo-image" />
                <span className="logo-text">Marc Sancho</span>
            </div>
            <div className="perspective-text" style={{position: 'absolute', top: '25%', left: '20%'}}>
                <div className="perspective-line">
                    <p></p>
                    <p><Link to="/about" className="menu-link">ABOUT ME</Link></p>
                </div>
                <div className="perspective-line">
                    <p><Link to="/about" className="menu-link">ABOUT ME</Link></p>
                    <p><Link to="/projects" className="menu-link">PROJECTS & SKILLS</Link></p>
                </div>
                <div className="perspective-line">
                    <p><Link to="/projects" className="menu-link">PROJECTS & SKILLS</Link></p>
                    <p><Link to="/career" className="menu-link">MY CAREER</Link></p>
                </div>
                <div className="perspective-line">
                    <p><Link to="/career" className="menu-link">MY CAREER</Link></p>
                    <p><Link to="/contact" className="menu-link">CONTACT</Link></p>
                </div>
                <div className="perspective-line">
                    <p><Link to="/contact" className="menu-link">CONTACT</Link></p>
                    <p>ENJOY!</p>
                </div>
            </div>
            <div className="ocean">
                <div className="wave"></div>
                <div className="wave"></div>
            </div>
        </Box>
    );
};

export default Hero;
