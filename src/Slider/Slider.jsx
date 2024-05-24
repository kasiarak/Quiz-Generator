import React, { useState, useEffect } from 'react';
import './Slider.css'

const slides = [
    { text: 'QUIZ GENERATOR', color: 'rgb(31, 130, 236)' },
    { text: 'ALL CATEGORIES QUIZ', color: 'red' },
    { text: 'BOOK QUIZ', color: 'rgb(221, 218, 13)' },
    { text: 'MUSIC QUIZ', color: 'rgb(10, 137, 141)' },
    { text: 'FILM QUIZ', color: 'rgb(126, 119, 119)' },
    { text: 'VIDEO GAMES QUIZ', color: 'rgba(128, 14, 160, 0.925)' },
    { text: 'SCIENCE QUIZ', color: 'rgb(28, 182, 28)' },
];

function Slider(){
    const [currentSlide, setCurrentSlide] = useState(0);
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 8000);
      return () => clearInterval(timer);
    }, []);
    return(
        <div className="slider" style={{ backgroundColor: slides[currentSlide].color }}>
      <h2>{slides[currentSlide].text}</h2>
    </div>
    );
}
export default Slider