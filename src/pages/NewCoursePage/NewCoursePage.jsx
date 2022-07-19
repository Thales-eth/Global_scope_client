import NewCourseForm from "../../components/NewCourseForm/NewCourseForm"

import TextEditor from "../../components/TextEditor/TextEditor"
import '../../../node_modules/draft-js/dist/Draft.css'
const NewCoursePage = () => {
    return (
        <>
            <h1>NEW COURSE PAGE BELLA</h1>
            <NewCourseForm />

            <TextEditor />
        </>
    )
}

export default NewCoursePage