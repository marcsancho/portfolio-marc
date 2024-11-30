import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#9bd9b2',
            light: '#c1f5d9',
            dark: '#75ad8c',
            contrastText: '#000000',
        },
        secondary: {
            main: '#4a858b',
            light: '#71b2b7',
            dark: '#255a61',
            contrastText: '#ffffff',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
            elevation1: '#2d2d2d',
            elevation2: '#333333',
        },
        text: {
            primary: '#FFFFFF',
            secondary: 'rgba(255, 255, 255, 0.7)',
        },
    },
    typography: {
        fontFamily: [
            'Roboto',
            '-apple-system',
            'BlinkMacSystemFont',
            'sans-serif'
        ].join(','),
        h1: {
            fontSize: '3.5rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    backgroundImage: 'none',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 600,
                },
            },
            defaultProps: {
                disableElevation: true,
            },
        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    '&.Mui-focusVisible': {
                        outline: '2px solid #9bd9b2',
                        outlineOffset: 2,
                    },
                },
            },
        },
    },
    shape: {
        borderRadius: 8,
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    transitions: {
        duration: {
            shortest: 150,
            shorter: 200,
            short: 250,
            standard: 300,
            complex: 375,
            enteringScreen: 225,
            leavingScreen: 195,
        },
    },
});

export default responsiveFontSizes(theme);