import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import kataService from "../../services/kata.services"

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
                        <img className="dots" src="https://res.cloudinary.com/dqwiiycdv/image/upload/v1658999801/dots_i7t9iu.png" alt="dots" />
                    </Card.Body>
                </Link>
            </Card>
        </div>
    )
}

export default RandomKata