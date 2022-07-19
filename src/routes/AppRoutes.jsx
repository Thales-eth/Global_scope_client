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
import NavBar from '../components/NavBar/Navigation'
import PrivateRoute from './PrivateRoutes'



const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/catalog/:id' element={<CourseDetailsPage />} />

            <Route path='/new-course' element={<PrivateRoute />}>
                <Route path='' element={<NewCoursePage />} />
            </Route>

            <Route path='/my-profile' element={<PrivateRoute />}>
                <Route path='' element={<MyProfilePage />} />
            </Route>

            <Route path='/katas' element={<PrivateRoute />}>
                <Route path='' element={<KatasPage />} />
            </Route>

            <Route path='/kata-rush' element={<PrivateRoute />}>
                <Route path='' element={<KataRushPage />} />
            </Route>

            <Route path='/about-us' element={<AboutUsPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/learner-stories' element={<LearnerStoriesPage />} />
            <Route path='/pricing' element={<PricingPage />} />

            <Route path='/forum' element={<PrivateRoute />}>
                <Route path='' element={<ForumPage />} />
            </Route>

        </Routes >
    )
}

export default AppRoutes