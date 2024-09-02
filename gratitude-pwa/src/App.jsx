// import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UsernameScreen from './screens/UsernameScreen';
import MainApp from './screens/MainApp';
// import 'App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsernameScreen />} />
        <Route path="/app" element={<MainApp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
