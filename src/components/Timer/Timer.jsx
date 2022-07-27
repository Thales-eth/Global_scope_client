import { useState, useEffect } from "react"
import './Timer.css'
import useSound from 'use-sound';
import timerSound from './../../assets/timerSound.mp3'

function Timer() {

    const [count, setCount] = useState(63)

    const audio = new Audio(timerSound);

    audio.loop = true;



    useEffect(() => {

        const id = setInterval(() => {
            setCount(prevCount => prevCount - 1);
        }, 1000)

        if (count === 0) {
            console.log('HOLA ENTRÉ')
            clearInterval(id)
        }

        return () => {
            clearInterval(id)

            document.title = 'Kata Rush'
        }

    }, [count])

    useEffect(() => {
        document.title = humanHour
    }, [count])



    let mins = (parseInt(count / 60))
    let realMins = mins % 60
    let realSecs = count % 60

    if (realSecs < 10) realSecs = `0${realSecs}`
    if (realMins < 10) realMins = `0${realMins}`

    let humanHour = `${realMins}:${realSecs}`

    let divStyle = ""

    if (count < 60) {
        divStyle = 'orangeBackground'
    }

    if (count === 59) {
        audio.play()
    }


    return (
        <div className={`Timer ${divStyle}`}>
            <h2>Timer</h2>

            <h3>{humanHour}</h3>
        </div>
    );
}

export default Timer;