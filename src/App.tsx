import { Route, Routes } from 'react-router-dom';
import GlobalStyle from './styles/Global';
import Layout from './layouts';
import Index from './pages';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
