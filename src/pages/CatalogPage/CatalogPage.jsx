import { useState, useEffect, useContext } from "react"
import CourseService from "../../services/courses.services"
import { Link, useNavigate } from "react-router-dom"
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import Loader from "../../components/Loader/Loader"
import userService from "../../services/user.services"
import { AuthContext } from "../../contexts/auth.context"
import './CatalogPage.css'
import RandomKata from "../../components/RandomKata/RandomKata"
import RandomCourse from "../../components/RandomCourse/RandomCourse"

const Catalog = () => {

    const [courses, setCourses] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    const [isAdmin, setIsAdmin] = useState(false)

    const { user, authenticateUser } = useContext(AuthContext)

    const [loggedUser, setloggedUser] = useState(user)


    const navigate = useNavigate()

    useEffect(() => {
        loadCourses()
        user !== null ?
            userService
                .getUser(user._id)
                .then(({ data }) => {
                    console.log('------usuario-----', data)
                    data.role === 'ADMIN' ? setIsAdmin(true) : setIsAdmin(false)
                })
                .catch(err => console.error(err))

            : console.log('USERDATA', user)
    }, [user])

    const loadCourses = () => {
        CourseService
            .getCourses()
            .then(({ data }) => {
                setCourses(data)
                setIsLoading(false)
                user.role === 'ADMIN' ? setIsAdmin(true) : setIsAdmin(false)
            })
            .catch(err => console.log(err))
    }

    const enrollUser = (course_id) => {

        userService
            .editUser(user._id, { $addToSet: { courses: course_id } })
            .then(() => navigate('/my-profile'))
            .catch(e => console.log(e))
    }

    return (

        isLoading ? <Loader />
            :
            <div>
                <div className="CatalogPage">
                    <h1 className="title mb-5">Our courses:</h1>
                    {/* <hr /> */}
                    {isAdmin ? <Link to={`/new-course`}><p>Create a new course</p></Link> : <></>}

                    <div className="courseCluster">
                        {
                            courses.map(e => {
                                return (
                                    <>
                                        <Card key={e._id} style={{ width: '18rem' }}>
                                            <Link to={`/catalog/${e._id}`}> <Card.Body>
                                                <Card.Title>Course Title</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted"><i>{e.programlanguage}</i></Card.Subtitle>
                                                <p>{e.coursename}</p>
                                                <Button onClick={() => enrollUser(e._id)} variant="dark">Enroll</Button>
                                                <img className="dots" src="https://res.cloudinary.com/dqwiiycdv/image/upload/v1658999801/dots_i7t9iu.png" alt="dots" />
                                            </Card.Body>
                                            </Link>
                                        </Card>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
                <hr />
                <Container>
                    <Row>
                        <Col md={{ span: 6 }}>
                            <h3 className="mt-5">Try something new!:</h3>
                            <RandomKata />
                            <h3>Here's a course you might enjoy!:</h3>
                            <RandomCourse />
                        </Col>
                    </Row>
                </Container>
            </div>

    )
}

export default Catalog