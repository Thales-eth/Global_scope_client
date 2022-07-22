import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"
import './MyProfilePage.css'

const MyProfilePage = () => {

    const { user } = useContext(AuthContext)

    const { avatar, username, email } = user

    return (
        <>
            <div className="profilePage">
                <img src={avatar} alt="pepe pic" />
                <h1>Welcome to your profile: {username}!</h1>
                <p>📧 This is your mail: <b>{email}</b></p>
            </div>
        </>
    )
}

export default MyProfilePage