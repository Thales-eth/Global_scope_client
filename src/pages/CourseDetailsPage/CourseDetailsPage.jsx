import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
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

    const readStyles = (text) => {
        let style = text.text
        console.log(text)
        if (text.inlineStyleRanges.length === 0) {
            text.type === 'header-one' ? style = `<h1>${text.text}</h1>` : style += ''
            text.type === 'header-two' ? style += `<h2>${text.text}</h2>` : style += ''
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
            })
        }

        return <div dangerouslySetInnerHTML={{ __html: style }} />
    }

    const { coursename, description, programlanguage, subject, theory, test, katas, video, resources, certificate } = course

    return (

        isLoading ? <Loader />
            :
            <>
                <Container className="details">

                    <h1>Course Details:</h1>
                    <Row className="topPage">
                        <Col md={{ span: 2, offset: 0 }}>
                            <p><b>{coursename}</b></p>
                        </Col>
                        <Col md={{ span: 1, offset: 0 }}>
                            <p>{programlanguage}</p>

                        </Col>
                        <Col md={{ span: 6, offset: 0 }}>
                            <p>{description}</p>
                        </Col>
                        <Col md={{ span: 3, offset: 0 }}>
                            <p>{subject}</p>

                        </Col>
                    </Row>
                    <hr />
                    {
                        theory.map(e => {
                            return readStyles(e)
                        })
                    }
                    <p>{test}</p>
                    {/* <iframe src="https://codesandbox.io/embed/boring-rosalind-51d51p?fontsize=14&hidenavigation=1&theme=dark"  title="boring-rosalind-51d51p" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe> */}
                    <iframe
                        src={katas}
                        className="sand" title="boring-rosalind-51d51p"
                        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
                    <p>{video}</p>

                    <video autoPlay muted loop className="courseVideo">
                        <source src={`${video}`} />
                    </video>

                    <p>{resources}</p>
                    <p>{certificate}</p>
                </Container>
            </>
    )
}

export default CourseDetailsPage