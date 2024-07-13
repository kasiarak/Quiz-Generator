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

    function decodeHtmlEntities(text) {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }

    const handleCreateQuiz = async () => {
        setNumberOfQuestions(20); 
        try {
            const link = `https://opentdb.com/api.php?amount=${numberOfQuestions > 20 ? 20 : numberOfQuestions}${props.category !== "null" ? `&category=${props.category}` : ""}`;
            const response = await fetch(link);
            const data = await response.json();
            console.log(data.results);

            const newQuestions = data.results.map((question, index) => {
                const answers = [...question.incorrect_answers, question.correct_answer];
                const shuffledAnswers = answers.sort(() => Math.random() - 0.5).map((answer, id) => (
                    <div key={id}>
                        <input type="radio" name={`question${index}`} />
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
                <div className={Styles.quiz}>
                    {questions}
                    <button        
                        style={{ backgroundColor: bgColor }}
                        className={`${Styles.checkAnswersBtn} ${overpass.className}`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleCreateQuiz}>CHECK ANSWERS</button>
                </div>
            )}
        </>
    );
}

export default QuizSetup;
