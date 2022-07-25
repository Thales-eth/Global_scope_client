import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './MyProfilePage.css'
import userService from "../../services/user.services"
import CourseService from "../../services/courses.services" // Find course by id -> insert enrolled courses
import RandomCourse from "../../components/RandomCourse/RandomCourse"


// const { avatar, username, email } = userData

const MyProfilePage = () => {

    const { user } = useContext(AuthContext)

    const { avatar, username, email, _id } = user

    const [enrolledCourses, setEnrolledCourses] = useState([])

    // const UserCoursesId = [...user.courses]
    useEffect(() => {
        userService
            .getUser(_id)
            .then(({ data }) => {
                setEnrolledCourses(data.courses)
                console.log('USUARIO', data)
            })
            .catch(err => console.log(err))
    }, [])



    console.log('------------------------------------', enrolledCourses)
    // for (let e of UserCoursesId) {
    //     CourseService
    //         .getOneCourse(...UserCoursesId)
    //         .then(({ data }) => {
    //             setEnrolledCourses(data.coursename)
    //         })
    //         .catch(e => console.log(e))
    // }


    return (
        <>
            <div className="profilePage">
                <img src={avatar} alt="pepe pic" />
                <h1>Welcome to your profile: {username}!</h1>
                <p>📧 This is your mail: <b>{email}</b></p>
                <Link to={'/my-profile/edit'}><Button variant="dark">Edit Profile</Button></Link>
                <h5>My courses:</h5>
                {
                    // THIS WORKS...KINDA
                    // enrolledCourses.length > 0 && <Link to={`/catalog/${UserCoursesId[0]}`}><p></p></Link>

                    // THIS DOESN'T QUITE WORK...

                }
                {
                    enrolledCourses.map((e, i) => {
                        return (

                            enrolledCourses.length > 0 && <Link to={`/catalog/${e._id[i]}`}><p>{enrolledCourses[i].coursename}</p></Link>

                        )
                    })
                }


            </div >
        </>
    )
}

export default MyProfilePage