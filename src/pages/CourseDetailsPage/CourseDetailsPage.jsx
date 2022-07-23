import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
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
        console.log('not yet')
        CourseService
            .getOneCourse(catalog_id)
            .then(({ data }) => {
                setCourse(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const readStyles = (text) => {
        let style = ''
        text.inlineStyleRanges.length === 0 ?
            style = ''
            :
            text.inlineStyleRanges.forEach(elem => {
                //CAMBIAR POR UN SWITCH
                elem.style === 'BOLD' ? style += `<b>${text.text.slice(elem.offset, (elem.length + elem.offset))}</b>` : style += ``
                elem.style === 'ITALIC' ? style += `<i>${text.text.slice(elem.offset, (elem.length + elem.offset))}</i>` : style += ``
                elem.style === 'UNDERLINE' ? style += `<u>${text.text.slice(elem.offset, (elem.length + elem.offset))}</u>` : style += ``
            })

        return <div dangerouslySetInnerHTML={{ __html: style }} />
    }

    const { coursename, description, programlanguage, subject, theory, test, katas, video, resources, certificate } = course

    return (

        isLoading ? <Loader />
            :
            <>

                <h1>Course Details:</h1>
                <p>{coursename}</p>
                <p>{description}</p>
                <p>{programlanguage}</p>
                <p>{subject}</p>

                {
                    theory.map(e => {
                        return readStyles(e)
                    })
                }
                <p>{test}</p>
                <p>{katas}</p>
                <p>{video}</p>
                <p>{resources}</p>
                <p>{certificate}</p>
            </>
    )
}

export default CourseDetailsPage