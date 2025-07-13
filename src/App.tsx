import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoginForm from './Pages/LoginForm';
import HomePage from './Pages/HomePage';
import ResetPasswordForm from './Pages/ResetPasswordForm';
import './App.scss';
import FirstResetPassRedirect from './Pages/FirstResetPasswordRedirect';
import NotFoundPage from './Pages/NotFoundPage';
import TimesheetPage from './Pages/Timesheet';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = Cookies.get('access_token');
  return token ? children : <NotFoundPage />;
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const token = Cookies.get('access_token');
  return token ? <Navigate to="/" replace /> : children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><LoginForm /></PublicRoute>} />
        <Route path="/first-reset-pass" element={<FirstResetPassRedirect />} />
        <Route path="/timesheet" element={<ProtectedRoute><TimesheetPage /></ProtectedRoute>} />
        <Route path="/reset-password" element={<ProtectedRoute><ResetPasswordForm /></ProtectedRoute>} />
        <Route path="*" element={<PublicRoute><NotFoundPage /></PublicRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
