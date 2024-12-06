import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  border: 0,
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(1, 3),
  boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
  color: theme.palette.primary.contrastText,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 8px 2px rgba(0, 0, 0, .3)',
  },
}));

const CustomButton = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default CustomButton;
