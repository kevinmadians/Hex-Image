import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App';
import AboutUs from '../pages/AboutUs';
import Support from '../pages/Support';
import Privacy from '../pages/Privacy';
import Terms from '../pages/Terms';
import Layout from './Layout';

const Root = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <Router>
      <Layout isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
        <Routes>
          <Route path="/" element={<App isDarkMode={isDarkMode} />} />
          <Route path="/about" element={<AboutUs isDarkMode={isDarkMode} />} />
          <Route path="/support" element={<Support isDarkMode={isDarkMode} />} />
          <Route path="/privacy" element={<Privacy isDarkMode={isDarkMode} />} />
          <Route path="/terms" element={<Terms isDarkMode={isDarkMode} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default Root; 