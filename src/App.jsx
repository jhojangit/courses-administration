import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import LoginPage from './pages/login_page/LoginPage';
import HomePage from './pages/home_page/HomePage';



const App = () => {
    return (
        <Router>
            <Routes>

                <Route path="/login" element={<LoginPage />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />

                <Route 
                    path='*' 
                    element={
                        <Navigate to='/login'/>}
                />

            </Routes>


        </Router>
    );
};

export default App;

