import './Navigation.css'
import { Nav, Navbar, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'


const NavBar = () => {

    const { user, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const logout = () => {
        // setShowMessage({ show: true, title: 'Hasta pronto!', text: 'Se ha cerrado tu sesión correctamente' })
        logoutUser()
        navigate('/')

    }

    return (
        <Navbar bg="dark" expand="md" variant="dark" className='mb-5'>
            <Container>
                <Link to={"/"}><Navbar.Brand>&lt; Global Scope /&gt;</Navbar.Brand ></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Link to="/">
                            <Nav.Link as="span">Home</Nav.Link>
                        </Link>
                        <Link to="/catalog">
                            <Nav.Link as="span">Catalog</Nav.Link>
                        </Link>
                        <Link to="/katas">
                            <Nav.Link as="span">Practice Katas</Nav.Link>
                        </Link>


                        {
                            !user
                                ?
                                <>
                                    <Link to="/login">
                                        <Nav.Link as="span">Log in</Nav.Link>
                                    </Link>
                                    <Link to="/register">
                                        <Nav.Link as="span">Sign up</Nav.Link>
                                    </Link>
                                </>
                                :
                                <>
                                    <Link to="/my-profile">
                                        <Nav.Link as="span">{user.username}</Nav.Link>
                                    </Link>

                                    <Nav.Link as="span" onClick={logout}>Cerrar sesión</Nav.Link>
                                </>
                        }


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )

}

export default NavBar