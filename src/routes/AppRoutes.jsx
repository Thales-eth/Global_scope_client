import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import Catalog from '../pages/CatalogPage/CatalogPage'
import CourseDetailsPage from '../pages/CourseDetailsPage/CourseDetailsPage'
import NewCoursePage from '../pages/NewCoursePage/NewCoursePage'
import MyProfilePage from '../pages/MyProfilePgae/MyProfilePage'
import KatasPage from '../pages/KatasPage/KatasPage'
import KataRushPage from '../pages/KataRushPage/KataRushPage'
import ContactPage from '../pages/ContactPage/ContactPage'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import KataDetailsPage from '../pages/KataDetailsPage/KataDetailsPage'
import MyProfileEditPage from '../pages/MyProfileEditPage/MyProfileEditPage'
import PrivateRoute from './PrivateRoutes'

const AppRoutes = () => {

    return (

        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/catalog' element={<Catalog />} />

            <Route path='/catalog/:catalog_id' element={<PrivateRoute />}>
                <Route path='' element={<CourseDetailsPage />} />
            </Route>

            <Route path='/new-course' element={<PrivateRoute />}>
                <Route path='' element={<NewCoursePage />} />
            </Route>

            <Route path='/my-profile' element={<PrivateRoute />}>
                <Route path='' element={<MyProfilePage />} />
            </Route>

            <Route path='/katas' element={<PrivateRoute />}>
                <Route path='' element={<KatasPage />} />
            </Route>

            <Route path='/katas/:kata_id' element={<PrivateRoute />}>
                <Route path='' element={<KataDetailsPage />} />
            </Route>

            <Route path='/kata-rush' element={<PrivateRoute />}>
                <Route path='' element={<KataRushPage />} />
            </Route>

            <Route path='/my-profile/edit' element={<PrivateRoute />}>
                <Route path='' element={<MyProfileEditPage />} />
            </Route>

            <Route path='/contact' element={<ContactPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />

        </Routes >
    )
}

export default AppRoutes