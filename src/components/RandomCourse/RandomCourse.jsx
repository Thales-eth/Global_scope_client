import CourseService from "../../services/courses.services"
import { useState, useEffect, useContext } from "react"
import { Card, Button } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"
import userService from "../../services/user.services"
import dots from './../../assets/dots.png'

const RandomCourse = () => {

    const [randomCourse, setRandomCourse] = useState({})

    const { _id, coursename, programlanguage, } = randomCourse

    const { user } = useContext(AuthContext)

    const navigate = useNavigate()

    useEffect(() => {
        loadRandomCourse()
    }, [])

    const loadRandomCourse = () => {
        CourseService
            .getRandomCourse()
            .then(({ data }) => setRandomCourse(data))
            .catch(err => console.log(err))
    }

    const enrollUser = (course_id) => {
        console.log('-----------', user._id)
        console.log('CURSO--------', course_id)

        userService
            .editUser(user._id, { $addToSet: { courses: course_id } })
            .then(() => navigate('/my-profile'))
            .catch(e => console.log(e))
    }

    return (

        <Card style={{ width: '18rem' }}>
            <Link to={`/catalog/${_id}`}> <Card.Body>
                <Card.Title>{coursename}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted"><i>{programlanguage}</i></Card.Subtitle>
                <Button onClick={() => enrollUser(_id)} variant="dark">Enroll</Button>
                <img className="dots" src={dots} alt="dots" />
            </Card.Body>
            </Link>
        </Card>

    )
}

export default RandomCourse