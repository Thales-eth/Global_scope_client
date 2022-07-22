import { useState, useEffect, useState } from "react"
import CourseService from "../../services/courses.services"
import { Link, useNavigate } from "react-router-dom"
import { Card, Button } from 'react-bootstrap'
import userService from "../../services/user.services"
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

    const enrollUser = (id) => {
        userService
            .editUser(user._id, { $addToSet: { courses: id } })
            .then(() => navigate('/my-profile'))
            .catch(e => console.log(e))
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