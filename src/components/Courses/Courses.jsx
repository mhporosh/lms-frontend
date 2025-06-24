import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/axios";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get("/courses/")
      .then((res) => setCourses(res.data))
      .catch(() => setCourses([]));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4">All Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.length === 0 && <p>No courses available.</p>}
        {courses.map((course) => (
          <Link
            key={course.id}
            to={`/courses/${course.id}`}
            className="block bg-white p-5 border rounded hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold">{course.title}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {course.description?.slice(0, 100)}...
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
