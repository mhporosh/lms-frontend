import { useEffect, useState } from "react";
import API from "../../utils/axios";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get("/user/courses/")
      .then((res) => setCourses(res.data))
      .catch(() => setCourses([]));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4">Enrolled Courses</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.length === 0 && <p>No courses enrolled yet.</p>}
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white p-4 rounded shadow border"
          >
            <h3 className="text-xl font-semibold">{course.title}</h3>
            <div className="mt-2 text-sm text-gray-600">
              Progress: <span className="font-medium">{course.progress || 0}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded mt-2">
              <div
                className="bg-green-500 h-2 rounded"
                style={{ width: `${course.progress || 0}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
