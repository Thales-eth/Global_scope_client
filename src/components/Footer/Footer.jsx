import './Footer.css'
import { Link } from 'react-router-dom'
import js from './../../assets/js.png'


const Footer = () => {
    return (
        <footer className="footer">
            <Link to={'catalog/62d5545c9e44c1babbc983cd'}>Start learning JS!: <img src={js} alt="" /></Link>
        </footer>
    )
}

export default Footer