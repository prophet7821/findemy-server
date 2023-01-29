const mongoose = require("mongoose");
const validator = require("validator");
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  authorImage: {
    type: String,
    required: true,
  },
  authorDescription: {
    type: String,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
  numOfRatings: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  isBestSeller: {
    type: Boolean,
    required: true,
  },
  isHot: {
    type: Boolean,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  learningOutcomes: {
    type: Array,
    required: true,
  },
});

courseSchema.statics.getCourse = async function (id) {
  if (!id) throw Error("All fields must be filled");
  const course = await this.findOne({ _id: id });
  if (!course) throw Error("Course not found");
  return course;
};

courseSchema.statics.getAllCourses = async function () {
  const courses = await this.find({});
  if (!courses) throw Error("No courses found");
  return courses;
};

courseSchema.statics.getCoursesByName = async function (name) {
  if (!name) throw Error("All fields must be filled");
  const courses = await this.find({ title: { $regex: name, $options: "i" } });
  if (!courses) throw Error("Course not found");
  return courses;
};

courseSchema.statics.getFilteredCourses = async function (name, filterState) {
  if (!name) throw Error("Name not found");
  if(!filterState) throw Error("Filter state not found");
  let filters = [];
  if (filterState.beginner==true) filters.push("Beginner");
  if (filterState.intermediate==true) filters.push("Intermediate");
  if (filterState.advanced==true) filters.push("Advanced");
  if (filterState.alllevels==true) filters.push("AllLevels");
  if (filters.length)
    courses = await this.find({
      title: { $regex: name, $options: "i" },
      level: { $in: filters },
    });
  else {
    var courses = await this.find({
      title: { $regex: name, $options: "i" },
    });
  }

  return courses;
};

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
