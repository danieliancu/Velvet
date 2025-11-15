
import React, { useState, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ClientLoginPage from './pages/ClientLoginPage';
import ClientSignUpPage from './pages/ClientSignUpPage';
import ClientDashboardPage from './pages/ClientDashboardPage';
import DriverLoginPage from './pages/DriverLoginPage';
import DriverSignUpPage from './pages/DriverSignUpPage';
import DriverDashboardPage from './pages/DriverDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { Role } from './types';
import type { User } from './types';

interface AuthContextType {
  user: User | null;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: Role) => {
    // In a real app, this would involve authentication logic
    setUser({ name: 'John Doe', email: 'john.doe@example.com', role });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: Role[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};


function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/client/login" element={<ClientLoginPage />} />
          <Route path="/client/signup" element={<ClientSignUpPage />} />
          <Route path="/driver/login" element={<DriverLoginPage />} />
          <Route path="/driver/signup" element={<DriverSignUpPage />} />
          
          <Route path="/client/dashboard" element={
            <ProtectedRoute allowedRoles={[Role.CLIENT]}>
              <ClientDashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/driver/dashboard" element={
            <ProtectedRoute allowedRoles={[Role.DRIVER]}>
              <DriverDashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={[Role.ADMIN]}>
              <AdminDashboardPage />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
