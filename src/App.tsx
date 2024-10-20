import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import RacePage from './components/RacePage';
import RaceWorkshop from './components/RaceWorkshop';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-blue-300 font-mono">
        <Navbar />
        <main className="container mx-auto mt-8 p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/race/:raceName" element={<RacePage />} />
            <Route path="/workshop" element={<RaceWorkshop />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;