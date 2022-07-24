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
        let cosa = ''
        console.log(text)
        if (text.inlineStyleRanges.length === 0) {
            text.type === 'header-one' ? style = `<h1>${text.text}</h1>` : style += ''
            text.type === 'header-two' ? style += `<h2>${text.text}</h2>` : style += ''
            text.type === 'header-three' ? style = `<h3>${text.text}</h3>` : style += ''
        }
        else {
            text.inlineStyleRanges.forEach(elem => {
                //CAMBIAR POR UN SWITCH
                const endSlice = elem.length + elem.offset - 1

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