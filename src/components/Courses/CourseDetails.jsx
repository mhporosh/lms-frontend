import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../utils/axios";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    API.get(`/courses/${id}/`)
      .then((res) => setCourse(res.data))
      .catch(() => setCourse(null));
  }, [id]);

  const markLesson = (lessonId) => {
    API.post(`/lessons/${lessonId}/complete/`)
      .then(() => alert("Lesson marked as completed"))
      .catch(() => alert("Failed to mark lesson completed"));
  };

  if (!course) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold">{course.title}</h2>
      <p className="mt-2 text-gray-700">{course.description}</p>

      <h3 className="text-xl mt-6 mb-2 font-semibold">Lessons</h3>
      <ul className="space-y-2">
        {course.lessons?.map((lesson) => (
          <li
            key={lesson.id}
            className="flex items-center justify-between p-3 border rounded"
          >
            <span>{lesson.title}</span>
            <button
              onClick={() => markLesson(lesson.id)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Mark as Completed
            </button>
          </li>
        ))}
        {!course.lessons && <p>No lessons available.</p>}
      </ul>
    </div>
  );
}
