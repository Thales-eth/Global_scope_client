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
                    <div className="courseCluster">
                        {
                            courses.map(e => {
                                return (
                                    <>
                                        <Card key={e._id} style={{ width: '18rem' }}>
                                            <Link to={`/catalog/${e._id}`}> <Card.Body>
                                                <Card.Title className="courseTitle">{e.coursename}</Card.Title>

                                                {
                                                    e.programlanguage === 'JavaScript' ?
                                                        <img className="miniLogo mt-3" src="https://res.cloudinary.com/dqwiiycdv/image/upload/v1658736331/js_mcgdil.png" alt="logo" />
                                                        : <></>
                                                }
                                                {
                                                    e.programlanguage === 'Python' ?
                                                        <img className="miniLogo mt-3" src="https://res.cloudinary.com/dqwiiycdv/image/upload/v1658736342/python_zyk0je.png" alt="logo" />
                                                        : <></>
                                                }
                                                {
                                                    e.programlanguage === 'React' ?
                                                        <img className="miniLogo mt-3" src="https://res.cloudinary.com/dqwiiycdv/image/upload/v1659022207/800px-React_emwdeu.png" alt="logo" />
                                                        : <></>
                                                }



                                                <Card.Subtitle className="mb-2 text-muted"><i>{e.programlanguage}</i></Card.Subtitle>
                                                <p>{e.subject}</p>
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
                    {isAdmin ? <Link to={`/new-course`}><button className="newCourse mt-5">Create a new course</button></Link> : <></>}
                </div>
            </div>

    )
}

export default Catalog