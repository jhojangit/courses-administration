// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import ProtectedLayout from './components/protectedLayout/ProtectedLayout';
import LoginPage from './pages/login_page/LoginPage';
import HomePage from './pages/home_page/HomePage';
import FormCreatePhasesPage from './pages/forms/FormCreatePhases_page/FormCreatePhases_page';
import FormAdvisor_page from './pages/forms/formAdvisor_page/FormAdvisor_page';
import FormCourse_page from './pages/forms/formCourse_page/FormCourse_page';
import FormCreateFaculty_page from './pages/forms/formFaculty_page/FormFaculty_page';
import FormCreateProgram_page from './pages/forms/formProgram_page/FormProgram_page';

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
                    path="/advisorpage"
                    element={
                        <ProtectedRoute>
                            <ProtectedLayout>
                                <FormAdvisor_page />
                            </ProtectedLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/coursepage"
                    element={
                        <ProtectedRoute>
                            <ProtectedLayout>
                                <FormCourse_page />
                            </ProtectedLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/programpage"
                    element={
                        <ProtectedRoute>
                            <ProtectedLayout>
                                <FormCreateProgram_page />
                            </ProtectedLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/facultypage"
                    element={
                        <ProtectedRoute>
                            <ProtectedLayout>
                                <FormCreateFaculty_page />
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

                <Route
                    path="/updatecourse/:id" 
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
