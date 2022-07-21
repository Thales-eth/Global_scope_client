import NewCourseForm from "../../components/NewCourseForm/NewCourseForm"
import TextEditor from "../../components/TextEditor/TextEditor"
import '../../../node_modules/draft-js/dist/Draft.css'
import './NewCoursePage.css'
const NewCoursePage = () => {
    return (
        <>
            <div className="NewCoursePage">
                <h1>NEW COURSE PAGE BELLA</h1>
                <NewCourseForm />
            </div>
        </>
    )
}

export default NewCoursePage