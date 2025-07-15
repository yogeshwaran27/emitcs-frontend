import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUser, UserProvider } from './context/UserContext';
import LoginForm from './Pages/LoginForm';
import HomePage from './Pages/HomePage';
import ResetPasswordForm from './Pages/ResetPasswordForm';
import FirstResetPassRedirect from './Pages/FirstResetPasswordRedirect';
import NotFoundPage from './Pages/NotFoundPage';
import TimesheetPage from './Pages/Timesheet';
import './App.scss';
import axiosInstance from './api/interceptor';

const AuthLoader = ({ children }: { children: JSX.Element }) => {
  const { setUser } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance('/auth/me');
        if (res.status==200) {
          const data = await res.data;
          setUser({ mail: data.mail, name: data.name });
        }
      } catch (error) {
        console.error('Auth check failed', error);
      }
    };

    fetchUser();
  }, [setUser]);

  return children;
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { mail } = useUser();
  console.log(mail)
  return mail ? children : <NotFoundPage />;
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  return children;
};

function App() {
  return (
    <UserProvider>
      <Router>
        <AuthLoader>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<PublicRoute><LoginForm /></PublicRoute>} />
            <Route path="/first-reset-pass" element={<FirstResetPassRedirect />} />
            <Route path="/timesheet" element={<ProtectedRoute><TimesheetPage /></ProtectedRoute>} />
            <Route path="/reset-password" element={<ProtectedRoute><ResetPasswordForm /></ProtectedRoute>} />
            <Route path="*" element={<PublicRoute><NotFoundPage /></PublicRoute>} />
          </Routes>
        </AuthLoader>
      </Router>
    </UserProvider>
  );
}

export default App;
