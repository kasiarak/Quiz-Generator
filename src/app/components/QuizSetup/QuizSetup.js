"use client";
import { useState } from 'react';
import Styles from './QuizSetup.module.css'
import { Roboto_Mono } from "next/font/google";
import {Overpass} from "next/font/google";

const robotoMono = Roboto_Mono({
    subsets: ['latin'],
    weight: ['500'], 
}); 

const overpass = Overpass({
    subsets: ['latin'],
    weight: ['800'], 
});

function QuizSetup(props){
    const [bgColor, setBgColor] = useState('white'); 
    const handleMouseEnter = () => setBgColor(props.color); 
    const handleMouseLeave = () => setBgColor('white'); 

    return(
        <div className={`${Styles.container} ${robotoMono.className}`}>
            <h3>Select the number of questions</h3>
            <input className={`${Styles.numberInput} ${robotoMono.className}`} type="number" min={1} max={20} defaultValue={1}></input>
            <button 
                style={{backgroundColor: bgColor}} 
                className={`${Styles.quizbtn} ${overpass.className}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                CREATE QUIZ
            </button>
        </div>
    );
}
export default QuizSetup;