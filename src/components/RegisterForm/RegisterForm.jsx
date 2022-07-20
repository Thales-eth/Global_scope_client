import { useContext, useState } from "react"
import { Row, Col, Form, Button, Container } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import authService from './../../services/auth.services'

// import { MessageContext } from './../../contexts/userMessage.context'

const RegisterForm = () => {

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: ''
    })

    // const { setShowMessage } = useContext(MessageContext)
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
                // setShowMessage({ show: true, title: `Bienvenid@, ${data.user.username}`, text: 'Te has registrado correctamente' })
                navigate('/login')
            })
            .catch(err => console.log(err))
    }


    const { username, password, email } = signupData

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Nombre de usuario</Form.Label>
                            <Form.Control type="text" value={username} onChange={handleInputChange} name="username" />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
                        </Form.Group>


                        <div className="d-grid">
                            <Button variant="dark" type="submit">Registrarme</Button>
                        </div>

                    </Form>
                </Col>
            </Row>
        </Container >
    )
}

export default RegisterForm