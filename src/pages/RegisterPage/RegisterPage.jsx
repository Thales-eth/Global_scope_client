import { Container, Row, Col } from 'react-bootstrap'
import RegisterForm from '../../components/RegisterForm/RegisterForm'

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

        <Container>

            <Row>

                <Col md={{ offset: 3, span: 6 }}>

                    <h1>Registro</h1>

                    <hr />

                    {/* <SignupForm /> */}
                    <RegisterForm />

                </Col>
            </Row>

        </Container>
    )
}

export default RegisterPage