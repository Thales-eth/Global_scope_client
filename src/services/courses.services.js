import axios from 'axios'

class CourseServices {

    constructor() {

        this.api = axios.create({
            // baseURL: `${process.env.REACT_APP_API_URL}/coasters`
            baseURL: `http://localhost:5005/api`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getCourses() {
        return this.api.get('/getAllCourses')
    }

    getOneCourse(course_id) {
        return this.api.get(`/getOneCourse/${course_id}`)
    }

    saveCourse(courseData) {
        return this.api.post('/saveCourse', courseData)
    }

    editCourse(course_id, courseData) {
        return this.api.put(`editCourse/${course_id}`, courseData)
    }

    deleteCourse(course_id) {
        return this.api.delete(`deleteCourse/${course_id}`)
    }
}

const CourseService = new CourseServices()

export default CourseService