import CourseService from "../../services/courses.services"
import { useState } from "react"
import { Card, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"

const RandomCourse = () => {

    const [randomCourse, setRandomCourse] = useState({})

    CourseService
        .getRandomCourse()
        .then(({ data }) => setRandomCourse(data))
        .catch(err => console.log(err))

    return (

        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Course Title</Card.Title>
                <Link>
                    <h1>I'm a random course</h1>
                </Link>

                <Link>
                    <p>{randomCourse.programlanguage}</p>
                </Link>

                <Link>
                    <p>{randomCourse.description}</p>
                </Link>

                <Button variant="dark">Enroll</Button>
            </Card.Body>
        </Card>

    )
}

export default RandomCourse