// src/theme/components.js

export const components = {
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
};