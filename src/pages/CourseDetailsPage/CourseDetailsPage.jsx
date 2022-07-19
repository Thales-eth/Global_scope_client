import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import CourseService from "../../services/courses.services"

const CourseDetailsPage = () => {

    const { id } = useParams()

    const [course, setCourse] = useState('')

    useEffect(() => {
        loadCourse()
    }, [])

    const loadCourse = () => {
        CourseService
            .getOneCourse(id)
            .then(({ data }) => {
                console.log(data)
                setCourse(data)
            })
            .catch(err => console.log(err))
    }

    const { coursename, description, programlanguage, subject, theory, test, katas, video, resources, certificate } = course

    return (
        <>
            <h1>Course Details:</h1>
            <p>{coursename}</p>
            <p>{description}</p>
            <p>{programlanguage}</p>
            <p>{subject}</p>
            <p>{theory}</p>
            <p>{test}</p>
            <p>{katas}</p>
            <p>{video}</p>
            <p>{resources}</p>
            <p>{certificate}</p>
        </>
    )
}

export default CourseDetailsPage