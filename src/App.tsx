import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoginForm from './Pages/LoginForm';
import HomePage from './Pages/HomePage';
import ResetPasswordForm from './Pages/ResetPasswordForm';
import './App.scss';
import FirstResetPassRedirect from './Pages/FirstResetPasswordRedirect';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = Cookies.get('access_token');
  return token ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const token = Cookies.get('access_token');
  return token ? <Navigate to="/" replace /> : children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/login" element={<PublicRoute><LoginForm /></PublicRoute>} />
        <Route path="/first-reset-pass" element={<FirstResetPassRedirect />} />
        <Route path="/reset-password" element={<ProtectedRoute><ResetPasswordForm /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
