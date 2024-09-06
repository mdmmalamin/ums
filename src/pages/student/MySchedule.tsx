import { useGetAllEnrolledCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";

const MySchedule = () => {
  const { data } = useGetAllEnrolledCoursesQuery(undefined);
  return (
    <div>
      {data?.data?.map((item) => (
        <div key={item._id}>
          <div>Course Name: {item.course.title}</div>
          <div>Course Name: {item.offeredCourse.section}</div>
          <div>
            Course Name:{" "}
            {item.offeredCourse.days.map((item) => (
              <span key={item._id}>{item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MySchedule;
