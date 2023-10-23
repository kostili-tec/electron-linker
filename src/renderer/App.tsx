import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import icon from '../../assets/icon.svg';
import './App.css';
import { Inputs } from './components/Inputs/Inputs';
import { Explorer } from './components/Explorer/Explorer';

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
