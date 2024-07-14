"use client";
import { useState } from 'react';
import Styles from './QuizSetup.module.css';
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

    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [answersClass, setAnswersClass] = useState({});

    function decodeHtmlEntities(text) {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }

    const handleCreateQuiz = async () => {
        if (numberOfQuestions > 20) setNumberOfQuestions(20);
        try {
            const link = `https://opentdb.com/api.php?amount=${numberOfQuestions > 20 ? 20 : numberOfQuestions}${props.category !== "null" ? `&category=${props.category}` : ""}`;
            const response = await fetch(link);
            const data = await response.json();

            const newQuestions = data.results.map((question, index) => {
                setCorrectAnswers(prevCorrectAnswers => ({ ...prevCorrectAnswers, [index]: decodeHtmlEntities(question.correct_answer) }));
                const answers = [...question.incorrect_answers, question.correct_answer];
                const shuffledAnswers = answers.sort(() => Math.random() - 0.5).map((answer, id) => (
                    <div key={id}>
                        <input 
                            onChange={e => setSelectedAnswers(prevSelectedAnswers => ({ ...prevSelectedAnswers, [index]: decodeHtmlEntities(e.target.value) }))} 
                            type="radio" 
                            name={`question${index}`} 
                            value={answer}
                        />
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
        let newScore = 0;
        let newAnswersClass = {};
 
        for (let i = 0; i < numberOfQuestions; i++) {
            newAnswersClass[i] = {};
            for (let j = 0; j < questions[i].props.children[1].props.children.length; j++) {
                const answer = questions[i].props.children[1].props.children[j].props.children[0].props.value;
                if (answer === correctAnswers[i]) {
                    newAnswersClass[i][answer] = Styles.correct; 
                } else if (selectedAnswers[i] === answer) {
                    newAnswersClass[i][answer] = Styles.incorrect; 
                }
            }
            if (selectedAnswers[i] === correctAnswers[i]) newScore++;
        }
        setScore(newScore);
        setAnswersClass(newAnswersClass);
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
                <div styles={{ flexDirection: 'column' }}>
                    {scoreisShown && (
                        <div className={Styles.score}>
                            <div className={Styles.text}>
                                <h3>Score</h3>
                                <h3>{score}/{numberOfQuestions}</h3>
                            </div>
                        </div>
                    )}
                    <div className={Styles.quiz}>
                        {questions.map((question, index) => (
                            <div key={index} className={`${Styles.question} ${overpass.className}`}>
                                <h3>{question.props.children[0].props.children}</h3>
                                <div className={Styles.answers}>
                                    {question.props.children[1].props.children.map((answerDiv, id) => {
                                        const answer = answerDiv.props.children[0].props.value;
                                        return (
                                            <div key={id}>
                                                <input
                                                    type="radio"
                                                    name={`question${index}`}
                                                    value={answer}
                                                    onChange={e => setSelectedAnswers(prevSelectedAnswers => ({ ...prevSelectedAnswers, [index]: decodeHtmlEntities(e.target.value) }))}
                                                />
                                                <label className={answersClass[index] && answersClass[index][answer]}>{decodeHtmlEntities(answer)}</label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                        {!scoreisShown && (
                            <button
                                style={{ backgroundColor: bgColor }}
                                className={`${Styles.checkAnswersBtn} ${overpass.className}`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={checkAnswers}
                            >
                                CHECK ANSWERS
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default QuizSetup;
