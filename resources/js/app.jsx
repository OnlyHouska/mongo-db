import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { Layout } from './components/Layout/Layout';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { BooksPage } from './pages/BooksPage';
import { ReadersPage } from './pages/ReadersPage';
import { LoansPage } from './pages/LoansPage';
import { MyLoansPage } from './pages/MyLoansPage';

function PublicRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
}

function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                }
            />
            <Route
                path="/register"
                element={
                    <PublicRoute>
                        <RegisterPage />
                    </PublicRoute>
                }
            />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <DashboardPage />
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/books"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <BooksPage />
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/readers"
                element={
                    <ProtectedRoute requiredRoles={['admin']}>
                        <Layout>
                            <ReadersPage />
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/loans"
                element={
                    <ProtectedRoute requiredRoles={['admin', 'librarian']}>
                        <Layout>
                            <LoansPage />
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/my-loans"
                element={
                    <ProtectedRoute requiredRoles={['reader']}>
                        <Layout>
                            <MyLoansPage />
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    );
}

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
