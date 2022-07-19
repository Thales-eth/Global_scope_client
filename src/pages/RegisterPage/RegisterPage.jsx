import { useContext, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'

// import { MessageContext } from './../../contexts/userMessage.context'

const RegisterPage = () => {

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const { setShowMessage } = useContext(MessageContext)
    const navigate = useNavigate()

    const handleInputChange = e => {
        console.log('estoy entrando')
        // const { value, name } = e.target
        // setSignupData({ ...signupData, [name]: value })
    }

    const handleSubmit = e => {
        console.log('hola de nuevo')
        // e.preventDefault()

        // authService
        //     .signup(signupData)
        //     .then(({ data }) => {
        //         setShowMessage({ show: true, title: `Bienvenid@, ${data.user.username}`, text: 'Te has registrado correctamente' })
        //         navigate('/iniciar-sesion')
        //     })
        //     .catch(err => console.log(err))
    }


    return (

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
    )
}

export default RegisterPage