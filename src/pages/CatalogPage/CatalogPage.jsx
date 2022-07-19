import { useEffect } from "react"
import { useState } from "react"
import CourseService from "../../services/courses.services"
import { Link } from "react-router-dom"
import MyEditor from "../../components/TextEditor/TextEditor"

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
            <h1>LOS CURSITOS:</h1>
            {
                courses.map(e => {
                    return (
                        <Link to={`/catalog/${e._id}`}> <p>{e.coursename}</p></Link>
                    )
                })
            }

        </>
    )
}

export default Catalog