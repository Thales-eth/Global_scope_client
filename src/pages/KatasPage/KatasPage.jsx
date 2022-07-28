import React, { useState, useEffect } from 'react';
import kataService from '../../services/kata.services';
import { Link, useNavigate } from "react-router-dom"
import { Card, Button } from 'react-bootstrap'
import Loader from "../../components/Loader/Loader"
import './KatasPage.css'

const KatasPage = () => {

    const [isLoading, setIsLoading] = useState(true)

    const [katas, setKatas] = useState([])

    useEffect(() => {
        loadKatas()
    }, [])

    const loadKatas = () => {
        kataService
            .getAllKatas()
            .then(({ data }) => {
                setKatas(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    let difficultyLvl = ''

    return (
        isLoading ? <Loader />
            :
            <div className="katasPage">
                <h1 className="title mb-5 mt-3">Choose your kata!:</h1>
                <div className="kataCluster">
                    {
                        katas.map(e => {

                            switch (e.difficulty) {
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

                                case '5':
                                    difficultyLvl = '🔥🔥🔥🔥🔥'
                                    break;
                            }

                            return (
                                <>
                                    <Card key={e._id} style={{ width: '18rem' }}>
                                        <Link to={`/katas/${e._id}`}>
                                            <Card.Body>
                                                <Card.Title>{e.title}</Card.Title>
                                                <p>Difficulty:{difficultyLvl}</p>
                                                <Link to={`/katas/${e._id}`}><Button variant="dark">Code</Button></Link>
                                                <img className="dots" src="https://res.cloudinary.com/dqwiiycdv/image/upload/v1658999801/dots_i7t9iu.png" alt="dots" />
                                            </Card.Body>
                                        </Link>
                                    </Card>
                                </>
                            )
                        })
                    }
                </div>
            </div >
    )

}

export default KatasPage
