import { useState, useEffect } from "react"
import './Timer.css'

function Timer() {

    const [count, setCount] = useState(320)

    const [musicSound, setMusicSound] = useState(true)

    const audio = new Audio('https://res.cloudinary.com/dqwiiycdv/video/upload/v1658999802/timer_pw1mdi.mp3');

    const audioDefeat = new Audio('https://res.cloudinary.com/dqwiiycdv/video/upload/v1658999803/defeat_czqrmx.mp3');

    audioDefeat.muted = !musicSound

    audio.muted = !musicSound

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

    if (count === 24) {
        audio.play()
    }

    if (count === 0) {
        audio.pause()
        audioDefeat.play()
    }

    const pauseSounds = () => {
        setMusicSound(false)
        audio.pause()
    }

    const activateSound = () => {
        setMusicSound(true)
    }


    return (
        <div className={`Timer ${divStyle}`}>
            {

                musicSound ? <img onClick={pauseSounds} className="soundLogo" src="https://res.cloudinary.com/dqwiiycdv/image/upload/v1658999801/sound_bozcub.png" alt="sound" />
                    :
                    <img onClick={activateSound} className="soundLogo" src="https://res.cloudinary.com/dqwiiycdv/image/upload/v1658999801/muted_qefrtw.png" alt="sound" />

            }
            <h2 className="watchTime">{humanHour}</h2>
        </div>
    );
}

export default Timer;