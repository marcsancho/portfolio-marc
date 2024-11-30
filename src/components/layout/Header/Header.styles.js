import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const HeaderContainer = styled(Box)(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    padding: theme.spacing(2, 3),
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(18, 18, 18, 0.8)',
    backdropFilter: 'blur(10px)',
    zIndex: 1000,
}));

export const LogoLink = styled('a')({
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
});

export const Logo = styled('img')(({ theme }) => ({
    width: 40,
    height: 40,
    marginRight: theme.spacing(2),
}));

export const TitleContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
});

export const Name = styled(Typography)(({ theme }) => ({
    fontSize: '1.5rem',
    fontWeight: 700,
    color: theme.palette.primary.main,
    lineHeight: 1.2,
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
}));