import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import AnimatedBackground from '../../common/AnimatedBackground/AnimatedBackground';

const HeroContainer = styled(Box)(({ theme }) => ({
    height: '100vh',
    width: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    paddingTop: '50px',
    paddingBottom: '200px',
    paddingRight: '250px',
}));

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
    }
});

const PerspectiveLine = styled('div')(({ index }) => ({
    height: '50px',
    overflow: 'hidden',
    position: 'relative',
    paddingRight: '10px',
    paddingLeft: '10px',
    left: `${29 + (index * 29)}px`,
    background: index % 2 === 0 ? '#4a858b' : '#9bd9b2',
    transform: index % 2 === 0
        ? 'skew(60deg, -25deg) scaleY(0.66667)'
        : 'skew(0deg, -25deg) scaleY(1.33333)',
    ...(index === 4 && { paddingBottom: '1px' }),
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
    { text: 'ENJOY!', id: null }
];

const Hero = ({ onNavigate }) => {
    return (
        <HeroContainer>
            <AnimatedBackground gradientOpacity={0.7} />
            <PerspectiveText>
                {menuItems.map((item, index) => (
                    <PerspectiveLine key={index} index={index}>
                        <TextElement>
                            {index > 0 && (
                                menuItems[index - 1].id ?
                                    <MenuItem onClick={() => onNavigate(menuItems[index - 1].id)}>
                                        {menuItems[index - 1].text}
                                    </MenuItem> :
                                    menuItems[index - 1].text
                            )}
                        </TextElement>
                        <TextElement>
                            {item.id ?
                                <MenuItem onClick={() => onNavigate(item.id)}>
                                    {item.text}
                                </MenuItem> :
                                item.text
                            }
                        </TextElement>
                    </PerspectiveLine>
                ))}
            </PerspectiveText>
        </HeroContainer>
    );
};

export default Hero;