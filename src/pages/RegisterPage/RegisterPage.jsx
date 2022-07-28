import './RegisterPage.css'
import { Container, Row, Col } from 'react-bootstrap'
import RegisterForm from '../../components/RegisterForm/RegisterForm'

const RegisterPage = () => {

    return (
        <div className='registerPage'>
            <RegisterForm />
        </div>
    )
}

export default RegisterPage