import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import UserInfoContext from './contexts/userInfo';
import Layout from './components/Layout/Layout';

import './App.css';

const EstateDetailsPage = React.lazy(() => import('./pages/EstateDetailsPage'));
const HomePage = React.lazy(() => import('./pages/HomePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const UserAccount = React.lazy(() => import('./pages/UserAccount'));
const UserDashboardPage = React.lazy(() => import('./pages/UserDashboardPage'));
const UserEstatesPage = React.lazy(() => import('./pages/UserEstatesPage'));
const UserSettingsPage = React.lazy(() => import('./pages/UserSettingsPage'));
const AdminUsersPage = React.lazy(() => import('./pages/admin/AdminUsersPage'));

const App = () => {
  const userInfoinitial = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  const [user, setUser] = useState(userInfoinitial);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <>
      <CssBaseline />
      <div>
        <UserInfoContext.Provider value={providerValue}>
          <Navbar />
          <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/:id" element={<EstateDetailsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route
                path="/me/*"
                element={
                  <Layout>
                    <Routes>
                      <Route index element={<UserAccount />} />
                      <Route path="dashboard" element={<UserDashboardPage />} />
                      <Route path="estates" element={<UserEstatesPage />} />
                      <Route path="settings" element={<UserSettingsPage />} />
                      <Route path="users" element={<AdminUsersPage />} />
                    </Routes>
                  </Layout>
                }
              ></Route>
            </Routes>
          </React.Suspense>
        </UserInfoContext.Provider>
      </div>
    </>
  );
};

export default App;
