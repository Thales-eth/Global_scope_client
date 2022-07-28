import CourseService from "../../services/courses.services"
import { useState, useEffect, useContext } from "react"
import { Card, Button } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"
import userService from "../../services/user.services"

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

        userService
            .editUser(user._id, { $addToSet: { courses: course_id } })
            .then(() => navigate('/my-profile'))
            .catch(e => console.log(e))
    }

    return (

        <Card style={{ width: '18rem' }}>
            <Link to={`/catalog/${_id}`}> <Card.Body>
                <Card.Title>{coursename}</Card.Title>
                {
                    programlanguage === 'JavaScript' ?
                        <img className="miniLogo mt-3" src="https://res.cloudinary.com/dqwiiycdv/image/upload/v1658736331/js_mcgdil.png" alt="logo" />
                        : <></>
                }
                {
                    programlanguage === 'Python' ?
                        <img className="miniLogo mt-3" src="https://res.cloudinary.com/dqwiiycdv/image/upload/v1658736342/python_zyk0je.png" alt="logo" />
                        : <></>
                }
                {
                    programlanguage === 'React' ?
                        <img className="miniLogo mt-3" src="https://res.cloudinary.com/dqwiiycdv/image/upload/v1659022207/800px-React_emwdeu.png" alt="logo" />
                        : <></>
                }

                <Card.Subtitle className="mb-2 text-muted"><i>{programlanguage}</i></Card.Subtitle>
                <Button onClick={() => enrollUser(_id)} variant="dark">Enroll</Button>
                <img className="dots" src="https://res.cloudinary.com/dqwiiycdv/image/upload/v1658999801/dots_i7t9iu.png" alt="dots" />
            </Card.Body>
            </Link>
        </Card>

    )
}

export default RandomCourse