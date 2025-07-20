import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
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
  const { setUser, company } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance('/auth/me');
        if (res.status === 200) {
          const data = await res.data;
          setUser({ mail: data.mail, name: data.name, company: data.company });

          if (location.pathname === '/' && data.company) {
            navigate(`/${data.company}/timesheet`);
          }
        }
      } catch (error) {
        console.error('Auth check failed', error);
      }
    };

    fetchUser();
  }, [setUser, navigate, location.pathname]);

  return children;
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { mail, company } = useUser();
  const { company: companyFromUrl } = useParams();
  const navigate = useNavigate();

  if (!mail) return <NotFoundPage />;

  if (company && company !== companyFromUrl) {
    navigate(`/${company}/timesheet`, { replace: true });
    return null;
  }

  return children;
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

            <Route path="/:company/timesheet" element={<ProtectedRoute><TimesheetPage /></ProtectedRoute>} />
            <Route path="/:company/reset-password" element={<ProtectedRoute><ResetPasswordForm /></ProtectedRoute>} />

            <Route path="*" element={<PublicRoute><NotFoundPage /></PublicRoute>} />
          </Routes>
        </AuthLoader>
      </Router>
    </UserProvider>
  );
}

export default App;
