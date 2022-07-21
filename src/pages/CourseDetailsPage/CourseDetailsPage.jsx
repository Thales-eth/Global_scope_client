import { useEffect } from "react"
import { useState } from "react"
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
                console.log('DATOS EN LOS DETALLES', data)

            })
            .catch(err => console.log(err))
    }

    const { coursename, description, programlanguage, subject, theory, test, katas, video, resources, certificate } = course
    //Mira en el apartado network como se hace la petición con theory correctamente
    return (

        console.log('CURSO ANTES DEL CONDICIONAL', course),

        course === [] ? <Loader />
            :
            <>
                {
                    console.log('DATOS EN LOS DETALLES DEL CURSO', course)

                }
                {
                    console.log('DATOS EN LOS DETALLES DEL CURSO', typeof course)
                }
                <h1>Course Details:</h1>
                <p>{coursename}</p>
                <p>{description}</p>
                <p>{programlanguage}</p>
                <p>{subject}</p>

                {/* {
                    { theory }.map(e => {
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