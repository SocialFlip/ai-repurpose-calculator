import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import LandingPage from './components/LandingPage';
import AssessmentPage from './components/AssessmentPage';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;