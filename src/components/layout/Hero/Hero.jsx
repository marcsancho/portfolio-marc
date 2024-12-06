import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const BackgroundWrapper = styled(Box)({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 0,
  overflow: 'hidden',
});

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
    '0%': { transform: 'translateX(0)' },
    '50%': { transform: 'translateX(-25%)' },
    '100%': { transform: 'translateX(-50%)' },
  },
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
  zIndex: 1,
}));

const HeroContainer = styled(Box)({
  height: 'calc(100vh - 64px)',
  width: '100%',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
});

const PerspectiveText = styled('div')({
  WebkitFontSmoothing: 'antialiased',
  color: '#FFFFFF',
  fontFamily: 'Roboto, sans-serif',
  transform: 'translate3d(0, 0, 0)',
  fontSize: '58px',
  fontWeight: 900,
  letterSpacing: '-2px',
  textTransform: 'uppercase',
  '&:hover p': {
    transform: 'translateY(-50px)',
  },
  paddingBottom: '150px',
  paddingRight: '150px',
});

const PerspectiveLine = styled('div')(({ index }) => ({
  height: '50px',
  overflow: 'hidden',
  position: 'relative',
  paddingRight: '10px',
  paddingLeft: '10px',
  left: `${29 + index * 29}px`,
  background: index % 2 === 0 ? '#4a858b' : '#9bd9b2',
  transform:
    index % 2 === 0 ? 'skew(60deg, -25deg) scaleY(0.66667)' : 'skew(0deg, -25deg) scaleY(1.33333)',
}));

const MenuItem = styled('button')({
  margin: 0,
  height: '50px',
  lineHeight: '50px',
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  color: '#FFFFFF',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  textTransform: 'inherit',
  fontFamily: 'inherit',
  width: '100%',
  textAlign: 'left',
});

const TextElement = styled('p')({
  margin: 0,
  height: '50px',
  lineHeight: '50px',
  transition: 'all 0.3s ease-in-out',
});

const menuItems = [
  { text: 'ABOUT ME', id: 'about' },
  { text: 'PROJECTS & SKILLS', id: 'projects' },
  { text: 'MY CAREER', id: 'skills' },
  { text: 'CONTACT', id: 'contact' },
  { text: 'ENJOY!', id: null },
];

const Hero = ({ onNavigate }) => {
  const renderAnimatedBackground = () => (
    <BackgroundWrapper>
      <GradientOverlay />
      <WaveContainer>
        <Wave />
        <Wave delay={-2} sx={{ top: '20px', opacity: 0.3 }} />
        <Wave delay={-5} sx={{ top: '40px', opacity: 0.2 }} />
      </WaveContainer>
    </BackgroundWrapper>
  );

  return (
    <HeroContainer>
      {renderAnimatedBackground()}
      <PerspectiveText>
        {menuItems.map((item, index) => (
          <PerspectiveLine key={index} index={index}>
            <TextElement>
              {index > 0 &&
                (menuItems[index - 1].id ? (
                  <MenuItem onClick={() => onNavigate(menuItems[index - 1].id)}>
                    {menuItems[index - 1].text}
                  </MenuItem>
                ) : (
                  menuItems[index - 1].text
                ))}
            </TextElement>
            <TextElement>
              {item.id ? (
                <MenuItem onClick={() => onNavigate(item.id)}>{item.text}</MenuItem>
              ) : (
                item.text
              )}
            </TextElement>
          </PerspectiveLine>
        ))}
      </PerspectiveText>
    </HeroContainer>
  );
};

export default Hero;
