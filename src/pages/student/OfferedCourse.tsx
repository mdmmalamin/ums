import { Button, Col, Row } from "antd";
import {
  useEnrolCourseMutation,
  useGetAllOfferedCoursesQuery,
} from "../../redux/features/student/studentCourseManagement.api";

type TCourse = {
  [index: string]: any;
};

const OfferedCourse = () => {
  const { data: offeredCourseData } = useGetAllOfferedCoursesQuery(undefined);
  const [enroll] = useEnrolCourseMutation();

  const singleObject = offeredCourseData?.data?.reduce((acc: TCourse, item) => {
    const key = item?.course?.title;
    acc[key] = acc[key] || { courseTitle: key, sections: [] };

    acc[key].sections.push({
      section: item.section,
      _id: item._id,
      days: item.days,
      startTime: item.startTime,
      endTime: item.endTime,
    });

    return acc;
  }, {});

  const modifiedData = Object.values(singleObject ? singleObject : {});

  const handleEnroll = async (id) => {
    const enrollData = {
      offeredCourse: id,
    };
    const res = await enroll(enrollData);
  };

  if (!modifiedData.length) {
    return <h3>No Available Courses</h3>;
  }

  return (
    <Row gutter={[0, 16]}>
      {modifiedData?.map((item) => (
        <Col span={24} key={item._id} style={{ border: "1px solid #aabbcc" }}>
          <div style={{ padding: "10px" }}>
            <h2>Course Title: {item.courseTitle}</h2>
          </div>
          <div>
            {item?.sections?.map((section) => (
              <Row
                justify="space-between"
                align="middle"
                key={section?._id}
                style={{ border: "1px solid #ff6611", padding: "10px" }}
              >
                <Col span={5}>Section: {section.section}</Col>
                <Col span={5}>
                  Days:{" "}
                  {section.days.map((day) => (
                    <span>{day}</span>
                  ))}
                </Col>
                <Col span={5}>Start Time: {section.startTime}</Col>
                <Col span={5}>End Time: {section.endTime}</Col>
                <Col span={5}>
                  <Button onClick={() => handleEnroll(section?._id)}>
                    Enroll
                  </Button>
                </Col>
              </Row>
            ))}
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default OfferedCourse;
