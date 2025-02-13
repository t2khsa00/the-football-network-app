import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; 
import Header from './pages/frontpage/header/Header';
import TopScorers from './pages/frontpage/homeTopScrores.jsx/TopScorers';
import News from './pages/frontpage/news/News';
import LastSeasonChampions from './pages/frontpage/chamiopns/LastSeasonChampions';
import Footer from './pages/frontpage/footer/Footer';
import HomeFixtures from './pages/frontpage/homeFixtures/HomeFixtures';
import ChampionsLeaguePage from './pages/championsLeague/ChampionsLeague';

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
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <TopScorers />
              <HomeFixtures />
              <News />
              <LastSeasonChampions />
            </>
          } />
          <Route path="/champions-league" element={<ChampionsLeaguePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
