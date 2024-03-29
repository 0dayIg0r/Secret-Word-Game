import './App.css';
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'
import worldsList from './data/words'
import { useCallBack, useEffect, useState } from 'react'

const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' }

]
const guessQty = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(worldsList)

  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickCategory] = useState('')
  const [letters, setLetters] = useState([])


  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessQty)
  const [score, setScore] = useState(0)


  const [letterTip, setLetterTip] = useState([])
  const [tipChance, setTipChance] = useState(2)
  const [usedTips, setUsedTips] = useState()
  console.log(guessedLetters)

  const pickRandomLetterTips = () => {
    const randomLetter = pickedWord.charAt(Math.floor(Math.random() * pickedWord.length)).toLowerCase()



    if (letterTip.includes(randomLetter)) {
      return
    } else if (guessedLetters.includes(randomLetter)) {
      return
    } else {
      letterTip.push(randomLetter)

      setTipChance(tipChance - 1)
    }

    if (tipChance === 0) {
      setTipChance(0)
    }


  }


  useEffect(() => {
    if (tipChance < 2) {
      setUsedTips(letterTip)
    }
  }, [tipChance])


  const pickWordAndCategory = () => {
    // pick a random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    // pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return { word, category }
  }


  //  starts the secret word game
  const startGame = () => {
    // clear all letters
    clearLetterStates()

    // pick word and category
    const { word, category } = pickWordAndCategory()

    let wordLetters = word.split('')
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    // fill states
    setPickedWord(word)
    setPickCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }


  // process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    // check if letter has already been utilized
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return
    }
    // push guessed letter or remove a guess
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ])
      setGuesses((actualGuesses) => actualGuesses - 1)
    }

  }
  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
    setLetterTip([])
    setTipChance(2)
  }

  // check if guesses ended
  useEffect(() => {
    if (guesses <= 0) {
      // reset all states
      clearLetterStates()

      setGameStage(stages[2].name)
    }
  }, [guesses])


  // check win codition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]

    // win codition
    if (guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {

      //add score
      setScore((actualScore) => (actualScore += 100))

      // restart game with new word
      startGame()


    }
  }, [guessedLetters, letters, startGame])

  //  restart the game
  const retry = () => {
    setScore(0)
    setGuesses(guessQty)
    setGameStage(stages[0].name)
  }

  return (
    <div className='App'>
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' &&
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          letterTip={letterTip}
          tipChance={tipChance}
          usedTips={usedTips}
          pickRandomLetterTips={pickRandomLetterTips}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      }
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  )
}

export default App;
