import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="footer">
            <span>Start learning Javascript!: </span><Link to={'catalog/62e2c4b7181abf250ba42453'}> <img src="https://res.cloudinary.com/dqwiiycdv/image/upload/v1658736331/js_mcgdil.png" alt="js" /></Link>
        </footer>
    )
}

export default Footer