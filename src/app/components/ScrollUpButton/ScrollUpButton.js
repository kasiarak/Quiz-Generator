'use client';
import Styles from './ScrollUpButton.module.css'

function ScrollUpButton(){
    function scrollUp(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return(
    <div id = {Styles.scrollUpBtn}>
        <div onClick={scrollUp} id = {Styles.arrow}>&#10132;</div>
    </div>
    );
}
export default ScrollUpButton