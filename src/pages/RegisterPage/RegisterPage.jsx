import './RegisterPage.css'
import { Container, Row, Col } from 'react-bootstrap'
import RegisterForm from '../../components/RegisterForm/RegisterForm'

const RegisterPage = () => {

    return (
        <div className='registerPage'>
            <Container>
                <Row>
                    <Col md={{ offset: 3, span: 6 }}>
                        <h1>Registro</h1>
                        <hr />
                        <RegisterForm />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default RegisterPage