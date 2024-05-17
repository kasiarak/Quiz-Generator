import { Link } from "react-router-dom"
import './Navbar.css'
function Navbar(){
    return(
    <nav>
       <Link id="mainPageNav"className="navbarButtons"to = "/">Main Page</Link>
        <Link id="allCategoriesNav" className="navbarButtons"to = "/AllCategoriesQuiz">All Categories</Link>
        <Link id="booksNav" className="navbarButtons"to = "/BooksQuiz">Books</Link>
        <Link id="musicNav" className="navbarButtons"to = "/MusicQuiz">Music</Link>
        <Link id="filmNav" className="navbarButtons"to = "/FilmQuiz">Film</Link>
        <Link id="videoGamesNav" className="navbarButtons"to = "/VideoGamesQuiz">Video Games</Link> 
        <Link id="scienceNav" className="navbarButtons"to = "/ScienceQuiz">Science</Link> 
    </nav>
    );
}
export default Navbar