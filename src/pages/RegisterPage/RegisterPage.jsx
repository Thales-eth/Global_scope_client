import { Container, Row, Col } from 'react-bootstrap'
import RegisterForm from '../../components/RegisterForm/RegisterForm'

const RegisterPage = () => {

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