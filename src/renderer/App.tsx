import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Explorer from './components/Explorer/Explorer';
import './App.css';

function Hello() {
  return (
    <div>
      <Explorer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
