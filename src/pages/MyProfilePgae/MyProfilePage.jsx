import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { Button, Card, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './MyProfilePage.css'
import userService from "../../services/user.services"
import RandomKata from "../../components/RandomKata/RandomKata"
import RandomCourse from "../../components/RandomCourse/RandomCourse"

const MyProfilePage = () => {

    const { user } = useContext(AuthContext)

    const [enrolledCourses, setEnrolledCourses] = useState([])
    const [userData, setUserData] = useState(user)

    useEffect(() => {
        userService
            .getUser(_id)
            .then(({ data }) => {
                setEnrolledCourses(data.courses)
                console.log('USUARIO', data)
                setUserData(data)
            })
            .catch(err => console.log(err))
    }, [])

    const { avatar, username, email, _id } = userData

    return (
        <>
            <div className="profilePage">
                <img src={avatar} alt="pepe pic" />
                <h1>Welcome to your profile: {username}!</h1>
                <p>📧 This is your mail: <b>{email}</b></p>
                <Link to={'/my-profile/edit'}><Button variant="dark">Edit Profile</Button></Link>
                <h5>My courses:</h5>
                {
                    enrolledCourses.map((e, i) => {
                        return (

                            enrolledCourses.length > 0 && <Link to={`/catalog/${e._id}`}><p>{enrolledCourses[i].coursename}</p></Link>

                        )
                    })
                }
                <div className="recommendationDiv">
                    <Row>
                        <Col>
                            <h3>Try out this kata!:</h3>
                            <RandomKata />
                        </Col>

                        <Col>
                            <h3>You might enjoy this course!:</h3>
                            <RandomCourse />
                        </Col>
                    </Row>
                </div>
            </div >
        </>
    )
}

export default MyProfilePage