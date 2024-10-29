// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import ProtectedLayout from './components/protectedLayout/ProtectedLayout';
import LoginPage from './pages/login_page/LoginPage';
import HomePage from './pages/home_page/HomePage';
import FormCreateAdvisor from './components/forms/formCreateAdvisor/FormCreateAdvisor';
import FormCreateCourse from './components/forms/formCreateCourse/FormCreateCourse';
import FormCreateFaculty from './pages/formCreateFaculty_page/FormCreateFaculty_page';
import FormCreatePhasesPage from './pages/FormCreatePhases_page/FormCreatePhases_page';
import FormCreateProgram from './components/forms/formCreateProgram/FormCreateProgram';
import FormCreateAdvisor_page from './pages/formCreateAdvisor_page/FormCreateAdvisor_page';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <ProtectedLayout>
                                <HomePage />
                            </ProtectedLayout>
                        </ProtectedRoute>
                    }
                />
                
                <Route
                    path="/createadvisor"
                    element={
                        <ProtectedRoute>
                            <ProtectedLayout>
                                <FormCreateAdvisor_page />
                            </ProtectedLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/createcourse"
                    element={
                        <ProtectedRoute>
                            <ProtectedLayout>
                                <FormCreateCourse />
                            </ProtectedLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/createprogram"
                    element={
                        <ProtectedRoute>
                            <ProtectedLayout>
                                <FormCreateProgram />
                            </ProtectedLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/createfaculty"
                    element={
                        <ProtectedRoute>
                            <ProtectedLayout>
                                <FormCreateFaculty />
                            </ProtectedLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/createphases"
                    element={
                        <ProtectedRoute>
                            <ProtectedLayout>
                                <FormCreatePhasesPage />
                            </ProtectedLayout>
                        </ProtectedRoute>
                    }
                />

                <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
        </Router>
    );
};

export default App;
