import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserByToken } from './features/auth/slice';
import GlobalStyle from './styles/Global';
import Layout from './layouts';
import Index from './pages';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import Podo from './pages/podo';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: State) => state.auth.isAuthenticated,
  );

  useEffect(() => {
    if (localStorage.token) {
      dispatch(fetchUserByToken());
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate replace to="/" /> : <SignUp />}
          />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate replace to="/" /> : <Login />}
          />
          <Route path="/podo/:podoId" element={<Podo />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
