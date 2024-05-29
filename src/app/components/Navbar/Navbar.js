import Link from 'next/link';
import Styles from './Navbar.module.css'
function Navbar(){
    return(
    <nav className={Styles.nav}>
       <Link id={Styles.mainPageNav} className={Styles.navbarButtons} href = "/">Main Page</Link>
       <Link id={Styles.allCategoriesNav} className={Styles.navbarButtons} href = "/AllCategoriesQuiz">All Categories</Link>
       <Link id={Styles.booksNav} className={Styles.navbarButtons} href = "/BookQuiz">Books</Link>
       <Link id={Styles.musicNav} className={Styles.navbarButtons} href = "/MusicQuiz">Music</Link>
       <Link id={Styles.filmNav} className={Styles.navbarButtons} href = "/FilmQuiz">Film</Link>
       <Link id={Styles.videoGamesNav} className={Styles.navbarButtons} href = "/VideoGamesQuiz">Video Games</Link> 
       <Link id={Styles.scienceNav} className={Styles.navbarButtons} href = "/ScienceQuiz">Science</Link> 
    </nav>
    );
}
export default Navbar