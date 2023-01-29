const Course = require("../models/Course");

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.getAllCourses();
    res.status(200).json(courses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

const getCourse = async (req, res) => {
    try{
        const course = await Course.getCourse(req.body.id);
        res.status(200).json(course);
    }catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const getCourseByName = async (req, res) => {
    try{
        const courses = await Course.getCoursesByName(req.body.name);
        res.status(200).json(courses);
    }catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const getFilteredCourses = async(req, res) => {
    try{
        const courses = await Course.getFilteredCourses(req.body.name, req.body.filterState);
        res.status(200).json(courses);
    }catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = {getAllCourses,getCourse,getCourseByName,getFilteredCourses};