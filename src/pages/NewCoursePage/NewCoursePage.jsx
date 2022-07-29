import './NewCoursePage.css'
import NewCourseForm from "../../components/NewCourseForm/NewCourseForm"

const NewCoursePage = () => {

    return (
        <div className="NewCoursePage">
            <h1 className='mb-5'>Create a new Course!</h1>
            <NewCourseForm />
        </div>
    )
}

export default NewCoursePage