
import React, { useState, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import './global.css';
import HomePage from './pages/HomePage';
import ClientLoginPage from './pages/ClientLoginPage';
import ClientSignUpPage from './pages/ClientSignUpPage';
import ClientDashboardPage from './pages/ClientDashboardPage';
import DriverLoginPage from './pages/DriverLoginPage';
import DriverSignUpPage from './pages/DriverSignUpPage';
import DriverDashboardPage from './pages/DriverDashboardPage';
import CorporateLoginPage from './pages/CorporateLoginPage';
import CorporateSignUpPage from './pages/CorporateSignUpPage';
import CorporateDashboardPage from './pages/CorporateDashboardPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminDriversPage from './pages/AdminDriversPage';
import AdminBlogPage from './pages/AdminBlogPage';
import AlertProvider from './components/AlertProvider';
import { Role } from './types';
import type { User, Booking } from './types';

import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import DataProtectionPolicyPage from './pages/DataProtectionPolicyPage';
import RecordKeepingPolicyPage from './pages/RecordKeepingPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import BookingTermsPage from './pages/BookingTermsPage';
import ComplaintsPolicyPage from './pages/ComplaintsPolicyPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import LostPropertyPolicyPage from './pages/LostPropertyPolicyPage';
import SafetyPolicyPage from './pages/SafetyPolicyPage';
import EqualityAccessibilityPolicyPage from './pages/EqualityAccessibilityPolicyPage';
import IncidentAccidentPolicyPage from './pages/IncidentAccidentPolicyPage';
import DriverPolicyPage from './pages/DriverPolicyPage';
import VehiclePolicyPage from './pages/VehiclePolicyPage';
import NoUnbookedJourneysPolicyPage from './pages/NoUnbookedJourneysPolicyPage';
import CorporateTermsPage from './pages/CorporateTermsPage';
import CorporatePaymentPolicyPage from './pages/CorporatePaymentPolicyPage';
import SafetyAccessibilityPage from './pages/SafetyAccessibilityPage';
import OperatorPoliciesPage from './pages/OperatorPoliciesPage';
import PassengerPoliciesPage from './pages/PassengerPoliciesPage';
import PrivacyDataPage from './pages/PrivacyDataPage';
import CorporatePoliciesPage from './pages/CorporatePoliciesPage';
import DriverHubPage from './pages/DriverHubPage';
import BookingPage from './pages/BookingPage';
import OlderBookingsPage from './pages/OlderBookingsPage';
import ContactPage from './pages/ContactPage';
import AwaitingApprovalPage from './pages/AwaitingApprovalPage';
import AdminNotificationsPage from './pages/AdminNotificationsPage';
import AdminSettingsPage from './pages/AdminSettingsPage';
import BlogPage from './pages/BlogPage';
import BlogArticlePage from './pages/BlogArticlePage';
import ReviewsPage from './pages/ReviewsPage';
import WebsiteMapPage from './pages/WebsiteMapPage';

// --- AUTH CONTEXT ---
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
    const name = role === Role.ADMIN ? 'Administrator' : 'John Doe';
    setUser({ name, email: 'john.doe@example.com', role });
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

// --- BOOKING CONTEXT ---
interface BookingContextType {
    bookings: Booking[];
    addBooking: (bookingData: Omit<Booking, 'id' | 'status'>) => void;
}

const BookingContext = createContext<BookingContextType | null>(null);

export const useBookings = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBookings must be used within a BookingProvider');
    }
    return context;
}

const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [bookings, setBookings] = useState<Booking[]>([]);

    const addBooking = (bookingData: Omit<Booking, 'id' | 'status'>) => {
        const newBooking: Booking = {
            ...bookingData,
            id: `VD-${1001 + bookings.length}`,
            status: 'Pending Confirmation'
        };
        setBookings(prevBookings => [...prevBookings, newBooking]);
    };

    return (
        <BookingContext.Provider value={{ bookings, addBooking }}>
            {children}
        </BookingContext.Provider>
    )
}


// --- PROTECTED ROUTE ---
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


// --- APP ---
function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <BookingProvider>
          <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/client/login" element={<ClientLoginPage />} />
            <Route path="/client/signup" element={<ClientSignUpPage />} />
            <Route path="/driver/login" element={<DriverLoginPage />} />
            <Route path="/driver/signup" element={<DriverSignUpPage />} />
            <Route path="/corporate/login" element={<CorporateLoginPage />} />
            <Route path="/corporate/signup" element={<CorporateSignUpPage />} />
            <Route path="/corporate/dashboard" element={<CorporateDashboardPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogArticlePage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/admin" element={<AdminLoginPage />} />
            
            <Route path="/legal/safety-accessibility" element={<SafetyAccessibilityPage />} />
            <Route path="/legal/operator-policies" element={<OperatorPoliciesPage />} />
            <Route path="/legal/passenger-policies" element={<PassengerPoliciesPage />} />
            <Route path="/legal/privacy-data" element={<PrivacyDataPage />} />
            <Route path="/legal/corporate" element={<CorporatePoliciesPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/data-protection-policy" element={<DataProtectionPolicyPage />} />
            <Route path="/record-keeping-policy" element={<RecordKeepingPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="/booking-terms" element={<BookingTermsPage />} />
            <Route path="/complaints-policy" element={<ComplaintsPolicyPage />} />
            <Route path="/refund-policy" element={<RefundPolicyPage />} />
            <Route path="/lost-property-policy" element={<LostPropertyPolicyPage />} />
            <Route path="/safety-policy" element={<SafetyPolicyPage />} />
            <Route path="/equality-accessibility-policy" element={<EqualityAccessibilityPolicyPage />} />
            <Route path="/incident-accident-policy" element={<IncidentAccidentPolicyPage />} />
            <Route path="/driver-policy" element={<DriverPolicyPage />} />
            <Route path="/vehicle-policy" element={<VehiclePolicyPage />} />
            <Route path="/no-unbooked-journeys" element={<NoUnbookedJourneysPolicyPage />} />
            <Route path="/corporate-terms" element={<CorporateTermsPage />} />
            <Route path="/corporate-payment-policy" element={<CorporatePaymentPolicyPage />} />
            <Route path="/driver-hub" element={<DriverHubPage />} />
            <Route path="/older-bookings" element={<OlderBookingsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/website-map" element={<WebsiteMapPage />} />
            <Route path="/admin/blog" element={
              <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                <AdminBlogPage />
              </ProtectedRoute>
            } />

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
            <Route path="/corporate/dashboard" element={
              <ProtectedRoute allowedRoles={[Role.CLIENT]}>
                <CorporateDashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                <AdminDashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                <AdminSettingsPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/awaiting" element={
              <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                <AwaitingApprovalPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/drivers" element={
              <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                <AdminDriversPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/notifications" element={
              <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                <AdminNotificationsPage />
              </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
      </BookingProvider>
    </AlertProvider>
  </AuthProvider>
  );
}

export default App;
