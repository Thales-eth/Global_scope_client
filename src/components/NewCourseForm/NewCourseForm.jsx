import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { useState } from "react"
import CourseService from '../../services/courses.services'
import { useNavigate } from 'react-router-dom'
import TextEditor from '../TextEditor/TextEditor'


const NewCourseForm = () => {

    const navigate = useNavigate()

    const fireFinalActions = () => {
        navigate('/')
    }

    const [courseData, setCourseData] = useState({
        coursename: '',
        description: '',
        programlanguage: '',
        subject: '',
        theory: {},
        test: '',
        katas: '',
        video: '',
        resources: '',
        certificate: '',
    })

    const handleChange = e => {
        const { value, name } = e.target
        setCourseData({ ...courseData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        CourseService
            .saveCourse(courseData)
            .then(() => {
                console.log(courseData)
                fireFinalActions()
            })
            .catch(ERR => console.error(ERR))
    }

    const TextContent = content => {
    }

    const imhere = content => {
        console.log('ESTOY EN EL PADRE', content)
        setCourseData({ ...courseData, theory: content })
        console.log('DATOS: ', courseData)

    }

    const { coursename, description, programlanguage, subject, theory, test, katas, video, resources, certificate } = courseData

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Coursename</Form.Label>
                            <Form.Control type="text" value={coursename} onChange={handleChange} name="coursename" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={description} onChange={handleChange} name="description" />
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="inversions">
                                    <Form.Label>Programming Language</Form.Label>
                                    <Form.Control type="text" value={programlanguage} onChange={handleChange} name="programlanguage" />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3" controlId="length">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control type="text" value={subject} onChange={handleChange} name="subject" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="imageUrl">
                            <Form.Label>Theory</Form.Label>
                            <TextEditor fatherState={imhere} />
                            {/* <Form.Control type="text" value={theory} onChange={handleChange} name="theory" /> */}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="imageUrl">
                            <Form.Label>Test</Form.Label>
                            <Form.Control type="text" value={test} onChange={handleChange} name="test" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="imageUrl">
                            <Form.Label>Katas</Form.Label>
                            <Form.Control type="text" value={katas} onChange={handleChange} name="katas" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="imageUrl">
                            <Form.Label>Video</Form.Label>
                            <Form.Control type="text" value={video} onChange={handleChange} name="video" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="imageUrl">
                            <Form.Label>Resources</Form.Label>
                            <Form.Control type="text" value={resources} onChange={handleChange} name="resources" />
                        </Form.Group>

                        {/* <Form.Group className="mb-3" controlId="imageUrl">
                <Form.Label>Theory</Form.Label>
                <Form.Control type="text" value={theory} onChange={handleChange} name="theory" />
            </Form.Group> */}
                        {/* CHANGE CHECKBOX */}
                        <Form.Group className="mb-3" controlId="imageUrl">
                            <Form.Label>certificate</Form.Label>
                            <Form.Control type="text" value={certificate} onChange={handleChange} name="certificate" />
                        </Form.Group>

                        {/* <Form.Group className="mb-3" controlId="imageUrl">
                <Form.Label>Theory</Form.Label>
                <TextEditor type="text" value={editor} onChange={handleChange} name="editor" />
            </Form.Group> */}



                        <div className="d-grid">
                            <Button variant="dark" type="submit">Create a new Course!</Button>
                        </div>

                    </Form>
                </Col>
            </Row>
        </Container >
    )
}

export default NewCourseForm