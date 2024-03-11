import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Feed from './component/Feed/feed';
import VideoDetails from './component/VideoDetails/videoDetails';
import logoImage from './image/videlo1.jpg';
import Footer from './component/Footer/Footer';

function App() {
  const preventDefault = (event) => {
    event.preventDefault();
    // You can add custom logic here if needed
  };
  return (
    <>
      <Router>
        <div className="App shadow-lg">
          <header className="header">
            <Link to="/" className="logo-link">
              <img
                src={logoImage}
                alt="My Logo"
                className="w-40 h-20 rounded-full "
              />
            </Link>
            <div className="header-text">
              <Link
                to="/tv-shows"
                className="header-link"
                onClick={preventDefault}
              >
                <div className="styled-text">Reels</div>
              </Link>
              <Link
                to="/movies"
                className="header-link"
                onClick={preventDefault}
              >
                <div className="styled-text">Videos</div>
              </Link>
            </div>
          </header>

          <Routes>
            <Route path="/" exact element={<Feed />} />
            <Route path="/video/:id" element={<VideoDetails />} />
          </Routes>
        </div>
      </Router>
      <Footer/>
    </>
  );
}

export default App;
