// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/hero/hero';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Hero />} />
                {/* Otras rutas pueden ir aquí */}
            </Routes>
        </Router>
    );
};

export default App;
