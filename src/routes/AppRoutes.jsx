import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import Catalog from '../pages/CatalogPage/CatalogPage'
import CourseDetailsPage from '../pages/CourseDetailsPage/CourseDetailsPage'
import NewCoursePage from '../pages/NewCoursePage/NewCoursePage'
import MyProfilePage from '../pages/MyProfilePgae/MyProfilePage'
import KatasPage from '../pages/KatasPage/KatasPage'
import KataRushPage from '../pages/KataRushPage/KataRushPage'
import AboutUsPage from '../pages/AboutUsPage/AboutUsPage'
import ContactPage from '../pages/ContactPage/ContactPage'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import LearnerStoriesPage from '../pages/LearnerStoriesPage/LearnerStoriesPage'
import PricingPage from '../pages/PricingPage/PricingPage'
import ForumPage from '../pages/ForumPage/ForumPage'
import Navigation from '../components/Navigation/Navigation'



const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/catalog/:coursename ' element={<CourseDetailsPage />} />
            <Route path='/new-course' element={<NewCoursePage />} />
            <Route path='/my-profile' element={<MyProfilePage />} />
            <Route path='/katas' element={<KatasPage />} />
            <Route path='/kata-rush' element={<KataRushPage />} />
            <Route path='/about-us' element={<AboutUsPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/learner-stories' element={<LearnerStoriesPage />} />
            <Route path='/pricing' element={<PricingPage />} />
            <Route path='/forum' element={<ForumPage />} />
        </Routes>
    )
}

export default AppRoutes