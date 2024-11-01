// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark', // Añadido para establecer el modo oscuro
        primary: {
            main: '#9bd9b2',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#4a858b',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#121212', // Fondo oscuro
            paper: '#1e1e1e', // Color del papel oscuro
        },
        text: {
            primary: '#FFFFFF', // Texto en blanco
            secondary: '#B0BEC5', // Texto secundario en gris claro
            disabled: '#A0A0A0', // Color de texto deshabilitado
        },
        divider: '#4a858b', // Color del divisor
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h1: {
            fontSize: '2.5rem',
            color: '#FFFFFF', // Color del encabezado en blanco
        },
        h2: {
            fontSize: '2rem',
            color: '#B0BEC5', // Color secundario en gris claro
        },
        body1: {
            fontSize: '1rem',
            color: '#FFFFFF', // Texto en blanco
        },
        body2: {
            fontSize: '0.875rem',
            color: '#B0BEC5', // Texto secundario en gris claro
        },
        button: {
            textTransform: 'none',
        },
    },
});

export default theme;
