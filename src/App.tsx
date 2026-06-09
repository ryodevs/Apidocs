import { Routes, Route } from 'react-router';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Docs from './pages/Docs';
import './App.css';

export default function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navigation />
              <Home />
            </>
          }
        />
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </>
  );
}
