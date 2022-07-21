import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"

const MyProfilePage = () => {

    const { user } = useContext(AuthContext)

    console.log('ESTE ES EL USER', user)

    return (
        <>
            <h1>MY PROFILE PAGE BELLA</h1>
        </>
    )
}

export default MyProfilePage