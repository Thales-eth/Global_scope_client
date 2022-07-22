import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CourseService from "../../services/courses.services"
import Loader from "../../components/Loader/Loader"

const CourseDetailsPage = () => {

    const { id } = useParams()

    const [course, setCourse] = useState([])
    // const [isLoading, setIsLoadin] = useState(true)

    useEffect(() => {
        loadCourse()
    }, [])

    const loadCourse = () => {

        CourseService
            .getOneCourse(id)
            .then(({ data }) => {
                setCourse(data)

            })
            .catch(err => console.log(err))
    }

    const { coursename, description, programlanguage, subject, theory, test, katas, video, resources, certificate } = course
    return (

        course.length === 0 ? console.log('mientras carga', course)
            :
            <>

                <h1>Course Details:</h1>
                <p>{coursename}</p>
                <p>{description}</p>
                <p>{programlanguage}</p>
                <p>{subject}</p>

                {/* {
                    theory.map(e => {
                        return <p>{e.text}</p>
                    })
                } */}
                <p>{test}</p>
                <p>{katas}</p>
                <p>{video}</p>
                <p>{resources}</p>
                <p>{certificate}</p>
            </>
    )
}

export default CourseDetailsPage