import { useContext, useState } from "react"
import { Row, Col, Form, Button, Container } from "react-bootstrap"
import { useNavigate, Link } from 'react-router-dom'
import { MessageContext } from './../../contexts/userMessage.context'
import { AuthContext } from "../../contexts/auth.context"
import authService from './../../services/auth.services'

const LoginForm = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const { user, isLoading } = useContext(AuthContext)

    const { setShowMessage } = useContext(MessageContext)

    const { storeToken, authenticateUser } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleInputChange = e => {

        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmit = e => {

        e.preventDefault()

        authService
            .login(loginData)
            .then(({ data }) => {
                storeToken(data.authToken)
                console.log('ESTO ES DATA', data)
                authenticateUser()
                navigate('/catalog')
                setShowMessage({ show: true, title: `Hey ${loginData.email} 👋!`, text: 'Are you into katas son?' })
            })
            .catch(err => console.log(err))

    }


    const { password, email } = loginData

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
                        </Form.Group>

                        <div className="d-grid mt-4">
                            <Button variant="dark" type="submit">Acceder</Button>
                        </div>

                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginForm