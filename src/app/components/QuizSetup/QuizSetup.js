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
    let questions = [];  
    const [bgColor, setBgColor] = useState('white'); 
    const handleMouseEnter = () => setBgColor(props.color); 
    const handleMouseLeave = () => setBgColor('white'); 
    const [numberOfQuestions, setNumberOfQuestions] = useState(1); 
    const handleNumberOfQuestions = (event) => setNumberOfQuestions(event.target.value);

    const [quizIsCreated, setQuizIsCreated] = useState(false); 
    const handleCreateQuiz = async () => {
        setQuizIsCreated(true);
        try{
            const link=`https://opentdb.com/api.php?amount=${numberOfQuestions}${props.category!=="null" ? `&category=${props.category}` : ""}`;
            const response = await fetch(link);
            const data = await response.json();
            for(let i = 0; i < data.results.length; i++){
                questions.push(
                    <div className='question'>
                        
                    </div>
                );
            } 
        }catch(error){
            console.error(error);
        }
    } 
    return(
        <>
        {!quizIsCreated && (
            <div className={`${Styles.container} ${robotoMono.className}`}>
                <h3>Select the number of questions</h3>
                <input value={numberOfQuestions} onChange={handleNumberOfQuestions}
                    className={`${Styles.numberInput} ${robotoMono.className}`}
                    type="number"
                    min={1}
                    max={20}
                />
                <button
                    style={{ backgroundColor: bgColor }}
                    className={`${Styles.quizbtn} ${overpass.className}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleCreateQuiz}>CREATE QUIZ</button>
            </div>
        )}
        {quizIsCreated && <div className='quiz'>
            QUIZ
        </div>}
    </>
    );
}
export default QuizSetup;