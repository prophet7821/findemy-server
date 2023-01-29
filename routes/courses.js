const router = require('express').Router();
const { getAllCourses,getCourseByName,getCourse,getFilteredCourses} = require('../controllers/courseController');
router.get('/getAllCourses', getAllCourses);
router.post('/getCoursesByName', getCourseByName);
router.post('/getCourse', getCourse);
router.post('/getFilteredCourses',getFilteredCourses);

module.exports = router;