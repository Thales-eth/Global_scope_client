import './HomePage.css'
import { Link } from 'react-router-dom'
import introVideo from './../../assets/intro.mp4'
import js from './../../assets/js.png'
import python from './../../assets/python.png'
import css from './../../assets/css.png'

const HomePage = () => {
    return (
        <>
            <div className="video-wrapper">
                <video className='introVideo' autoPlay muted loop>
                    <source src={introVideo} type="video/mp4" />
                </video>

                <Link to={'/catalog'}><span className='homeSpan'>View all Courses</span></Link>

                <Link to={'/'}><span className='logo'>&lt; Global Scope /&gt;</span></Link>

                <Link to={'/register'}><button className='signUp'>Sign Up</button></Link>

                <Link to={'/login'}><button className='signIn'>Sign In</button></Link>

                <div className='homeCluster'>
                    <h1 className='motto'>Start Coding <br />Today</h1>
                </div>

                <div className='logoCluster'>
                    <Link to={'catalog/62d5545c9e44c1babbc983cd'}><img src={js} alt="js logo" /></Link>
                    <Link to={'catalog/62d567fee1bd7bb74942823d'}><img src={python} alt="python logo" /></Link>
                    <Link to={'catalog/62d820ae67c75f1d91078f4d'}><img src={css} alt="html css logo" /></Link>
                </div>
            </div>
        </>
    )
}

export default HomePage