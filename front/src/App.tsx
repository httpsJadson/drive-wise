import { Routes, Route } from 'react-router-dom';
import { Calculator } from './pages/Calculator';
import Login from './pages/Login';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Calculator />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;