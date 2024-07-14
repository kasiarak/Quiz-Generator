"use client";
import { useState } from 'react';
import Styles from './QuizSetup.module.css'
import { Overpass } from "next/font/google";

const overpass = Overpass({
    subsets: ['latin'],
    weight: ['800'], 
});

function QuizSetup(props) {
    const [bgColor, setBgColor] = useState('white'); 
    const handleMouseEnter = () => setBgColor(props.color); 
    const handleMouseLeave = () => setBgColor('white'); 
    const [numberOfQuestions, setNumberOfQuestions] = useState(1); 
    const handleNumberOfQuestions = (event) => setNumberOfQuestions(event.target.value);

    const [quizIsCreated, setQuizIsCreated] = useState(false); 
    const [questions, setQuestions] = useState([]); 

    const [scoreisShown, setScoreIsShown] = useState(false);
    const [score, setScore] = useState(0); 

    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState([]); 
 
    function decodeHtmlEntities(text) {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }

    const handleCreateQuiz = async () => {
        if(numberOfQuestions>20) setNumberOfQuestions(20); 
        try {
            const link = `https://opentdb.com/api.php?amount=${numberOfQuestions > 20 ? 20 : numberOfQuestions}${props.category !== "null" ? `&category=${props.category}` : ""}`;
            const response = await fetch(link);
            const data = await response.json();

            const newQuestions = data.results.map((question, index) => {
                setCorrectAnswers(prevCorrectAnswers => ({...prevCorrectAnswers, [index]: decodeHtmlEntities(question.correct_answer)}));
                const answers = [...question.incorrect_answers, question.correct_answer];
                const shuffledAnswers = answers.sort(() => Math.random() - 0.5).map((answer, id) => (
                    <div key={id}>
                        <input onChange={e => setSelectedAnswers(prevSelectedAnswers => ({...prevSelectedAnswers, [index]: decodeHtmlEntities(e.target.value)}))} type="radio" name={`question${index}`} value={answer}/>
                        <label>{decodeHtmlEntities(answer)}</label>
                    </div>
                ));
                return (
                    <div key={index} className={`${Styles.question} ${overpass.className}`}> 
                        <h3>{decodeHtmlEntities(question.question)}</h3>
                        <div className={Styles.answers}>{shuffledAnswers}</div>
                    </div>
                );
            });

            setQuestions(newQuestions);
            setBgColor('white'); 
            setQuizIsCreated(true);
        } catch (error) {
            console.error(error);
        }
    };

    const checkAnswers = () => {
        console.log(selectedAnswers)
        console.log(correctAnswers)
        for(let i = 0; i < numberOfQuestions; i++){
            if(selectedAnswers[i] === correctAnswers[i]) setScore(score => score + 1); 
        }
        setScoreIsShown(true); 
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    return (
        <>
            {!quizIsCreated && (
                <div className={`${Styles.container} ${overpass.className}`}>
                    <h3>Select the number of questions</h3>
                    <input 
                        value={numberOfQuestions} 
                        onChange={handleNumberOfQuestions}
                        className={`${Styles.numberInput} ${overpass.className}`}
                        type="number"
                        min={1}
                        max={20}
                    />
                    <button
                        style={{ backgroundColor: bgColor }}
                        className={`${Styles.quizbtn} ${overpass.className}`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleCreateQuiz}
                    >
                        CREATE QUIZ
                    </button>
                </div>
            )}
            {quizIsCreated && ( 
                <div styles={{flexDirection: 'column'}}>   
                {scoreisShown && (<div className={Styles.score}>
                    <div className={Styles.text}>
                    <h3>Score</h3>
                    <h3>{score}/{numberOfQuestions}</h3>
                    </div>
                </div>)}
                <div className={Styles.quiz}>
                    {questions}
                    {!scoreisShown && <button        
                        style={{ backgroundColor: bgColor }}
                        className={`${Styles.checkAnswersBtn} ${overpass.className}`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={checkAnswers}>CHECK ANSWERS</button>}
                </div>
                </div>
            )}
        </>
    );
}

export default QuizSetup;
