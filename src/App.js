// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/hero/hero';
import About from './components/about/about';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<>
                    <Hero />
                    <About />
                </>} />
            </Routes>
        </Router>
    );
};

export default App;
