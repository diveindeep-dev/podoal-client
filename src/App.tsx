import { Route, Routes } from 'react-router-dom';
import GlobalStyle from './styles/Global';
import Layout from './layouts';
import Index from './pages';

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
