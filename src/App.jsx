import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar/Navbar.jsx'
import MainPage from './pages/MainPage.jsx';
import AllCategoriesQuizPage from './pages/AllCatagoriesQuizPage.jsx';
import BooksQuizPage from './pages/BooksQuizPage.jsx';
import MusicQuizPage from './pages/MusicQuizPage.jsx';
import FilmQuizPage from './pages/FilmQuizPage.jsx';
import VideoGamesQuizPage from './pages/VideoGamesQuizPage.jsx'
import ScienceQuizPage from './pages/ScienceQuizPage.jsx';
function App() {
  return (
  <>
    <Router>
      <header>
        <div id ="heading">
          <h1>Quiz Generator</h1>
        </div>
        <Navbar/>
      </header>
      <Routes>
        <Route exact path="/" element={<MainPage/>} />
        <Route exact path="/AllCategoriesQuiz" element={<AllCategoriesQuizPage/>} />
        <Route exact path="/BooksQuiz" element={<BooksQuizPage/>} />
        <Route exact path="/MusicQuiz" element={<MusicQuizPage/>} />
        <Route exact path="/FilmQuiz" element={<FilmQuizPage/>} />
        <Route exact path="/VideoGamesQuiz" element={<VideoGamesQuizPage/>} />
        <Route exact path="/ScienceQuiz" element={<ScienceQuizPage/>} />
      </Routes>
    </Router>
  </>
  );
}

export default App
