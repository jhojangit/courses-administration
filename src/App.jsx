import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import LoginPage from './pages/login_page/LoginPage';
import HomePage from './pages/home_page/HomePage';



const App = () => {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<LoginPage />} />

                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />


            </Routes>

            
        </Router>
    );
};

export default App;

