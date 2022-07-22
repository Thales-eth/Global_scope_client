import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './MyProfilePage.css'
import CourseService from "../../services/courses.services" // Find course by id -> insert enrolled courses



// const { avatar, username, email } = userData

const MyProfilePage = () => {

    const { user } = useContext(AuthContext)

    const { avatar, username, email, _id } = user

    console.log('ESTE ES EL USER', user)

    const [userData, setuserData] = useState()

    const loadUser = () => {
        userService
            .getUser(user._id)
            .then(({ data }) => setuserData(data))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        loadUser()
    }, [userData]);

    return (
        <>
            <div className="profilePage">
                <img src={avatar} alt="pepe pic" />
                <h1>Welcome to your profile: {username}!</h1>
                <p>📧 This is your mail: <b>{email}</b></p>
                <Link to={'/my-profile/edit'}><Button variant="dark">Edit Profile</Button></Link>
                <h5>My courses:</h5>
                <p></p>
            </div>
        </>
    )
}

export default MyProfilePage