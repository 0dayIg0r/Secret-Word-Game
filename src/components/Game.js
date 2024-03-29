import './Game.css'

import React, { useState, useRef, useEffect } from 'react'

const Game = ({
    verifyLetter,
    pickedWord,
    pickedCategory,
    letters,
    letterTip,
    tipChance,
    usedTips,
    pickRandomLetterTips,
    guessedLetters,
    wrongLetters,
    guesses,
    score }) => {
    const [letter, setLetter] = useState('')



    const letterInputRef = useRef(null)


    const handleSubmit = (e) => {
        e.preventDefault()

        verifyLetter(letter)

        setLetter('')

        letterInputRef.current.focus()
    }



    return (
        <div className="game">
            <p className="points">
                <span>Pontuação: {score}</span>
            </p>

            <h1>Adivinhe a palavra:</h1>
            <h3 className="tip">
                Dica sobre a palavra: <span>{pickedCategory}</span>
            </h3>
            <p>Você ainda tem {guesses} tentaiva(s)</p>
            <div className="wordContainer">
                {letters.map((letter, i) => (
                    guessedLetters.includes(letter) ? (
                        <span className="letter" key={i}>
                            {letter}
                        </span>
                    ) : (
                        <span className="blankSquare" key={i}>

                        </span>
                    )
                ))}
            </div>
            <div className="letterContainer">
                <p>Tente adivinhar uma letra da palavra</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="letter"
                        maxLength='1'
                        required
                        onChange={(e) => setLetter(e.target.value)}
                        value={letter}
                        ref={letterInputRef} />
                    <button>Jogar!</button>

                </form>

            </div>
            <div className="wrongLettersContainer">
                <p>Letras já utilizadas:</p>
                {wrongLetters.map((letter, i) => (
                    <span key={i}>
                        {letter}
                    </span>
                ))}
            </div>

            <div className='tipContent'>
                <div onClick={pickRandomLetterTips}>
                    <span>Você pode revelar {tipChance} letras(s)</span>
                </div>
                {letterTip && letterTip.map((l, i) => (
                    <span>
                        {l}
                    </span>
                ))}

            </div>

        </div>
    )
}

export default Game