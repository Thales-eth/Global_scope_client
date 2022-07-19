import './HomePage.css'
import { Link } from 'react-router-dom'
import introVideo from './../../assets/intro.mp4'

const HomePage = () => {
    return (
        <>
            <div className="video-wrapper">
                <video className='introVideo' autoPlay muted loop>
                    <source src={introVideo} type="video/mp4" />
                </video>

                <span className='logo'>&lt; Global Scope /&gt;</span>

                <Link to={'/register'}><button className='signUp'>Sign Up</button></Link>

                <div className='homeCluster'>
                    <h1 className='motto'>Start Coding <br />Today</h1>
                </div>

            </div>
        </>
    )
}

export default HomePage