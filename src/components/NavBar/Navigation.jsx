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
        <Navbar expand="md" variant="dark" className='main-nav mb-5' fixed='top'>
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
                        <Link to="/contact">
                            <Nav.Link as="span">Contact</Nav.Link>
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

                                    {/* <Link> */}
                                    <Nav.Link className='logout' as="a" onClick={logout}>Cerrar sesión</Nav.Link>
                                    {/* </Link> */}
                                </>
                        }


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )

}

export default NavBar