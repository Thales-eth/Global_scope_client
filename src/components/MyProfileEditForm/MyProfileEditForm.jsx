import { useContext, useState, useEffect } from "react"
import { Row, Col, Form, Button, Container } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../contexts/auth.context"
import authService from './../../services/auth.services'
import uploadServices from "./../../services/upload.services"
import userService from "../../services/user.services"
import { useRef } from "react"
import Loader from "../../components/Loader/Loader"



const MyProfileEditForm = () => {

    const { user, setUser, authenticateUser, storeToken } = useContext(AuthContext)

    console.log('---soy el user----', user)

    const [userData, setuserData] = useState(user)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.target
        setuserData({ ...userData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        userService
            .editUser(user._id, userData)
            .then(({ data }) => {
                authenticateUser()
                navigate('/my-profile')
            })
            .catch(err => console.log(err))
    }

    const handleFileInput = e => {

        setIsLoading(true)

        const formData = new FormData
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadImage(formData)
            .then(({ data }) => {
                setIsLoading(false)
                setuserData({ ...userData, avatar: data.cloudinary_url })
            })
            .catch(err => console.error(err))

    }

    const loadUser = () => {
        authenticateUser()

        userService
            .getUser(user._id)
            .then(({ data }) => {
                setuserData(data)
                console.log('USERDATAAA', userData)

            })
            .catch(err => console.error(err))
    }

    const fireFinalActions = () => {
        loadUser()
        authenticateUser()
        

    }

    useEffect(() => {
        loadUser()

        // authenticateUser()
        // console.log('USUARIO', user)
    }, [])


    const { username, email } = userData

    return (
        isLoading ? <Loader />
            :
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>

                        <Form onSubmit={handleSubmit}>

                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" value={username} onChange={handleInputChange} name="username" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="avatar">
                                <Form.Label>Avatar</Form.Label>
                                <Form.Control type="file" onChange={handleFileInput} name="avatar" />
                            </Form.Group>

                            <div className="d-grid">
                                <Button onClick={fireFinalActions} variant="dark" type="submit">Edit</Button>
                            </div>

                        </Form>
                    </Col>
                </Row>
            </Container >
    )
}

export default MyProfileEditForm
