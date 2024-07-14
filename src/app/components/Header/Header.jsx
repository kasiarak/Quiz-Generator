import styles from './Header.module.css';
import Navbar from "../Navbar/Navbar";

function Header(){
    return(
    <header id = {styles.header}>
        <div id ={styles.heading}>
        <h1 id ={styles.headingText}>Quiz Generator</h1>
        </div>
        <Navbar/>
    </header>
    );
}
export default Header