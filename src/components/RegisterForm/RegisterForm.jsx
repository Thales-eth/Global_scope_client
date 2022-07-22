import { useContext, useState } from "react"
import { Row, Col, Form, Button, Container } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import authService from './../../services/auth.services'
import uploadServices from "./../../services/upload.services"

const RegisterForm = () => {

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        avatar: 'https://w7.pngwing.com/pngs/552/807/png-transparent-pepe-frog-illustration-gif-imgur-tenor-know-your-meme-twitch-emotes-vertebrate-meme-fictional-character.png'
    })

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleInputChange = e => {

        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        authService
            .register(signupData)
            .then(({ data }) => {
                console.log('data:', data)
                navigate('/login')
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
                setSignupData({ ...signupData, avatar: data.cloudinary_url })
            })
            .catch(err => console.error(err))
    }

    const { username, password, email } = signupData

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={username} onChange={handleInputChange} name="username" />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
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
                            <Button variant="dark" type="submit">Sign up</Button>
                        </div>

                    </Form>
                </Col>
            </Row>
        </Container >
    )
}

export default RegisterForm