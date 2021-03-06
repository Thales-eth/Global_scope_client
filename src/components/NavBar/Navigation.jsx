import './Navigation.css'
import { Nav, Navbar, Container } from 'react-bootstrap'
import { AuthContext } from '../../contexts/auth.context'
import { MessageContext } from './../../contexts/userMessage.context'
import { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const NavBar = () => {

    const { user, logoutUser } = useContext(AuthContext)
    const { setShowMessage } = useContext(MessageContext)

    const navigate = useNavigate()

    const logout = () => {
        setShowMessage({ show: true, title: 'See you buddy!', text: 'Keep coding :)' })
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
                            <Nav.Link as="span" className='navColor'>Home</Nav.Link>
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
                                    <Nav.Link className='logout' as="a" onClick={logout}>Cerrar sesi??n</Nav.Link>

                                    <Link to="/my-profile">
                                        <img className='navLogo' src={user.avatar} alt="" />
                                    </Link>
                                </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )

}

export default NavBar