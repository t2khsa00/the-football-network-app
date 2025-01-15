import { useState } from 'react';
import Pagination from '../../../components/pagination/Pagination'; 
import '../../../components/pagination/Pagination.css';
import './News.css'; 
const News = () => {
  // Sample data for news articles
  const newsArticles = [
    { id: 1, image: '/logo.png', title: 'Big Match Coming Up!', summary: 'The biggest football match of the year is coming up.', link: '/news/1' },
    { id: 2, image: '/logo.png', title: 'New Record Set in the League', summary: 'A new record has been set in the league.', link: '/news/2' },
    { id: 3, image: '/logo.png', title: 'Top Players of the Season', summary: 'The best players of the season have been revealed.', link: '/news/3' },
    { id: 4, image: '/logo.png', title: 'League Standings Updated', summary: 'The league standings have been updated after the recent matches.', link: '/news/4' },
    { id: 5, image: '/logo.png', title: 'Injury Report: Key Players Out', summary: 'Several key players are out due to injuries.', link: '/news/5' },
    { id: 6, image: '/logo.png', title: 'Transfer Window Analysis', summary: 'A deep dive into the most notable transfers in the league.', link: '/news/6' },
    { id: 7, image: '/logo.png', title: 'Fans React to Recent Matches', summary: 'Fans have had a lot to say about the recent matches.', link: '/news/7' },
    { id: 8, image: '/logo.png.', title: 'Upcoming Matches You Shouldn’t Miss', summary: 'A list of the most anticipated matches for the upcoming season.', link: '/news/8' },
    { id: 9, image: '/logo.png', title: 'Top Goal Scorers of the Season', summary: 'A look at the top goal scorers of the season so far.', link: '/news/9' },
    { id: 10, image: '/logo.png', title: 'Best Moments from the Recent Game', summary: 'Recapping the most exciting moments from the latest game.', link: '/news/10' },
    { id: 11, image: '/logo.png', title: 'Player of the Week', summary: 'This week’s standout player has been revealed.', link: '/news/11' },
    { id: 12, image: '/logo.png', title: 'New Sponsor for the League', summary: 'The league announces a new sponsorship deal.', link: '/news/12' },
    { id: 13, image: '/logo.png', title: 'Exciting Match Preview', summary: 'A preview of the exciting upcoming match this weekend.', link: '/news/13' },
    { id: 14, image: '/logo.png', title: 'Top Coaches of the Year', summary: 'The best coaches of the year have been announced.', link: '/news/14' },
    { id: 15, image: '/logo.png', title: 'Rising Star in the League', summary: 'A rising star is making waves in the league.', link: '/news/15' },
    { id: 16, image: '/logo.png', title: 'Season Recap', summary: 'A full recap of the season’s most memorable moments.', link: '/news/16' },
    { id: 17, image: '/logo.png', title: 'Fan Favorite Players', summary: 'Here are the fan-favorite players from this season.', link: '/news/17' },
    { id: 18, image: '/logo.png', title: 'Team of the Month', summary: 'The top-performing team of the month has been announced.', link: '/news/18' },
    { id: 19, image: '/logo.png', title: 'Top Stadiums to Visit', summary: 'Here are the top stadiums every fan should visit.', link: '/news/19' },
    { id: 20, image: '/logo.png', title: 'Club Rivalries', summary: 'A look at the most intense rivalries in football.', link: '/news/20' },
    { id: 1, image: '/logo.png', title: 'Big Match Coming Up!', summary: 'The biggest football match of the year is coming up.', link: '/news/1' },
    { id: 2, image: '/logo.png', title: 'New Record Set in the League', summary: 'A new record has been set in the league.', link: '/news/2' },
    { id: 3, image: '/logo.png', title: 'Top Players of the Season', summary: 'The best players of the season have been revealed.', link: '/news/3' },
    { id: 4, image: '/logo.png', title: 'League Standings Updated', summary: 'The league standings have been updated after the recent matches.', link: '/news/4' },
    { id: 5, image: '/logo.png', title: 'Injury Report: Key Players Out', summary: 'Several key players are out due to injuries.', link: '/news/5' },
    { id: 6, image: '/logo.png', title: 'Transfer Window Analysis', summary: 'A deep dive into the most notable transfers in the league.', link: '/news/6' },
    { id: 7, image: '/logo.png', title: 'Fans React to Recent Matches', summary: 'Fans have had a lot to say about the recent matches.', link: '/news/7' },
    { id: 8, image: '/logo.png.', title: 'Upcoming Matches You Shouldn’t Miss', summary: 'A list of the most anticipated matches for the upcoming season.', link: '/news/8' },
    { id: 9, image: '/logo.png', title: 'Top Goal Scorers of the Season', summary: 'A look at the top goal scorers of the season so far.', link: '/news/9' },
    { id: 10, image: '/logo.png', title: 'Best Moments from the Recent Game', summary: 'Recapping the most exciting moments from the latest game.', link: '/news/10' },
    { id: 11, image: '/logo.png', title: 'Player of the Week', summary: 'This week’s standout player has been revealed.', link: '/news/11' },
    { id: 12, image: '/logo.png', title: 'New Sponsor for the League', summary: 'The league announces a new sponsorship deal.', link: '/news/12' },
    { id: 13, image: '/logo.png', title: 'Exciting Match Preview', summary: 'A preview of the exciting upcoming match this weekend.', link: '/news/13' },
    { id: 14, image: '/logo.png', title: 'Top Coaches of the Year', summary: 'The best coaches of the year have been announced.', link: '/news/14' },
    { id: 15, image: '/logo.png', title: 'Rising Star in the League', summary: 'A rising star is making waves in the league.', link: '/news/15' },
    { id: 16, image: '/logo.png', title: 'Season Recap', summary: 'A full recap of the season’s most memorable moments.', link: '/news/16' },
    { id: 17, image: '/logo.png', title: 'Fan Favorite Players', summary: 'Here are the fan-favorite players from this season.', link: '/news/17' },
    { id: 18, image: '/logo.png', title: 'Team of the Month', summary: 'The top-performing team of the month has been announced.', link: '/news/18' },
    { id: 19, image: '/logo.png', title: 'Top Stadiums to Visit', summary: 'Here are the top stadiums every fan should visit.', link: '/news/19' },
    { id: 20, image: '/logo.png', title: 'Club Rivalries', summary: 'A look at the most intense rivalries in football.', link: '/news/20' },
    { id: 1, image: '/logo.png', title: 'Big Match Coming Up!', summary: 'The biggest football match of the year is coming up.', link: '/news/1' },
    { id: 2, image: '/logo.png', title: 'New Record Set in the League', summary: 'A new record has been set in the league.', link: '/news/2' },
    { id: 3, image: '/logo.png', title: 'Top Players of the Season', summary: 'The best players of the season have been revealed.', link: '/news/3' },
    { id: 4, image: '/logo.png', title: 'League Standings Updated', summary: 'The league standings have been updated after the recent matches.', link: '/news/4' },
    { id: 5, image: '/logo.png', title: 'Injury Report: Key Players Out', summary: 'Several key players are out due to injuries.', link: '/news/5' },
    { id: 6, image: '/logo.png', title: 'Transfer Window Analysis', summary: 'A deep dive into the most notable transfers in the league.', link: '/news/6' },
    { id: 7, image: '/logo.png', title: 'Fans React to Recent Matches', summary: 'Fans have had a lot to say about the recent matches.', link: '/news/7' },
    { id: 8, image: '/logo.png.', title: 'Upcoming Matches You Shouldn’t Miss', summary: 'A list of the most anticipated matches for the upcoming season.', link: '/news/8' },
    { id: 9, image: '/logo.png', title: 'Top Goal Scorers of the Season', summary: 'A look at the top goal scorers of the season so far.', link: '/news/9' },
    { id: 10, image: '/logo.png', title: 'Best Moments from the Recent Game', summary: 'Recapping the most exciting moments from the latest game.', link: '/news/10' },
    { id: 11, image: '/logo.png', title: 'Player of the Week', summary: 'This week’s standout player has been revealed.', link: '/news/11' },
    { id: 12, image: '/logo.png', title: 'New Sponsor for the League', summary: 'The league announces a new sponsorship deal.', link: '/news/12' },
    { id: 13, image: '/logo.png', title: 'Exciting Match Preview', summary: 'A preview of the exciting upcoming match this weekend.', link: '/news/13' },
    { id: 14, image: '/logo.png', title: 'Top Coaches of the Year', summary: 'The best coaches of the year have been announced.', link: '/news/14' },
    { id: 15, image: '/logo.png', title: 'Rising Star in the League', summary: 'A rising star is making waves in the league.', link: '/news/15' },
    { id: 16, image: '/logo.png', title: 'Season Recap', summary: 'A full recap of the season’s most memorable moments.', link: '/news/16' },
    { id: 17, image: '/logo.png', title: 'Fan Favorite Players', summary: 'Here are the fan-favorite players from this season.', link: '/news/17' },
    { id: 18, image: '/logo.png', title: 'Team of the Month', summary: 'The top-performing team of the month has been announced.', link: '/news/18' },
    { id: 19, image: '/logo.png', title: 'Top Stadiums to Visit', summary: 'Here are the top stadiums every fan should visit.', link: '/news/19' },
    { id: 20, image: '/logo.png', title: 'Club Rivalries', summary: 'A look at the most intense rivalries in football.', link: '/news/20' },
    { id: 1, image: '/logo.png', title: 'Big Match Coming Up!', summary: 'The biggest football match of the year is coming up.', link: '/news/1' },
    { id: 2, image: '/logo.png', title: 'New Record Set in the League', summary: 'A new record has been set in the league.', link: '/news/2' },
    { id: 3, image: '/logo.png', title: 'Top Players of the Season', summary: 'The best players of the season have been revealed.', link: '/news/3' },
    { id: 4, image: '/logo.png', title: 'League Standings Updated', summary: 'The league standings have been updated after the recent matches.', link: '/news/4' },
    { id: 5, image: '/logo.png', title: 'Injury Report: Key Players Out', summary: 'Several key players are out due to injuries.', link: '/news/5' },
    { id: 6, image: '/logo.png', title: 'Transfer Window Analysis', summary: 'A deep dive into the most notable transfers in the league.', link: '/news/6' },
    { id: 7, image: '/logo.png', title: 'Fans React to Recent Matches', summary: 'Fans have had a lot to say about the recent matches.', link: '/news/7' },
    { id: 8, image: '/logo.png.', title: 'Upcoming Matches You Shouldn’t Miss', summary: 'A list of the most anticipated matches for the upcoming season.', link: '/news/8' },
    { id: 9, image: '/logo.png', title: 'Top Goal Scorers of the Season', summary: 'A look at the top goal scorers of the season so far.', link: '/news/9' },
    { id: 10, image: '/logo.png', title: 'Best Moments from the Recent Game', summary: 'Recapping the most exciting moments from the latest game.', link: '/news/10' },
    { id: 11, image: '/logo.png', title: 'Player of the Week', summary: 'This week’s standout player has been revealed.', link: '/news/11' },
    { id: 12, image: '/logo.png', title: 'New Sponsor for the League', summary: 'The league announces a new sponsorship deal.', link: '/news/12' },
    { id: 13, image: '/logo.png', title: 'Exciting Match Preview', summary: 'A preview of the exciting upcoming match this weekend.', link: '/news/13' },
    { id: 14, image: '/logo.png', title: 'Top Coaches of the Year', summary: 'The best coaches of the year have been announced.', link: '/news/14' },
    { id: 15, image: '/logo.png', title: 'Rising Star in the League', summary: 'A rising star is making waves in the league.', link: '/news/15' },
    { id: 16, image: '/logo.png', title: 'Season Recap', summary: 'A full recap of the season’s most memorable moments.', link: '/news/16' },
    { id: 17, image: '/logo.png', title: 'Fan Favorite Players', summary: 'Here are the fan-favorite players from this season.', link: '/news/17' },
    { id: 18, image: '/logo.png', title: 'Team of the Month', summary: 'The top-performing team of the month has been announced.', link: '/news/18' },
    { id: 19, image: '/logo.png', title: 'Top Stadiums to Visit', summary: 'Here are the top stadiums every fan should visit.', link: '/news/19' },
    { id: 20, image: '/logo.png', title: 'Club Rivalries', summary: 'A look at the most intense rivalries in football.', link: '/news/20' },
    { id: 1, image: '/logo.png', title: 'Big Match Coming Up!', summary: 'The biggest football match of the year is coming up.', link: '/news/1' },
    { id: 2, image: '/logo.png', title: 'New Record Set in the League', summary: 'A new record has been set in the league.', link: '/news/2' },
    { id: 3, image: '/logo.png', title: 'Top Players of the Season', summary: 'The best players of the season have been revealed.', link: '/news/3' },
    { id: 4, image: '/logo.png', title: 'League Standings Updated', summary: 'The league standings have been updated after the recent matches.', link: '/news/4' },
    { id: 5, image: '/logo.png', title: 'Injury Report: Key Players Out', summary: 'Several key players are out due to injuries.', link: '/news/5' },
    { id: 6, image: '/logo.png', title: 'Transfer Window Analysis', summary: 'A deep dive into the most notable transfers in the league.', link: '/news/6' },
    { id: 7, image: '/logo.png', title: 'Fans React to Recent Matches', summary: 'Fans have had a lot to say about the recent matches.', link: '/news/7' },
    { id: 8, image: '/logo.png.', title: 'Upcoming Matches You Shouldn’t Miss', summary: 'A list of the most anticipated matches for the upcoming season.', link: '/news/8' },
    { id: 9, image: '/logo.png', title: 'Top Goal Scorers of the Season', summary: 'A look at the top goal scorers of the season so far.', link: '/news/9' },
    { id: 10, image: '/logo.png', title: 'Best Moments from the Recent Game', summary: 'Recapping the most exciting moments from the latest game.', link: '/news/10' },
    { id: 11, image: '/logo.png', title: 'Player of the Week', summary: 'This week’s standout player has been revealed.', link: '/news/11' },
    { id: 12, image: '/logo.png', title: 'New Sponsor for the League', summary: 'The league announces a new sponsorship deal.', link: '/news/12' },
    { id: 13, image: '/logo.png', title: 'Exciting Match Preview', summary: 'A preview of the exciting upcoming match this weekend.', link: '/news/13' },
    { id: 14, image: '/logo.png', title: 'Top Coaches of the Year', summary: 'The best coaches of the year have been announced.', link: '/news/14' },
    { id: 15, image: '/logo.png', title: 'Rising Star in the League', summary: 'A rising star is making waves in the league.', link: '/news/15' },
    { id: 16, image: '/logo.png', title: 'Season Recap', summary: 'A full recap of the season’s most memorable moments.', link: '/news/16' },
    { id: 17, image: '/logo.png', title: 'Fan Favorite Players', summary: 'Here are the fan-favorite players from this season.', link: '/news/17' },
    { id: 18, image: '/logo.png', title: 'Team of the Month', summary: 'The top-performing team of the month has been announced.', link: '/news/18' },
    { id: 19, image: '/logo.png', title: 'Top Stadiums to Visit', summary: 'Here are the top stadiums every fan should visit.', link: '/news/19' },
    { id: 20, image: '/logo.png', title: 'Club Rivalries', summary: 'A look at the most intense rivalries in football.', link: '/news/20' },
    { id: 1, image: '/logo.png', title: 'Big Match Coming Up!', summary: 'The biggest football match of the year is coming up.', link: '/news/1' },
    { id: 2, image: '/logo.png', title: 'New Record Set in the League', summary: 'A new record has been set in the league.', link: '/news/2' },
    { id: 3, image: '/logo.png', title: 'Top Players of the Season', summary: 'The best players of the season have been revealed.', link: '/news/3' },
    { id: 4, image: '/logo.png', title: 'League Standings Updated', summary: 'The league standings have been updated after the recent matches.', link: '/news/4' },
    { id: 5, image: '/logo.png', title: 'Injury Report: Key Players Out', summary: 'Several key players are out due to injuries.', link: '/news/5' },
    { id: 6, image: '/logo.png', title: 'Transfer Window Analysis', summary: 'A deep dive into the most notable transfers in the league.', link: '/news/6' },
    { id: 7, image: '/logo.png', title: 'Fans React to Recent Matches', summary: 'Fans have had a lot to say about the recent matches.', link: '/news/7' },
    { id: 8, image: '/logo.png.', title: 'Upcoming Matches You Shouldn’t Miss', summary: 'A list of the most anticipated matches for the upcoming season.', link: '/news/8' },
    { id: 9, image: '/logo.png', title: 'Top Goal Scorers of the Season', summary: 'A look at the top goal scorers of the season so far.', link: '/news/9' },
    { id: 10, image: '/logo.png', title: 'Best Moments from the Recent Game', summary: 'Recapping the most exciting moments from the latest game.', link: '/news/10' },
    { id: 11, image: '/logo.png', title: 'Player of the Week', summary: 'This week’s standout player has been revealed.', link: '/news/11' },
    { id: 12, image: '/logo.png', title: 'New Sponsor for the League', summary: 'The league announces a new sponsorship deal.', link: '/news/12' },
    { id: 13, image: '/logo.png', title: 'Exciting Match Preview', summary: 'A preview of the exciting upcoming match this weekend.', link: '/news/13' },
    { id: 14, image: '/logo.png', title: 'Top Coaches of the Year', summary: 'The best coaches of the year have been announced.', link: '/news/14' },
    { id: 15, image: '/logo.png', title: 'Rising Star in the League', summary: 'A rising star is making waves in the league.', link: '/news/15' },
    { id: 16, image: '/logo.png', title: 'Season Recap', summary: 'A full recap of the season’s most memorable moments.', link: '/news/16' },
    { id: 17, image: '/logo.png', title: 'Fan Favorite Players', summary: 'Here are the fan-favorite players from this season.', link: '/news/17' },
    { id: 18, image: '/logo.png', title: 'Team of the Month', summary: 'The top-performing team of the month has been announced.', link: '/news/18' },
    { id: 19, image: '/logo.png', title: 'Top Stadiums to Visit', summary: 'Here are the top stadiums every fan should visit.', link: '/news/19' },
    { id: 20, image: '/logo.png', title: 'Club Rivalries', summary: 'A look at the most intense rivalries in football.', link: '/news/20' },
    { id: 1, image: '/logo.png', title: 'Big Match Coming Up!', summary: 'The biggest football match of the year is coming up.', link: '/news/1' },
    { id: 2, image: '/logo.png', title: 'New Record Set in the League', summary: 'A new record has been set in the league.', link: '/news/2' },
    { id: 3, image: '/logo.png', title: 'Top Players of the Season', summary: 'The best players of the season have been revealed.', link: '/news/3' },
    { id: 4, image: '/logo.png', title: 'League Standings Updated', summary: 'The league standings have been updated after the recent matches.', link: '/news/4' },
    { id: 5, image: '/logo.png', title: 'Injury Report: Key Players Out', summary: 'Several key players are out due to injuries.', link: '/news/5' },
    { id: 6, image: '/logo.png', title: 'Transfer Window Analysis', summary: 'A deep dive into the most notable transfers in the league.', link: '/news/6' },
    { id: 7, image: '/logo.png', title: 'Fans React to Recent Matches', summary: 'Fans have had a lot to say about the recent matches.', link: '/news/7' },
    { id: 8, image: '/logo.png.', title: 'Upcoming Matches You Shouldn’t Miss', summary: 'A list of the most anticipated matches for the upcoming season.', link: '/news/8' },
    { id: 9, image: '/logo.png', title: 'Top Goal Scorers of the Season', summary: 'A look at the top goal scorers of the season so far.', link: '/news/9' },
    { id: 10, image: '/logo.png', title: 'Best Moments from the Recent Game', summary: 'Recapping the most exciting moments from the latest game.', link: '/news/10' },
    { id: 11, image: '/logo.png', title: 'Player of the Week', summary: 'This week’s standout player has been revealed.', link: '/news/11' },
    { id: 12, image: '/logo.png', title: 'New Sponsor for the League', summary: 'The league announces a new sponsorship deal.', link: '/news/12' },
    { id: 13, image: '/logo.png', title: 'Exciting Match Preview', summary: 'A preview of the exciting upcoming match this weekend.', link: '/news/13' },
    { id: 14, image: '/logo.png', title: 'Top Coaches of the Year', summary: 'The best coaches of the year have been announced.', link: '/news/14' },
    { id: 15, image: '/logo.png', title: 'Rising Star in the League', summary: 'A rising star is making waves in the league.', link: '/news/15' },
    { id: 16, image: '/logo.png', title: 'Season Recap', summary: 'A full recap of the season’s most memorable moments.', link: '/news/16' },
    { id: 17, image: '/logo.png', title: 'Fan Favorite Players', summary: 'Here are the fan-favorite players from this season.', link: '/news/17' },
    { id: 18, image: '/logo.png', title: 'Team of the Month', summary: 'The top-performing team of the month has been announced.', link: '/news/18' },
    { id: 19, image: '/logo.png', title: 'Top Stadiums to Visit', summary: 'Here are the top stadiums every fan should visit.', link: '/news/19' },
    { id: 20, image: '/logo.png', title: 'Club Rivalries', summary: 'A look at the most intense rivalries in football.', link: '/news/20' },
    { id: 1, image: '/logo.png', title: 'Big Match Coming Up!', summary: 'The biggest football match of the year is coming up.', link: '/news/1' },
    { id: 2, image: '/logo.png', title: 'New Record Set in the League', summary: 'A new record has been set in the league.', link: '/news/2' },
    { id: 3, image: '/logo.png', title: 'Top Players of the Season', summary: 'The best players of the season have been revealed.', link: '/news/3' },
    { id: 4, image: '/logo.png', title: 'League Standings Updated', summary: 'The league standings have been updated after the recent matches.', link: '/news/4' },
    { id: 5, image: '/logo.png', title: 'Injury Report: Key Players Out', summary: 'Several key players are out due to injuries.', link: '/news/5' },
    { id: 6, image: '/logo.png', title: 'Transfer Window Analysis', summary: 'A deep dive into the most notable transfers in the league.', link: '/news/6' },
    { id: 7, image: '/logo.png', title: 'Fans React to Recent Matches', summary: 'Fans have had a lot to say about the recent matches.', link: '/news/7' },
    { id: 8, image: '/logo.png.', title: 'Upcoming Matches You Shouldn’t Miss', summary: 'A list of the most anticipated matches for the upcoming season.', link: '/news/8' },
    { id: 9, image: '/logo.png', title: 'Top Goal Scorers of the Season', summary: 'A look at the top goal scorers of the season so far.', link: '/news/9' },
    { id: 10, image: '/logo.png', title: 'Best Moments from the Recent Game', summary: 'Recapping the most exciting moments from the latest game.', link: '/news/10' },
    { id: 11, image: '/logo.png', title: 'Player of the Week', summary: 'This week’s standout player has been revealed.', link: '/news/11' },
    { id: 12, image: '/logo.png', title: 'New Sponsor for the League', summary: 'The league announces a new sponsorship deal.', link: '/news/12' },
    { id: 13, image: '/logo.png', title: 'Exciting Match Preview', summary: 'A preview of the exciting upcoming match this weekend.', link: '/news/13' },
    { id: 14, image: '/logo.png', title: 'Top Coaches of the Year', summary: 'The best coaches of the year have been announced.', link: '/news/14' },
    { id: 15, image: '/logo.png', title: 'Rising Star in the League', summary: 'A rising star is making waves in the league.', link: '/news/15' },
    { id: 16, image: '/logo.png', title: 'Season Recap', summary: 'A full recap of the season’s most memorable moments.', link: '/news/16' },
    { id: 17, image: '/logo.png', title: 'Fan Favorite Players', summary: 'Here are the fan-favorite players from this season.', link: '/news/17' },
    { id: 18, image: '/logo.png', title: 'Team of the Month', summary: 'The top-performing team of the month has been announced.', link: '/news/18' },
    { id: 19, image: '/logo.png', title: 'Top Stadiums to Visit', summary: 'Here are the top stadiums every fan should visit.', link: '/news/19' },
    { id: 20, image: '/logo.png', title: 'Club Rivalries', summary: 'A look at the most intense rivalries in football.', link: '/news/20' },
    
    // Add more articles as needed
  ];

  // Pagination settings
  const articlesPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the articles to show on the current page
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = newsArticles.slice(startIndex, startIndex + articlesPerPage);

  // Handle the page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="news-container">
      <h2 className="section-title">Latest News</h2>
      <div className="news-list">
        {currentArticles.map((article) => (
          <div key={article.id} className="news-item">
            <img src={article.image} alt="News Image" className="news-image" />
            <div className="news-content">
              <h3 className="news-title">{article.title}</h3>
              <p className="news-summary">{article.summary}</p>
              <a href={article.link} className="read-more-link">Read More</a>
            </div>
          </div>
        ))}
      </div>

      {/* Use Pagination component */}
      <Pagination 
        totalItems={newsArticles.length} 
        itemsPerPage={articlesPerPage} 
        onPageChange={(pageNumber) => handlePageChange(pageNumber)}
      />
    </div>
  );
};

export default News;
