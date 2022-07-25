import { useState, useEffect, useContext } from "react"
import CourseService from "../../services/courses.services"
import { Link, useNavigate } from "react-router-dom"
import { Card, Button } from 'react-bootstrap'
import Loader from "../../components/Loader/Loader"
import userService from "../../services/user.services"
import { AuthContext } from "../../contexts/auth.context"
import './CatalogPage.css'

const Catalog = () => {

    const [courses, setCourses] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    const { user } = useContext(AuthContext)

    const navigate = useNavigate()

    useEffect(() => {
        loadCourses()
    }, [])

    const loadCourses = () => {
        CourseService
            .getCourses()
            .then(({ data }) => {
                setCourses(data)
                setIsLoading(false)
            })
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

    // INTENTO DE REFACTORIZACIÓN FALLIDA
    // const enrollUser = (course_id) => {
    //     userService
    //         .enrollUser(course_id)
    //         .then(() => navigate('/my-profile'))
    //         .catch(e => console.log(e))
    // }

    return (

        isLoading ? <Loader />
            :
            <>
                <div className="CatalogPage">
                    <h1 className="title mb-5">All our courses:</h1>
                    <div className="courseCluster">
                        {
                            courses.map(e => {
                                return (
                                    <>
                                        <Card key={e._id} style={{ width: '18rem' }}>
                                            <Card.Body>
                                                <Card.Title>Course Title</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                                <Link to={`/catalog/${e._id}`}> <p>{e.coursename}</p></Link>
                                                <Button onClick={() => enrollUser(e._id)} variant="dark">Enroll</Button>
                                            </Card.Body>
                                        </Card>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>

            </>
    )
}

export default Catalog