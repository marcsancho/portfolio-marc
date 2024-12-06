import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(30, 30, 30, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'transform 0.3s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
}));

const ProjectCard = ({ title, subtitle, image, onClick }) => {
  return (
    <StyledCard onClick={onClick}>
      {image && <CardMedia component="img" height="140" image={image} alt={title} />}
      <CardContent>
        <Typography variant="h6" component="div" color="primary">
          {title}
        </Typography>
        <Box mt={1}>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default ProjectCard;
