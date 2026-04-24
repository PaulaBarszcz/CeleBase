import { useState, useEffect, useRef } from 'react'
import actors from '../data/actors.js'

const males = actors.filter(a => a.gender === 'male')
const females = actors.filter(a => a.gender === 'female')

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickOptions(correct, pool) {
  const others = shuffle(pool.filter(a => a.id !== correct.id)).slice(0, 3)
  return shuffle([correct, ...others])
}

function QuizAnswersGame() {
  const [started, setStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [points, setPoints] = useState(0)
  const [timeLeft, setTimeLeft] = useState(9)
  const [asked, setAsked] = useState([])
  const [current, setCurrent] = useState(null)
  const [options, setOptions] = useState([])
  const [imgLoaded, setImgLoaded] = useState(false)
  const timerRef = useRef(null)

  const totalActors = males.length + females.length

  const pickNext = (askedSoFar) => {
    const remaining = actors.filter(a => !askedSoFar.includes(a.id))
    if (remaining.length === 0) return null
    return remaining[Math.floor(Math.random() * remaining.length)]
  }

  const startRound = (actor, askedSoFar) => {
    const pool = actor.gender === 'male' ? males : females
    setOptions(pickOptions(actor, pool))
    setAsked(askedSoFar)
    setCurrent(actor)
    setTimeLeft(9)
    setImgLoaded(false)
  }

  const beginGame = () => {
    clearInterval(timerRef.current)
    const actor = pickNext([])
    startRound(actor, [actor.id])
    setPoints(0)
    setGameOver(false)
    setGameWon(false)
    setStarted(true)
  }

  useEffect(() => {
    if (!started || gameOver) return
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          setGameOver(true)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [current, started, gameOver])

  const handleAnswer = (actor) => {
    if (gameOver) return
    if (actor.surname === current.surname) {
      clearInterval(timerRef.current)
      const newAsked = [...asked, ...actors.filter(a => !asked.includes(a.id) && a.id !== actor.id).map(() => null)].filter(Boolean)
      const nextAsked = [...asked]
      const nextActor = pickNext(nextAsked)
      if (!nextActor || asked.length >= totalActors - 1) {
        setPoints(p => p + 1)
        setGameOver(true)
        setGameWon(true)
        return
      }
      const newAskedList = [...asked, nextActor.id]
      setPoints(p => p + 1)
      startRound(nextActor, newAskedList)
    } else {
      clearInterval(timerRef.current)
      setGameOver(true)
    }
  }

  const overlayStyle = gameOver
    ? { display: 'block', backgroundColor: gameWon ? 'rgba(20,142,1,0.5)' : 'rgba(180,0,0,0.5)' }
    : { display: 'none' }

  return (
    <div>
      <div className="quiz" id="quiz">
        <div>
          {!started && <div className="quizInfo">Who is in the picture? You have 9 seconds to decide.</div>}
          <br /><br />
          <div className="quizPoints">Points: {points}</div>
          <div className="quizTime">Time left: 00:0{timeLeft}</div>
          <button className="startButton" onClick={beginGame}>START</button>
          {started && current && (
            <div className="flexi">
              <div className="cover">
                <div className="coverRed" style={overlayStyle}>
                  <p>{gameWon ? 'CONGRATS!' : 'GAME OVER'}<br /><br />
                    <span>Points gained: {points}</span>
                  </p>
                </div>
                {!imgLoaded && <img src={`${import.meta.env.BASE_URL}images/spinner.gif`} alt="loading" />}
                <img
                  className="quizImg"
                  src={current.photo}
                  alt="guess who"
                  style={imgLoaded ? {} : { display: 'none' }}
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgLoaded(true)}
                />
              </div>
              <div className="quiz-text">
                {options.map(a => (
                  <p key={a.id} onClick={() => handleAnswer(a)}>{a.name} {a.surname}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Quiz() {
  return (
    <div className="container">
      <QuizAnswersGame />
    </div>
  )
}

export { Quiz }
