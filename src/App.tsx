import { Route, Routes } from 'react-router-dom';
import Index from './pages';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </div>
  );
}

export default App;
