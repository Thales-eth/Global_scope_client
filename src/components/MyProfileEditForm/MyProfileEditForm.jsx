import { useContext, useState } from "react"
import { Row, Col, Form, Button, Container } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../contexts/auth.context"
import authService from './../../services/auth.services'
import uploadServices from "./../../services/upload.services"
import userService from "../../services/user.services"

const MyProfileEditForm = () => {

    const [userData, setuserData] = useState({
        username: '',
        email: '',
        avatar: ''
    })

    const { user } = useContext(AuthContext)

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
                console.log(user._id)
                console.log('data:', data)
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

    const { username, password, email } = userData

    return (
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
                            <Button variant="dark" type="submit">Edit</Button>
                        </div>

                    </Form>
                </Col>
            </Row>
        </Container >
    )
}

export default MyProfileEditForm
