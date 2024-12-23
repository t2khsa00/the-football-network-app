import { useEffect } from 'react';
import './App.css'; 
import Header from './components/header/Header';
import Fixtures from './components/homeFixtures.jsx/Fixtures';
import TopScorers from './components/homeTopScrores.jsx/TopScorers';

const App = () => {
  useEffect(() => {
    const updatePadding = () => {
      const headerHeight = document.querySelector('.header')?.offsetHeight;
      document.querySelector('.app').style.paddingTop = `${headerHeight}px`;
    };

    // Update padding on mount and resize
    updatePadding();
    window.addEventListener('resize', updatePadding);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', updatePadding);
  }, []);

  return (
    <div className="app">
      <Header />
      <TopScorers />
      <Fixtures />
    </div>
  );
};

export default App;
