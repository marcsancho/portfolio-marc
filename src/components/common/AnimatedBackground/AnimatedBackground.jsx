import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const BackgroundWrapper = styled(Box)(({ position = 'fixed' }) => ({
    width: '100%',
    height: '100%',
    position: position,
    top: 0,
    left: 0,
    zIndex: 0,
    overflow: 'hidden',
}));

const WaveContainer = styled(Box)({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '198px',
    overflow: 'hidden',
});

const Wave = styled(Box)(({ theme, delay = 0 }) => ({
    background: `linear-gradient(45deg, ${theme.palette.primary.dark}40, ${theme.palette.secondary.main}40)`,
    width: '200%',
    height: '100%',
    position: 'absolute',
    animation: 'wave 15s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite',
    animationDelay: `${delay}s`,
    transform: 'translate3d(0, 0, 0)',
    opacity: 0.5,

    '@keyframes wave': {
        '0%': {
            transform: 'translateX(0)'
        },
        '50%': {
            transform: 'translateX(-25%)'
        },
        '100%': {
            transform: 'translateX(-50%)'
        }
    }
}));

const GradientOverlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(180deg, 
        ${theme.palette.background.default} 0%, 
        ${theme.palette.background.default}99 40%,
        ${theme.palette.primary.dark}20 100%)`,
    zIndex: 1
}));

const AnimatedBackground = ({
                                position = 'fixed',
                                showWaves = true,
                                gradientOpacity = 0.9
                            }) => {
    return (
        <BackgroundWrapper position={position}>
            <GradientOverlay
                sx={{
                    opacity: gradientOpacity,
                    background: (theme) =>
                        `linear-gradient(180deg, 
                        ${theme.palette.background.default} 0%, 
                        ${theme.palette.background.default}${Math.floor(gradientOpacity * 99)} 40%,
                        ${theme.palette.primary.dark}20 100%)`
                }}
            />
            {showWaves && (
                <WaveContainer>
                    <Wave />
                    <Wave delay={-2}
                          sx={{
                              top: '20px',
                              opacity: 0.3,
                              animation: 'wave 17s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite'
                          }}
                    />
                    <Wave delay={-5}
                          sx={{
                              top: '40px',
                              opacity: 0.2,
                              animation: 'wave 20s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite'
                          }}
                    />
                </WaveContainer>
            )}
        </BackgroundWrapper>
    );
};

export default AnimatedBackground;