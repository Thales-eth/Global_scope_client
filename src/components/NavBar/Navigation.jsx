import './Navigation.css'
import { Nav, Navbar, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavBar = () => {

    return (
        // <Navbar bg="dark" expand="md" variant="dark" className='mb-5'>
        //     <Container>
        //         <Navbar.Brand>Global Scope</Navbar.Brand>
        //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //         <Navbar.Collapse id="basic-navbar-nav">
        //             <Nav className="ms-auto">
        //                 <Link to="/">
        //                     <Nav.Link as="span">Home</Nav.Link>
        //                 </Link>
        //                 <Link to="/catalog">
        //                     <Nav.Link as="span">Catalog</Nav.Link>
        //                 </Link>
        //                 <Link to="/katas">
        //                     <Nav.Link as="span">Practice Katas</Nav.Link>
        //                 </Link>
        //             </Nav>
        //         </Navbar.Collapse>
        //     </Container>
        // </Navbar>
        <nav className="header">
            <Link to='/'><p>Home</p></Link>
            <Link to='/catalog'><p>Catalog</p></Link>
            <Link to='/katas'><p>Practice Katas</p></Link>
        </nav>
    )

}

export default NavBar