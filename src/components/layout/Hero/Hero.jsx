import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroContainer = styled(Box)({
  height: 'calc(100vh - 64px)',
  width: '100%',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
});

const Canvas = styled('canvas')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
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

const NetworkBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const initParticles = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const particleCount = (canvas.width * canvas.height) / 22500;

      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.5,
        size: Math.random() * 2 + 1,
        directionX: Math.random() - 0.5,
        directionY: Math.random() - 0.5,
        hue: Math.random() * 30 - 15, // Color variation
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, i) => {
        particle.x += particle.directionX * particle.speed;
        particle.y += particle.directionY * particle.speed;

        const dx = particle.x - mouseRef.current.x;
        const dy = particle.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 80) {
          const angle = Math.atan2(dy, dx);
          particle.directionX = Math.cos(angle);
          particle.directionY = Math.sin(angle);
          particle.speed = 0.3;
          ctx.fillStyle = '#9bd9b2';
        } else {
          particle.speed *= 0.95;
          if (particle.speed < 0.2) particle.speed = 0.2;
          ctx.fillStyle = `hsla(174, ${40 + particle.hue}%, 40%, 0.8)`;
        }

        if (particle.x < 0 || particle.x > canvas.width) particle.directionX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.directionY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections
        particlesRef.current.slice(i + 1).forEach((p2) => {
          const dx = particle.x - p2.x;
          const dy = particle.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(155, 217, 178, ${0.15 * (1 - dist / 100)})`;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', initParticles);

    initParticles();
    animate();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', initParticles);
    };
  }, []);

  return <Canvas ref={canvasRef} />;
};

const menuItems = [
  { text: 'ABOUT ME', id: 'about' },
  { text: 'PROJECTS & SKILLS', id: 'projects' },
  { text: 'MY CAREER', id: 'skills' },
  { text: 'CONTACT', id: 'contact' },
  { text: 'ENJOY!', id: null },
];

const Hero = ({ onNavigate }) => {
  return (
    <HeroContainer>
      <NetworkBackground />
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
