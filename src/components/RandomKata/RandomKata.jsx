import { useEffect } from "react"
import kataService from "../../services/kata.services"
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from "react"

const RandomKata = () => {

    const [randomKata, setRandomKata] = useState('')

    const { title, difficulty, _id: kataID } = randomKata

    let difficultyLvl = ''

    switch (difficulty) {
        case '1':
            difficultyLvl = '🔥'
            break;

        case '2':
            difficultyLvl = '🔥🔥'
            break;

        case '3':
            difficultyLvl = '🔥🔥🔥'

            break;

        case '4':
            difficultyLvl = '🔥🔥🔥🔥'
            break;
    }

    useEffect(() => {
        loadRandomKata()
    }, [])

    const loadRandomKata = () => {
        kataService
            .randomKata()
            .then(({ data }) => setRandomKata(data))
            .catch(err => console.log(err))
    }

    return (
        <div className="recommendedKata">
            <Card style={{ width: '18rem' }}>
                <Link to={`/katas/${kataID}`}>
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <p>{difficultyLvl}</p>
                        <Link to={`/katas/${kataID}`}><Button variant="dark">Code</Button></Link>
                        <img className="dots" src={dots} alt="dots" />
                    </Card.Body>
                </Link>
            </Card>
        </div>
    )
}

export default RandomKata