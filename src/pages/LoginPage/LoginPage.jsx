import LoginForm from "../../components/LoginForm/LoginForm"
import './LoginPage.css'

const LoginPage = () => {

    return (
        <>
            <div className="loginPage">
                <h1>Log in</h1>
                <LoginForm />
            </div>
        </>
    )
}

export default LoginPage