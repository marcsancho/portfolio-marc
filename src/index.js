// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from './theme';
import { ThemeProvider, CssBaseline } from '@mui/material';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Reseteo de estilos según el tema */}
        <App />
    </ThemeProvider>,
    document.getElementById('root')
);
