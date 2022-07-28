import './HomePage.css'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <>
            <div className="video-wrapper">
                <video className='introVideo' autoPlay muted loop>
                    <source src='https://res.cloudinary.com/dqwiiycdv/video/upload/v1659035151/globalscope_home_t3lh6c.mp4' type="video/mp4" />
                </video>

                <Link to={'/catalog'}><span className='homeSpan'>View all Courses</span></Link>

                <Link to={'/'}><span className='logo'>&lt; Global Scope /&gt;</span></Link>

                <Link to={'/register'}><button className='signUp'>Sign Up</button></Link>

                <Link to={'/login'}><button className='signIn'>Sign In</button></Link>

                <div className='homeCluster'>
                    <h1 className='motto'>Start Coding <br />Today</h1>
                </div>

                <div className='logoCluster'>
                    <Link to={'catalog/62d5545c9e44c1babbc983cd'}><img src='https://res.cloudinary.com/dqwiiycdv/image/upload/v1658736331/js_mcgdil.png' alt="js logo" /></Link>
                    <Link to={'catalog/62d567fee1bd7bb74942823d'}><img src='https://res.cloudinary.com/dqwiiycdv/image/upload/v1658736342/python_zyk0je.png' alt="python logo" /></Link>
                    <Link to={'catalog/62d820ae67c75f1d91078f4d'}><img src='https://res.cloudinary.com/dqwiiycdv/image/upload/v1658736209/css_cb7fqc.png' alt="html css logo" /></Link>
                </div>
            </div>
        </>
    )
}

export default HomePage