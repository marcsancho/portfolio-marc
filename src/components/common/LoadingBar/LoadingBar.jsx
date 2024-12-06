import React from 'react';
import { LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  height: 3,
  zIndex: 9999,
  '& .MuiLinearProgress-bar': {
    background: `linear-gradient(90deg, 
      ${theme.palette.primary.main}, 
      ${theme.palette.secondary.main}, 
      ${theme.palette.primary.main})`,
    backgroundSize: '200% 100%',
    animation: 'gradient 2s ease infinite',
  },
  '@keyframes gradient': {
    '0%': { backgroundPosition: '0% 0%' },
    '50%': { backgroundPosition: '100% 0%' },
    '100%': { backgroundPosition: '0% 0%' },
  },
}));

const LoadingBar = () => {
  return <StyledLinearProgress />;
};

export default LoadingBar;
