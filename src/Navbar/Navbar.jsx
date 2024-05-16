import { Link } from "react-router-dom"
import './Navbar.css'
function Navbar(){
    return(
    <nav>
       <Link className="navbarButtons"to = "/">Main Page</Link>
        <Link className="navbarButtons"to = "/AllCategoriesQuiz">All Categories</Link>
        <Link className="navbarButtons"to = "/BooksQuiz">Books</Link>
        <Link className="navbarButtons"to = "/MusicQuiz">Music</Link>
        <Link className="navbarButtons"to = "/FilmQuiz">Film</Link>
        <Link className="navbarButtons"to = "/VideoGamesQuiz">Video Games</Link> 
        <Link className="navbarButtons"to = "/ScienceQuiz">Science</Link> 
    </nav>
    );
}
export default Navbar