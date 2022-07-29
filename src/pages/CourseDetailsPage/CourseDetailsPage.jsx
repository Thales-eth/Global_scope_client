import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap'
import CourseService from "../../services/courses.services"
import Loader from "../../components/Loader/Loader"
import 'draft-js/dist/Draft.css';
import './CourseDetailsPage.css'

const CourseDetailsPage = () => {

    const { catalog_id } = useParams()

    const [course, setCourse] = useState({})

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadCourse()
    }, [])

    const loadCourse = () => {
        CourseService
            .getOneCourse(catalog_id)
            .then(({ data }) => {
                setCourse(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const handleSubmit = e => {
        e.preventDefault()
    }

    const fireFinalActions = () => {
        loadCourse()
    }

    const readStyles = (text) => {
        let style = text.text
        console.log(text)
        if (text.inlineStyleRanges.length === 0) {
            text.type === 'header-one' ? style = `<h1>${text.text}</h1>` : style += ''
            text.type === 'header-two' ? style = `<h2>${text.text}</h2>` : style += ''
            text.type === 'header-three' ? style = `<h3>${text.text}</h3>` : style += ''
        }
        else {
            text.inlineStyleRanges.forEach(elem => {
                //CAMBIAR POR UN SWITCH
                const endSlice = elem.length + elem.offset

                if (elem.style === 'BOLD') {
                    style = style.replace(text.text.slice(elem.offset, endSlice),
                        `<b>${text.text.slice(elem.offset, endSlice)}</b>`)
                }
                if (elem.style === 'ITALIC') {
                    style = style.replace(text.text.slice(elem.offset, endSlice),
                        `<i>${text.text.slice(elem.offset, endSlice)}</i>`)
                }
                if (elem.style === 'UNDERLINE') {
                    style = style.replace(text.text.slice(elem.offset, endSlice),
                        `<u>${text.text.slice(elem.offset, endSlice)}</u>`)
                }
                if (elem.style === 'CODE') {
                    style = style.replace(text.text.slice(elem.offset, endSlice),
                        `<tt>${text.text.slice(elem.offset, endSlice)}</tt>`)
                }
            })
        }

        return <div dangerouslySetInnerHTML={{ __html: style }} />
    }

    const { coursename, description, programlanguage, subject, theory, test, katas, video, resources, certificate } = course

    return (

        isLoading ? <Loader />
            :
            <div className="details">
                <header className="courseHeader">
                    <Container>
                        <h1>{coursename}</h1>
                        <Row className="topPage">

                            <Col md={{ span: 6, offset: 3 }}>
                                <h5><b>Description:</b></h5>
                                <p>{description}</p>
                                <hr />
                            </Col>
                        </Row>

                        <Row>
                            <Col md={{ span: 6, offset: 3 }}>
                                <h5><b>Subject:</b></h5>
                                <p>{subject}</p>
                                <hr />
                            </Col>
                        </Row>

                    </Container>
                </header>


                <div className="mt-5 courseContent">
                    <Container>
                        <Row>
                            <Col md={{ span: 6, offset: 3 }}>
                                <section className="courseContent" >
                                    {
                                        theory.map(e => {
                                            return readStyles(e)
                                        })
                                    }

                                </section>
                            </Col>
                        </Row>
                    </Container>
                </div>


                <div className="courseTest mt-5">
                    <Container>
                        <h3 className="mb-5 testBox">Test what you have learned here!</h3>

                        <iframe
                            src="https://codesandbox.io/embed/boring-rosalind-51d51p?fontsize=14&hidenavigation=1&theme=dark"
                            className="sand" title="boring-rosalind-51d51p"
                            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid;
                         microphone; midi; payment; usb; vr; xr-spatial-tracking"
                            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
                    </Container>
                </div>

                <div className="videoContainer mt-5">
                    <Container>
                        <iframe width="560" height="315" className="courseVideo" src={video} title="YouTube video player"
                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                    </Container>
                </div>

            </div >
    )
}

export default CourseDetailsPage