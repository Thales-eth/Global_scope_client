import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { Button, Container, Row, Col } from 'react-bootstrap'
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
                setUserData(data)
            })
            .catch(err => console.log(err))
    }, [])

    const { avatar, username, email, _id } = userData

    return (
        <>
            <div className="profilePage">
                <Container>
                    <Row>
                        <Col md={{ span: 7 }}>
                            <img className="mainPic" src={avatar} alt="profile pic" />
                            <hr />
                            <h1>Welcome to your profile: {username}!</h1>
                            <hr />
                            <p>📧 This is your mail: <b>{email}</b></p>
                            <hr />
                            <h3 className="mt-4">My courses:</h3>
                            {
                                enrolledCourses.map((e, i) => {
                                    return (

                                        enrolledCourses.length > 0 && <Link to={`/catalog/${e._id}`}><p>{enrolledCourses[i].coursename}</p></Link>

                                    )
                                })
                            }
                            <hr />
                            <Link to={'/my-profile/edit'}><button className="editProfileBtn">Edit Profile</button></Link>
                        </Col>


                        <Col md={{ span: 3 }}>

                            <div className="recommendationDiv">

                                <h2>Recommended:</h2>
                                <RandomKata />

                                <RandomCourse />

                            </div>

                        </Col>

                    </Row>

                </Container>
            </div >
        </>
    )
}

export default MyProfilePage