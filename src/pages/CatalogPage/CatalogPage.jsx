import { useEffect } from "react"
import { useState } from "react"
import CourseService from "../../services/courses.services"
import { Link } from "react-router-dom"
import { Card, Button } from 'react-bootstrap'
import MyEditor from "../../components/TextEditor/TextEditor"
import './CatalogPage.css'

const Catalog = () => {

    const [courses, setCourses] = useState([])

    useEffect(() => {
        loadCourses()
    }, [])

    const loadCourses = () => {
        CourseService
            .getCourses()
            .then(({ data }) => {
                console.log('ESTOS SON LO CURSOS:', data)
                setCourses(data)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className="CatalogPage">
                <h1 className="title">LOS CURSITOS:</h1>
                <div className="courseCluster">
                    {
                        courses.map(e => {
                            return (
                                <>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Body>
                                            <Card.Title>Course Title</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                            <Link to={`/catalog/${e._id}`}> <p>{e.coursename}</p></Link>
                                            {/* <Button onClick={ } variant="dark">Enroll</Button> */}
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