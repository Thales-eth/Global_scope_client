import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"
import './MyProfilePage.css'
// import pepe from './../../assets/pepe.png'

const MyProfilePage = () => {

    const { user } = useContext(AuthContext)

    console.log(user)

    return (
<<<<<<< HEAD
        <>
            <div className="profilePage">
                <img src={user.avatar} alt="pepe pic" />
                <h1>Welcome to your profile: {user.username}!</h1>
                <p>This is your mail: {user.email}</p>
            </div>
        </>
=======
        <h1>MY PROFILE PAGE BELLA</h1>
        
>>>>>>> 0bd5d3f52d47d00d3cd460dcd2a4c01f41669bed
    )
}

export default MyProfilePage